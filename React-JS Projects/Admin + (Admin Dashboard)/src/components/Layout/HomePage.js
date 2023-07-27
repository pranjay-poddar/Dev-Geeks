import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiSettings, FiUsers } from 'react-icons/fi';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <img src={Logo} alt="Logo" className="w-32 h-32 mb-4" />
        <h1 className="text-4xl font-bold">Welcome to Admin+</h1>
        <p className="text-lg mt-2">Enjoy the ultimate experience!</p>
      </motion.div>

      <div className="flex justify-center mt-12">
        <Link to="/calendar">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center bg-white bg-opacity-25 rounded-lg p-4 m-2"
          >
            <FiCalendar className="w-10 h-10 text-white" />
            <span className="ml-2 text-xl">Manage Your Schedule</span>
          </motion.div>
        </Link>
        <Link to='/settings'>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center bg-white bg-opacity-25 rounded-lg p-4 m-2"
          >
            <FiSettings className="w-10 h-10 text-white" />
            <span className="ml-2 text-xl">Customize Your Settings</span>
          </motion.div>
        </Link>
        <Link to='/user-list'>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-center bg-white bg-opacity-25 rounded-lg p-4 m-2"
          >
            <FiUsers className="w-10 h-10 text-white" />
            <span className="ml-2 text-xl">Manage Your Users</span>
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
