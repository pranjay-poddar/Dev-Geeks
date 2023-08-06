import React from "react"
import '../style.css'
import logo from '../images/troll-face.png';
export default function Header() {
    return (
        <div className="header">
            <img className="header--image" src={logo} />
            <h1 className="header--title">Meme Generator</h1>
        </div>
    )
}