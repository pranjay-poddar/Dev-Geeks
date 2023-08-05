/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import React, { useState, useRef, useEffect } from 'react'
import Client from '../componets/Client';
import Editor from '../componets/editor';
import { initSocket } from '../socket';
import ACTIONS from "../Actions"
import { useLocation } from 'react-router-dom';
const editorPage = () => {
  const socketRef = useRef(null);
  const loaction = useLocation()
  useEffect(() => {
    const init = async () => {
        socketRef.current = await initSocket();
        socketRef.current.emit(ACTIONS.JOIN, {
          roomId,
          username: loaction.state.username,
        })
    }
    init();
  }, []);
  const [clients, setClients] = useState([
    { socketId: 1, username: 'Rakesh k' },
    { socketId: 2, username: 'Arshad k' },
    { socketId: 2, username: 'Arshad k' }
  ]);
  return (
    <div className="mainWrapper">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className="logoImg" src="/logo.png" alt="logo" />
          </div>
          <h4>Connected</h4>
          <div className="clientList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn copybtn">COPY ROOM ID</button>
        <button className="btn leavebtn">LEAVE</button>
      </div>
      <div className="editorWrap">
        <Editor />
      </div>
    </div>
  )
}

export default editorPage
