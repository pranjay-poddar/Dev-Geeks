import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <span className="name">
         Build with ❤️ & ☕ by - {" "}
        <a href="https://www.linkedin.com/in/piyush-eon" target="__blank">
         Diptamoy Mitra
        </a>
      </span>
      <hr style={{ width: "90%" }} />
      <div className="iconContainer">
        <a href="https://www.linkedin.com/in/diptamoy-mitra-ba9920203" target="__blank">
          <i className="fab fa-linkedin fa-2x"></i>
        </a>
        <a href="https://diptamoy-mitra.github.io/My-Portfolio-Website" target="__blank">
          <i className="fas fa-link fa-2x"></i>
        </a>
      </div>
    </div>
  );
};

export default Footer;