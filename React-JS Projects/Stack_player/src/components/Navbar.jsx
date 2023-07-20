import React from "react";
import "./style/Navbar.css";

const Navbar = () => {
  return (
    <nav className="top-navbar">
      <div className="logo">Stack Player</div>
      <ul className="nav-links">
        <li className="nav-link">
          <span>Home</span>
        </li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
