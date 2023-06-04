import React from 'react'
import { Tooltip } from '@material-ui/core'
import Zoom from '@material-ui/core/Zoom';
import GitHubIcon from '@material-ui/icons/GitHub';

// import { Link } from 'react-router-dom'
import logo from '../../media/logo.png'

import './Header.css'


function Header() {
    return (
        <div className="header">
            <div className="headerLeft">
                <img src={logo} alt="" />
            </div>
            <div className="headerRight">
                <a href='https://github.com/Ayush2966/Hand-Reacting' target="_blank" rel="noopener noreferrer">
                    <Tooltip title="Visit Github Repo" placement="bottom" TransitionComponent={Zoom}>
                        <GitHubIcon />
                    </Tooltip>
                    
                </a>
            </div>
        </div>
    )
}

export default Header
