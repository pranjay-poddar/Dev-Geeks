import React from 'react';
import "./Message.css";

const Message = ({user,message,classs}) => {
    if(user){
        return (
            <div className={`MessageBox ${classs}`}>
              {`${user}: ${message}`}
            </div>
          )
    }

    return (
        <div className={`MessageBox ${classs}`}>
          {`You: ${message}`}
        </div>
      )
  
}

export default Message
