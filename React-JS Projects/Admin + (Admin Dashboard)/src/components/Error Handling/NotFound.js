import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-400 to-blue-500"
    >
      <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
      <p className="text-white text-lg mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="bg-white text-blue-500 hover:text-blue-600 font-semibold py-2 px-4 rounded-md"
      >
        Go to Home
      </Link>
    </motion.div>
  );
};

export default NotFound;
