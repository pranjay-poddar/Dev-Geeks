import React, { useState } from 'react';
import './Card.css';

function Card({ post, socket, user }) {
  const [liked, setLiked] = useState(false)

  const notificationHandler = (type) => {
    setLiked(true);
    socket.emit('sendNotification',{
      senderName:user,
      receiverName: post.username,
      type,
    },[])
  }; 

  return (
    <div className='card'>
      <div className='info'>
        <img src={post.userImg} alt='user' className='userImg'></img>
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt='post' className='postImg'></img>
      <div className='interaction'>
        {
          liked ? (<div className="fa-filled fa-solid fa-heart cardIcon color" ></div>) : (<div className="fa-regular fa-heart cardIcon" onClick={()=>notificationHandler(1)}></div>)
        }
        <div className="fa-regular fa-comment cardIcon" onClick={()=>notificationHandler(2)}></div>
        <div className="fa-regular fa-share-from-square cardIcon" onClick={()=>notificationHandler(3)}></div>
        <div className="fa-sharp fa-solid fa-circle-info cardIcon infoIcon"></div>
      </div>
    </div>
  )
}

export default Card;
