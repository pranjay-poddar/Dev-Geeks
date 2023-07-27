import React from 'react';
import { motion } from 'framer-motion';

const Settings = () => {
  return (
    <div className="container mx-auto p-4 min-h-screen py-30 bg-gradient-to-b from-indigo-400 to-blue-500">
      <h2 className="text-3xl font-semibold text-white mb-6">Settings</h2>
      <div className="flex">
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-1/4 bg-white rounded-lg shadow-lg p-4 mr-8"
        >
          <ul className="space-y-4">
            <motion.li
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-2">Appearance</h3>
              <p className="text-gray-600">
                Customize the appearance of your application.
              </p>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-2">General</h3>
              <p className="text-gray-600">
                Manage general settings and preferences.
              </p>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-2">Security</h3>
              <p className="text-gray-600">
                Set up security options and access controls.
              </p>
            </motion.li>
          </ul>
        </motion.nav>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-3/4 bg-white rounded-lg shadow-lg p-4"
        >
          <h3 className="text-2xl font-semibold mb-4">Settings Content</h3>
          <p className="text-gray-600">
            This is the content of the selected settings section.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
