import React, { useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OTPForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  // Refs for inputs to auto-focus next
  const inputsRef = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    inputsRef[0].current?.focus();
  }, []);

  const handleChange = (e, idx) => {
    const val = e.target.value;
    if (/^[0-9]$/.test(val)) {
      if (idx < inputsRef.length - 1) {
        inputsRef[idx + 1].current.focus();
      }
    } else {
      e.target.value = ''; // clear invalid input
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const otp = inputsRef.map(ref => ref.current.value).join('');
  if (otp.length !== 4) {
    alert('Please enter all 4 digits of the OTP.');
    return;
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, otp })
    });
    const data = await response.json();

    if (response.ok && data.success) {
      alert('Email verified successfully!');
      // Optionally save token in localStorage or context here: data.token
      navigate('/');
    } else {
      alert(data.error || 'OTP verification failed');
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    alert('Server error. Please try again later.');
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full flex flex-col items-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">OTP Verification</h1>
        <p className="text-gray-600 mb-6 text-center">
          We have sent a verification code to <span className="font-semibold">{email}</span>
        </p>
        <div className="flex space-x-4 mb-8">
          {inputsRef.map((ref, i) => (
            <input
              key={i}
              ref={ref}
              type="text"
              maxLength={1}
              inputMode="numeric"
              pattern="\d"
              onChange={(e) => handleChange(e, i)}
              className="w-16 h-16 text-center text-2xl font-semibold rounded-lg border-2 border-purple-600 focus:border-indigo-500 focus:outline-none"
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-lg font-semibold transition-colors"
        >
          Verify me
        </button>
      </form>
    </div>
  );
};

export default OTPForm;
