import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 px-6 mt-auto">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.
        </p>
        <div className="flex space-x-2">
          <a href="#" className="text-white hover:text-gray-300">
            Privacy Policy
          </a>
          <span className="text-white">|</span>
          <a href="#" className="text-white hover:text-gray-300">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
