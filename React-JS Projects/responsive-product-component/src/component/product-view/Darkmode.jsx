import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useState(getInitialMode());

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    // Save the user's preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem('darkMode'));
    return savedMode || false;
  }

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="dark-mode-toggle" onClick={handleDarkModeToggle}>
      <FaSun color="#FFD700" />
      <div className={`slider ${darkMode ? 'on' : 'off'}`}></div>
      <FaMoon color="#696969" />
    </div>
  );
};

export default DarkModeButton;