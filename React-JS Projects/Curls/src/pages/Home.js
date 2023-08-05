/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { v4 as uuidV4 } from "uuid"
import { toast } from 'react-hot-toast';

const Home = () => {
  const [RoomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const createNewId = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("CREATED ROOM ID")
  }
  return (
    <div className="homePageWrapper">
      <div className="fromPageWrapper">
        <img className="logo-main" src="formImage.png" alt="CURLS" />
        <h4 className="mainLabel">Paste invitation ROOM ID</h4>
        <div className="inputGroup">
          <input value={RoomId} onChange={(e) => setRoomId(e.target.value)} type="text" className="inputBox" placeholder="ROOM ID:" />
          <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="inputBox" placeholder="USERNAME:" />
          <button className="btn joinbtn">JOIN</button>
          <span className="createInfo">
            If you don't have an invite then create &nbsp;
            <a onClick={createNewId} href="#" className="createNewBtn">new room</a>
          </span>
        </div>
      </div>
      <h4>Made with 💛 <a href="https://github.com/proudlydumb" className="bottomName">ARSHAD</a></h4>
    </div>
  )
}

export default Home
