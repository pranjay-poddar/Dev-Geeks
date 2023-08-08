import React, { useState } from 'react'
import "./Join.css"
import logo from '../../image/logo.png'
import { Link } from 'react-router-dom'


let user;

const sendUser = () => {
    user = document.getElementById("JoinInput").value;
    document.getElementById("JoinInput").value = "";
}

const Join = () => {

    const [name, setname] = useState("");
    
    return (
        <div className='JoinPage'>
            <div className="JoinContainer">
                <img src={logo} alt="logo" className='JoinLogo' />
                <h1>Edu Chat</h1>
                <input type="text" onChange={(e) => { setname(e.target.value) }} id="JoinInput" placeholder='Enter Your Name' />
                <Link  onClick={(e) => { !name && e.preventDefault(); return false; }} to="/chat" ><button id='JoinBtn' onClick={sendUser}>Log In</button></Link>
            </div>
        </div>
    )
}

export default Join
export { user }