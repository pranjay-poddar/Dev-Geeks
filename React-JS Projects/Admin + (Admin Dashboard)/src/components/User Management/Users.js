import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Users = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-indigo-400 to-blue-500">
      <h2 className="text-3xl font-semibold text-white mb-6">User Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center"
        >
          <h3 className="text-xl font-semibold mb-4">Users List</h3>
          <Link
            to="/user-list"
            className="text-blue-500 hover:text-blue-600"
            activeClassName="font-semibold"
          >
            View List
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center"
        >
          <h3 className="text-xl font-semibold mb-4">User Form</h3>
          <Link
            to="/user-form"
            className="text-blue-500 hover:text-blue-600"
            activeClassName="font-semibold"
          >
            Add User
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Users;
