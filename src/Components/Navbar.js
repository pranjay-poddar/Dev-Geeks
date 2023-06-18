
import React, { useRef } from 'react';
import logo from '../images/logo.png';
import { cart } from './Data';

function Navbar() {
  const searchRef = useRef();
  const cartRef = useRef();
  const navRef=useRef();
  const searchHandler = () =>{
   searchRef.current.classList.toggle("active");
   cartRef.current.classList.remove("active");
   navRef.current.classList.remove("active");
  };

  const cartHandler = () =>{
    cartRef.current.classList.toggle("active");
    searchRef.current.classList.remove("active");
    navRef.current.classList.remove("active");
   };

   const navHandler = () =>{
    navRef.current.classList.toggle("active");
    cartRef.current.classList.remove("active");
    searchRef.current.classList.remove("active");
   };

  return (
    <>
      <header className='header'>
        <a href="#" className='logo'>
          <img src={logo}></img>
        </a>
        <nav className='navbar' ref={navRef}>
          <a href='#home'>Home</a>
          <a href='#about'>About</a>
          <a href='#menu'>Menu</a>
          <a href='#products'>Products</a>
          <a href='#reviews'>Reveiws</a>
          <a href='#contact'>Contact</a>
        </nav>
        <div className='icon'>
          <div className='fas fa-search' onClick={searchHandler}></div>
          <div className='fas fa-shopping-cart' onClick={cartHandler}></div>
          <div className='fas fa-bars' id='menu-btn' onClick={navHandler}></div>
        </div>
        <div className='search-bar' ref={searchRef}>
         <input type='search' placeholder='Search Here...' id='search-box'/>
         <label htmlFor='search-box' className='fas fa-search'></label>
        </div>
        <div className='cart-items-container' ref={cartRef}>
         {
          cart.map((item, index) => (
            <div className='cart-items'>
              <span className='fas fa-times'></span>
              <img src={item.img} alt=''/>
              <div className='content'>
                <h3>cart item 1</h3>
                <div className='price'>$13.99 /-</div>
              </div>
            </div>
          ))
         }
         <div className='btn'>
         <a  href='#'>Checkout Now</a>
         </div>
        </div>
      </header>
    </>
  )
}

export default Navbar
