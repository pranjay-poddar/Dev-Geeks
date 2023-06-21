import React, { useEffect, useState } from 'react'
import './Navbar.css'

function Navbar({ socket }) {
  const [notifications, setNotifications] = useState([])
  const [open, setOpen] = useState(false)
  useEffect(() => {
    socket.on('getNotification', data => {
      setNotifications((prev) => [...prev, data]);
    })
  }, [socket]);

  console.log(notifications);

  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = 'liked'
    }
    else if (type === 2) {
      action = 'commented'
    }
    else {
      action = 'shared'
    }
    return (
      <span className='notification'>{`${senderName} ${action} your post`}</span>
    )
  }

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  }


  return (
    < div className='navbar'>
      <span className='logo'>Insta</span>
      <div className='icons'>
        <div className='icon' onClick={() => setOpen(!open)}>
          <i className="fa-sharp fa-solid fa-bell"></i>
          {
            notifications.length > 0 &&
            <div className='counter'> {notifications.length} </div>
          }
        </div>
        <div className='icon' onClick={() => setOpen(!open)}>
          <i className="fa-sharp fa-solid fa-message"></i>

        </div>
        <div className='icon' onClick={() => setOpen(!open)}>
          <i className="fa-sharp fa-solid fa-gear"></i>

        </div>
      </div>
      {open && (
        <div className='notifications'>
          {notifications.map((n) => displayNotification(n))}
          <button className='n-btn' onClick={handleRead}>Mark as read</button>
        </div>
      )
      }
    </div>
  )
}

export default Navbar
