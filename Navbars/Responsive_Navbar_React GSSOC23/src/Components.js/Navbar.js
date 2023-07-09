import React, { useState } from 'react'
import Logo from '../Assests/bars-solid.svg'
import './NavbarStyle.css'


const Navbar = () => {

  const [toggle, setToggle] = useState(false);
  let show = true;

  if(window.innerWidth<=560){
    show = false;
  }

  return (
    <div>
      <nav id="nav">
        <div className='navContainer'>
          <div id="dropDown" onClick={()=>{setToggle(!toggle)}}>
            <img src={Logo} alt="BARS" id='dropDownImg' height="30vh" />
          </div>
          <div className="logo">
            CRAZY
          </div>
        </div>
        {toggle || show ?
        <>
          <ul>
            <li><a href="/#">Home</a></li>
            <li><a href="/#">About</a></li>
            <li><a href="/#">Services</a></li>
            <li><a href="/#">Portfolio</a></li>
            <li><a href="/#">Team</a></li>
            <li><a href="/#">Contact</a></li>
          </ul>
          <div className="navButton" >
            <button>Get Started</button>
          </div>
        </> : null
        }
      </nav>
    </div>
  )
}

export default Navbar