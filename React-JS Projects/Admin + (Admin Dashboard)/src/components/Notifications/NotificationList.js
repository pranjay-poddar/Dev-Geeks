import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const notifications = [
  {
    id: 1,
    title: 'New Message',
    message: 'You have received a new message from John Doe.',
  },
  {
    id: 2,
    title: 'Absence Leave Request',
    message: 'You have a new Absence Leave request from Jane Smith.',
  },
  {
    id: 3,
    title: 'New Event',
    message: 'You have been invited to a new event.',
  },
  {
    id: 4,
    title: 'Product Update',
    message: 'A new product update is available. Check it out!',
  },
  {
    id: 5,
    title: 'Absence Leave Request',
    message: 'You have a new Absence Leave request from Mark Johnson.',
  },
  {
    id: 6,
    title: 'Payment Received',
    message: 'Congratulations! Payment of $1000 has been received.',
  },
];

const NotificationList = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-400 to-blue-500 py-10">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6">Notifications</h2>
        <div className="space-y-4">
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                className="bg-gray-100 rounded-lg p-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-1">{notification.title}</h3>
                <p className="text-gray-600">{notification.message}</p>
              </motion.div>
            ))}
          </AnimatePresence>
          {notifications.length === 0 && (
            <p className="text-gray-600">No new notifications.</p>
          )}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-6 focus:outline-none"
          onClick={toggleNotifications}
        >
          {isOpen ? 'Show less...' : 'Show More...'}
        </button>
      </div>
    </div>
  );
};

export default NotificationList;
