import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="logo">❄️ PK Temperatures❄️</div>
      <nav>
        <ul>
          <li>Home</li>
          <li>Weather</li>
          <li>About</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
