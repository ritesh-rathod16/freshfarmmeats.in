require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/meatbarn', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Nodemailer transporter setup (example with Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,    // your email address
    pass: process.env.EMAIL_PASS     // your email password or app password
  }
});

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password must be at least 8 characters'],
    validate: {
      validator: function(v) {
        return /[A-Z]/.test(v) && /[0-9]/.test(v);
      },
      message: 'Password must contain at least one uppercase letter and one number'
    },
    select: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

// OTP Schema
const otpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // OTP expires after 5 minutes automatically
  }
});

const OTP = mongoose.model('OTP', otpSchema);

// Register Route
// Register Route
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: 'Passwords do not match',
        field: 'confirmPassword'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Email already in use',
        field: 'email'
      });
    }

    const user = await User.create({ name, email, password });

    // Generate 4-digit OTP
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();

    await OTP.create({ userId: user._id, otp: otpCode });

const mailOptions = {
  from: `"Fresh Farm Meats" <${process.env.EMAIL_USER}>`,
  to: user.email,
  subject: '🔐 Your OTP Code - Email Verification',

  text: `Hi ${user.name},

Welcome to Fresh Farm Meats! 🐄🐓🥛

To complete your registration, please verify your email address using the One-Time Password (OTP) below:

🔑 Your OTP: ${otpCode}

This code will expire in 5 minutes.

If you did not sign up for Fresh Farm Meats, you can safely ignore this email.

Thank you for choosing us for your fresh meat and dairy needs!

Warm regards,  
The Fresh Farm Meats Team  
www.freshfarmmeats.in`,
};

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      success: true,
      message: 'User registered. Please verify your email with the OTP sent.'
    });

  } catch (err) {
    console.error('Registration error:', err);
    if (err.name === 'ValidationError') {
      const errors = {};
      Object.keys(err.errors).forEach(key => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({ success: false, errors });
    }

    return res.status(500).json({ success: false, error: 'Server error during registration' });
  }
});

// OTP Verification Route
app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, error: 'Email and OTP are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, error: 'User already verified' });
    }

    const otpRecord = await OTP.findOne({ userId: user._id, otp });
    if (!otpRecord) {
      return res.status(400).json({ success: false, error: 'Invalid or expired OTP' });
    }

    // Mark user as verified
    user.isVerified = true;
    await user.save();

    // Delete OTP(s) after verification
    await OTP.deleteMany({ userId: user._id });

    // Generate JWT token now that user is verified
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      isVerified: user.isVerified
    };

    res.json({ success: true, message: 'Email verified successfully', token, user: userData });
  } catch (err) {
    console.error('OTP verification error:', err);
    res.status(500).json({ success: false, error: 'Server error during OTP verification' });
  }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        error: 'Email not verified. Please verify your email before logging in.'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: rememberMe ? '30d' : '7d' }
    );

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      isVerified: user.isVerified
    };

    res.status(200).json({
      success: true,
      token,
      user: userData
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error during login'
    });
  }
});
// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Authorization token missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', async (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, error: 'Token is not valid or expired' });
    }

    try {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }

      req.user = user; // Attach user to request
      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      res.status(500).json({ success: false, error: 'Server error during authentication' });
    }
  });
}

// Profile Route – Get current user info
app.get('/api/auth/profile', authenticateToken, (req, res) => {
  const { _id, name, email, createdAt, isVerified } = req.user;

  res.status(200).json({
    success: true,
    user: {
      id: _id,
      name,
      email,
      createdAt,
      isVerified
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS configured for: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});
