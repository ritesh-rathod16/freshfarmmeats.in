// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaLock, FaEnvelope, FaUser } from 'react-icons/fa';
import logo from './logo.jpg';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      const copy = { ...errors };
      delete copy[name];
      setErrors(copy);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Must be at least 8 characters';
    else if (!/[A-Z]/.test(formData.password) || !/[0-9]/.test(formData.password))
      newErrors.password = 'Must include 1 uppercase letter and 1 number';

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (res.data.success) {
        navigate('/otp', { state: { email: formData.email } });
      } else {
        setApiError(res.data.error || 'Registration failed');
      }
    } catch (err) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors);
      else if (err.response?.data?.field) setErrors({ [err.response.data.field]: err.response.data.error });
      else setApiError(err.response?.data?.error || 'Network or server error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 to-blue-100">
      {/* Left Side Branding */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center p-12 bg-white">
        <img src={logo} alt="Logo" className="h-24 mb-4" />
        <h1 className="text-3xl font-bold text-green-600">The Meat Barn</h1>
        <p className="text-gray-500 mt-2 max-w-xs text-center">Farm-Fresh Meat & Dairy Delivered</p>
      </div>

      {/* Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
              <h1 className="text-3xl font-bold text-white">Create Account</h1>
              <p className="text-blue-100 mt-2">Join us today</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {apiError && <div className="text-red-600 text-sm">{apiError}</div>}

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange}
                  className={`mt-1 block w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  className={`mt-1 block w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange}
                  className={`mt-1 block w-full px-4 py-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm">Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                  className={`mt-1 block w-full px-4 py-2 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
              </div>

              <button type="submit" disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition">
                {isLoading ? 'Creating Account...' : 'Sign up'}
              </button>
            </form>

            <div className="bg-gray-50 p-4 text-center text-sm">
              Already have an account? <Link to="/login" className="text-blue-600 font-medium">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
