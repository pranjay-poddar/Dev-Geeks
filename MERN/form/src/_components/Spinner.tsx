import React from 'react'
import "../_styles/Spinner.css"

const Spinner = () => {
    return (
    <div id='main'>
        <div className='lds-roller-container'>
            <div className='lds-roller'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
    )
}

export default Spinner
