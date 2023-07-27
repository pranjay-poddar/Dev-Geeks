import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiBarChart2, FiCalendar, FiCheckCircle, FiDatabase, FiBell, FiSettings, FiUsers, FiInbox } from 'react-icons/fi';
import logo from '../../assets/logo.png';

const Sidebar = () => {
  const location = useLocation();

  const sidebarItems = [
    { label: 'Home', icon: FiHome, link: '/' },
    { label: 'Dashboard', icon: FiBarChart2, link: '/dashboard' },
    { label: 'Analytics', icon: FiCalendar, link: '/chart' },
    { label: 'Calendar', icon: FiCalendar, link: '/calendar' },
    { label: 'Tasks', icon: FiCheckCircle, link: '/task-form' },
    { label: 'Data Management', icon: FiDatabase, link: '/data' },
    { label: 'Notifications', icon: FiBell, link: '/notifications' },
    { label: 'Settings', icon: FiSettings, link: '/settings' },
    { label: 'User Management', icon: FiUsers, link: '/user-management' },
    { label: 'Inbox', icon: FiInbox, link: '/inbox' },
  ];

  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-purple-700 to-indigo-800 text-white px-3 py-3"
    >
      <div className="flex items-center justify-center h-16">
      <h2 className="text-3xl font-bold tracking-wider">Admin Dashboard</h2>
        <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
      </div>
      <nav className="mt-8">
        {sidebarItems.map((item) => (
          <Link
            key={item.label}
            to={item.link}
            className={`flex items-center px-4 py-3 transition duration-300 ease-in-out ${
              location.pathname === item.link
                ? 'bg-indigo-600'
                : 'hover:bg-indigo-600'
            }`}
          >
            <item.icon className="w-6 h-6 mr-3" />
            <span className="text-lg">{item.label}</span>
          </Link>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;
