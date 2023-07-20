import React from 'react';
import { Link } from 'react-router-dom';
import { FiBarChart2, FiCalendar, FiSettings, FiUser, FiBell } from 'react-icons/fi';
import { motion } from 'framer-motion';
import 'typeface-montserrat';
import Settings from '../Settings/Settings';
import DataChart from '../DataManagement/DataChart';
import UserActivity from '../User Management/UserActivity';

const Dashboard = () => {
  const chartData = [
    { month: 'Jan', sales: 1200 },
    { month: 'Feb', sales: 1500 },
    { month: 'Mar', sales: 1800 },
    { month: 'Apr', sales: 2200 },
    { month: 'May', sales: 2500 },
    { month: 'Jun', sales: 2700 },
    { month: 'Jul', sales: 2300 },
    { month: 'Aug', sales: 2000 },
    { month: 'Sep', sales: 1800 },
    { month: 'Oct', sales: 1500 },
    { month: 'Nov', sales: 1200 },
    { month: 'Dec', sales: 1000 },
  ];

  const userActivityData = [
    { day: 'Mon', activity: 45 },
    { day: 'Tue', activity: 78 },
    { day: 'Wed', activity: 92 },
    { day: 'Thu', activity: 65 },
    { day: 'Fri', activity: 80 },
    { day: 'Sat', activity: 105 },
    { day: 'Sun', activity: 70 },
  ];

  const tasks = [
    'Complete insights',
    'Complete Component',
    'Deploy the changes to web',
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-400 to-indigo-500 py-20 font-sans">
      <div className="flex">
        <div className="flex-1 px-10">
          <header className="bg-white shadow flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="flex items-center">
              <Link to="/notifications" className="relative mr-6">
                <FiBell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-xs text-white">3</span>
              </Link>
              <div className="flex items-center text-sm text-gray-600 focus:outline-none">
                <div className="flex items-center mr-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <FiUser className="w-6 h-6 text-gray-600" />
                  </div>
                  <span className="ml-2">John Doe</span>
                </div>
                <Link to='/settings'>
                  <button className="bg-white rounded-full px-4 py-2 shadow-sm">
                    <FiSettings className="w-6 h-6" />
                  </button>
                </Link>
              </div>
            </div>
          </header>
          <main className="px-4 py-6 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-center text-white">Welcome to your Dashboard, John Doe!</h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="bg-white rounded-lg p-4 shadow">
                  <h3 className="text-lg font-semibold mb-2 text-purple-500">Sales Overview</h3>
                  <DataChart data={chartData} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <div className="bg-white rounded-lg p-4 shadow">
                  <h3 className="text-lg font-semibold mb-2 text-purple-500">User Activity</h3>
                  <UserActivity data={userActivityData} /> 
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <div className="bg-white rounded-lg p-4 shadow">
                  <h3 className="text-lg font-semibold mb-2 text-purple-500">To Do</h3>
                  <div className="bg-gray-200 rounded-lg mt-4 p-4">
                    <ul className="list-disc list-inside">
                      {tasks.map((task) => (
                        <li key={task}>{task}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <div className="bg-white rounded-lg p-4 shadow">
                  <h3 className="text-lg font-semibold mb-2 text-purple-500">In Progress</h3>
                </div>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
