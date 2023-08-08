import React from 'react'
import "../_styles/Message.css"

const Message: React.FC<{ message: string, setShowMsg:Function}> = ({message,setShowMsg}) => {
    return (
    <div id='main'>
        <div className='messageContainer'>
            <img src="https://cdn-icons-png.flaticon.com/512/2976/2976286.png" alt="Close" className='closeIcon' onClick={()=>setShowMsg(false)}/>
            <div>
                <h1 className='message'>{message}</h1>
            </div>
        </div>
    </div>
    )
}

export default Message
