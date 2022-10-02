import React from 'react'



export default function Navbar(props) {
  
  return (
   <>
<nav className={`navbar navbar-expand-lg bg-${props.color}`}>
{/* <nav className="navbar navbar-expand-lg bg-light"> */}
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Pricing</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled">Disabled</a>
        </li>
       
      </ul></div>
      {/* <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
  <label className="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
</div> */}
<div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" role="switch" onClick={props.toggleMode} id="flexSwitchCheckDefault" />
  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable DarkMode</label>
  
    </div>
  </div>
</nav>
</>
  )
}



