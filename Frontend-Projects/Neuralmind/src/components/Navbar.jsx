import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ children }) => {
  const routes = [
    {
      path: "/",
      name: "Train",
    },
    {
      path: "/chat",
      name: "Chat",
    },
    {
      path: "/admin",
      name: "Admin",
    },
  ];
  return (
    <div className="container-fluid">
      <div className="cust-nav d-flex flex-column flex-shrink-0 p-3 bg-light">
        <a
          href="/"
          className="d-flex justify-content-center mb-5 link-dark text-decoration-none"
        >
          <span className="fs-4">NeuralMind</span>
        </a>
        <ul className="nav nav-pills flex-column mb-auto">
          {routes.map((item, index) => (
            <NavLink to={item.path} key={index} className="link">
              <li className="nav-link nav-item">{item.name}</li>
            </NavLink>
          ))}
        </ul>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Navbar;
