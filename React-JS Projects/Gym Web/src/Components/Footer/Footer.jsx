import React from 'react'
import github from '../../assets/github.png'
import instagram from '../../assets/instagram.png'
import linkedin from '../../assets/linkedin.png'
import logo from '../../assets/logo.png'
import './Footer.css'
const Footer = () => {
    return (
        <div className='footer-container'>
            <hr />
            <div className="footer">
                <div className="social-links">
                    <a href='https://github.com/Harshu467' ><img src={github} alt="" /></a>
                    <a href='https://www.instagram.com/harshup_28/' ><img src={instagram} alt="" /></a>
                    <a href='https://www.linkedin.com/in/harsh-upadhye-b0269a213/' ><img src={linkedin} alt="" /></a>
                </div>
                <div className="logo-f">
                    <img src={logo} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Footer
