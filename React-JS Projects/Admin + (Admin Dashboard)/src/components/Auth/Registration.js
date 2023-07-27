import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RiUserAddLine, RiLockPasswordLine, RiMailLine } from 'react-icons/ri';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsRegistered(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-500">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        {isRegistered ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-semibold mb-4">Signed Up Successfully!</h2>
            <p className="text-gray-600">
              You have successfully registered. Please check your email for further instructions.
            </p>
            <Link to="/login" className="text-blue-500 hover:text-blue-600 font-semibold">
              Log In
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
            <h2 className="text-3xl font-semibold text-center">Create an Account</h2>
            <div className="flex items-center space-x-2">
              <RiUserAddLine className="text-gray-400" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full py-2 px-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <RiUserAddLine className="text-gray-400" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full py-2 px-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <RiMailLine className="text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full py-2 px-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                className="w-full py-2 px-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Sign Up
            </button>
            <p className="text-gray-600 text-center">
              Already have an account?{' '}
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

export default Registration;
