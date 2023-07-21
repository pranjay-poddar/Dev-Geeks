import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RiMailLine } from 'react-icons/ri';

const PasswordReset = () => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-500 to-purple-500">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-semibold mb-4">Password Reset Submitted!</h2>
            <p className="text-gray-600">
              Your password reset request has been submitted. Please check your email for further instructions.
            </p>
            <Link
              to="/login"
              className="inline-block mt-4 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              Back to Login
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
            <h2 className="text-3xl font-semibold text-center">Password Reset</h2>
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
            <button
              type="submit"
              className="w-full py-2 px-4 bg-pink-500 hover:bg-pink-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              Submit
            </button>
            <p className="text-gray-600 text-center">
              Remembered your password?{' '}
              <Link to="/login" className="text-blue-500 hover:text-blue-600 font-semibold">
                Log In
              </Link>
            </p>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
