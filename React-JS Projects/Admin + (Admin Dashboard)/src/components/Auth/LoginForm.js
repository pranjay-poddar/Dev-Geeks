import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, Navigate } from 'react-router-dom';
import { RiMailLine, RiLockPasswordLine, RiQuestionLine } from 'react-icons/ri';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoggedin, setIsLoggedin] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggedin(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-500 to-purple-500">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        {isLoggedin ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-semibold mb-4">Logged In Successfully!</h2>
            <p className="text-gray-600">Welcome back! You are now logged in.</p>
            <Link to="/" className="inline-block mt-4 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500">
              Go to Home
            </Link>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <h2 className="text-3xl font-semibold text-center">Log In</h2>
            <div className="flex items-center space-x-2">
              <RiMailLine className="text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full py-2 px-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <RiLockPasswordLine className="text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full py-2 px-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-pink-500 hover:bg-pink-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              Log In
            </button>
            <div className="text-gray-600 text-center">
              <Link to="/password-reset" className="text-blue-500 hover:text-blue-600">
                <RiQuestionLine className="inline-block -mt-1 mr-1 text-gray-400" />
                Forgot your password?
              </Link>
            </div>
            <p className="text-gray-600 text-center">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-500 hover:text-blue-600 font-semibold">
                Sign Up
              </Link>
            </p>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
