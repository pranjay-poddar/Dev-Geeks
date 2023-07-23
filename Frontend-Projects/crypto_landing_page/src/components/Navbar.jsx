import React from 'react'
import { siteLogo, playstore, webLogo, hamIcon } from '../assets'
import { navLinks } from '../constants/index'
import styles from '../styles'

const Navbar = () => (
  <div className="flex justify-between items-center my-4 ">
    <div className="w-[141px] md:w-[169px]">
    <img src={siteLogo} alt="crypto.com" />
    </div>

    <div className="flex justify-evenly">
      <div className={`hidden lg:${styles.flexCenter} mr-10`}>
        {navLinks.map((nav) => (
          <div key={nav.id} className={`${styles.flexCenter} ml-8 text-gray-500 text-lg font-bold cursor-pointer hover:text-[#F4F4F4]`}>
            {nav.link}
            {nav.icon ? <img src={nav.icon} className="w-3 h-3 ml-2" /> : null}
          </div>
        ))}
      </div>

      <div className='border-[1px] border-theme rounded-[4px] flex text-white font-semibold items-center px-2 cursor-pointer'>
      <img src={playstore} alt="playstore" className='w-4 h-4 mx-1 my-3 ml-0 object-contain'/>
      <span>App</span>
      </div>

      <img src={hamIcon} alt="menu" 
      className='lg:hidden w-12 h-8 invert ml-3 md:ml-10 mt-1 object-contain'
      />

      <div className='hidden lg:flex font-semibold text-[#f4f4f4] ml-8 mt-2 text-base cursor-pointer'>
        <img src={webLogo} alt="lang" 
        className='w-5 h-5 mr-2 mt-[2px] object-contain'
        />
        <span>English</span> 
      </div>


    </div>
  </div>
)

export default Navbar
