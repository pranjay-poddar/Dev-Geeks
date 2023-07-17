import React from 'react';
//import './navbar.css';

const Navbar = () => {
    return (
        <div className="nav">
            <input type="checkbox" id="nav-check" />
            <div className="nav-header">
                <div className="nav-title">
                    <img src="image/logo.png" alt="Logo" width="100" height="50" />
                </div>
            </div>
            <div className="nav-btn">
                <label for="nav-check">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>

            <div className="nav-links">
                <ul>
                    <li><a href="#about">About Us</a></li>
                    <li><a href="#chefs">Chefs</a></li>
                    <li><a href="#menu">Menu</a></li>
                    <li><a href="#special">Week Special</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;



