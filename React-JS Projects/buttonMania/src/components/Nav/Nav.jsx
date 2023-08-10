import React from 'react'
import logo from '/logo.png'
import './nav.css'

const Nav = () => {
  return (
    <nav className='flex'>
      <img src={logo} alt="Button Mania - Single stop for buttons" className='logo'/>
      <p className='logoText'>Button Mania</p>
    </nav>
  )
}

export default Nav
