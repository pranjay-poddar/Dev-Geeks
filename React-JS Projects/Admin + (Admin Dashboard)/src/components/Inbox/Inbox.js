import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Inbox = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'John Doe',
      subject: 'Hello',
      body: 'Just wanted to say hi!',
      isRead: false,
    },
    {
      id: 2,
      sender: 'Jane Smith',
      subject: 'Meeting Reminder',
      body: "Don't forget about the meeting tomorrow at 2 PM.",
      isRead: true,
    },
    {
      id: 3,
      sender: 'Alice Johnson',
      subject: 'Important Update',
      body: 'Please review the attached document.',
      isRead: false,
    },
    // Add more messages as needed
  ]);

  const markAsRead = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, isRead: true } : message
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gradient-to-b from-indigo-400 to-blue-500 min-h-screen py-8 px-4"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4">Inbox</h2>
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`p-4 border rounded-lg ${
                message.isRead ? 'bg-gray-100' : 'bg-white'
              }`}
              onClick={() => markAsRead(message.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex justify-between">
                <h3 className={`font-semibold ${message.isRead ? 'text-gray-700' : 'text-black'}`}>
                  {message.sender}
                </h3>
                {!message.isRead && (
                  <button className="text-blue-500 hover:text-blue-600">
                    Mark as Read
                  </button>
                )}
              </div>
              <h4 className="font-medium text-gray-600">{message.subject}</h4>
              <p className="text-gray-800">{message.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Inbox;
