import React, { useState } from 'react'
import './Header.css'
import Logo from '../../assets/logo.png'
import Bars from '../../assets/bars.png'
import { Link } from 'react-scroll'
const Header = () => {
  const mobile = window.innerWidth <= 768 ? true : false;
  const [menuopen, setmenuopen] = useState(false);
  return (
    <div className='header'>
      <img src={Logo} alt='Logo' className='logo' />
      {menuopen === false && mobile === true ? (
        <div
          style={{ backgroundColor: 'var(--appColor)', padding: '0.5rem', borderRadius: '5px' ,cursor:'pointer' }} 
          onClick={()=> setmenuopen(true) }
          ><img src={Bars} style={{ width: '1.5rem', height: '1.5rem' }} alt="" /></div>
      ) : (<ul className='header-list'>
        <li  ><Link
        onClick={()=>setmenuopen(false)}
        smooth={true}
        activeClass='active'
        span={true}
        to='Home'
        >Home</Link></li>
        <li  ><Link
        onClick={()=>setmenuopen(false)}
        smooth={true}
        span={true}
        to='Program'
        >Program</Link></li>
        <li  ><Link
        onClick={()=>setmenuopen(false)}
        smooth={true}
        span={true}
        to='Reason'
        >Why us</Link></li>
        <li ><Link 
        onClick={()=>setmenuopen(false)}
        smooth={true}
        span={true}
        to='Plans'
        >Plans</Link></li>
        <li ><Link
        onClick={()=>setmenuopen(false)}
        smooth={true}
        span={true}
        to='testimonials'
        >Testimonials</Link></li>
      </ul>
      )}
    </div>
  );
}

export default Header
