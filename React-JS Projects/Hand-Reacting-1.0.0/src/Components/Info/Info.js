import React from 'react'
import { ImPen } from "react-icons/im";

import './Info.css'
import image from '../../media/pen.svg'

function Info() {
    return (
        <div className="info">
            <div className="info_about">
                <h3><span>H</span>and<span>R</span>eacting</h3>
                <p>
                    <ImPen className="penIcon"/>
                    Are you tired and fed up of the multitude of written assignments that you have to submit?
                    HandReacting is the PERFECT solution to all your problems. It converts typed documents into handwritten ones, saving you a hella lotta time. While you are at it, go ahead and have fun with all the fonts and effects. 
                    
                    <ImPen className="penIcon"/>
                </p>
            </div>
            <div className="info_image">
                <img src={image} alt="pen" />
            </div>
        </div>
    )
}

export default Info
