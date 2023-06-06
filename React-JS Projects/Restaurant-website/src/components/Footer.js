import React from 'react';

const Footer = () => {
    return (
        <div className="footer">
        <footer>
            <ul className="socials">
            <li><a href="#" target="_blank"><i className="fa fa-github"></i></a></li>
            <li><a href="#" target="_blank"><i className="fa fa-twitter"></i></a></li>
            <li><a href="#" target="_blank"><i className="fa fa-linkedin-square"></i></a></li>
            </ul>
            <div className="footer-menu">
            <ul className="f-menu">
                <li><a href="#" target="_blank">Terms and conditions</a></li>
                <li><a href="#" target="_blank">Privacy Policy</a></li>
                <li><a href="#" target="_blank">Copyright Information</a></li>
            </ul>
            </div>
        </footer>
        </div>
    );
    }

export default Footer;
