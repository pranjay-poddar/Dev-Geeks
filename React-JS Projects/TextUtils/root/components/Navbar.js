import React from 'react'
import PropTypes from 'prop-types'
// import {a, Router} from 'react-router-dom
// import About from './About'
export default function Navbar(props) {
     return (
          <>
               <nav className={`navbar navbar-${props.mode} bg-${props.mode}`}>  
     <div className="container-fluid">
     <a className="navbar-brand my-3" href="#">{props.title}</a>
     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
     </button>
     <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
               <a className="nav-a active" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item">
               <a className="nav-a" href='./About.js'>{props.About}</a>
          </li>
          <div className={"form-check form-switch"} onClick={props.toggleMode}>
               <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
               <label className={`form-check-label text-${props.mode === 'light'?'dark':'light'}`} htmlFor="flexSwitchCheckDefault ">Enable Dark Mode</label>
</div>
          </ul>
     </div>
     </div>
     </nav>
          </>
     )
}

Navbar.propTypes = {
     title: PropTypes.string.isRequired,
     About: PropTypes.string.isRequired
}

Navbar.defaultProps = {
     title: "Parmesh",
     About: "ABCD"
}