import React, {useState,useEffect} from 'react'
import "./Nav.css"
import logo from "./../Assets/logo.png"
import avatar from "./../Assets/lena.png"

const Nav = () => {

    const [show,handleShow] = useState(false);

    const transitionNavBar = ()=>{
        if(window.scrollY>100){
            handleShow(true)
        }
        else{
            handleShow(false)
        }
    }

    useEffect(() =>{
        window.addEventListener("scroll", transitionNavBar);
        return () => window.addEventListener("scroll",transitionNavBar);
    },[] );

  return (
    <div className={`navbar ${show && "nav_black" }`}>
        <div className='nav_content'>
            <img src = {logo} alt = "Netflix Logo" className='nav_logo' ></img>
            <img src = {avatar} alt="Avatar" className="nav_avatar" ></img>
        </div>
    </div>
  )
}

export default Nav