import React, { useEffect, useState } from 'react';
import socketIO from "socket.io-client";
import ReactScrollToBottom from "react-scroll-to-bottom";

import "./Chat.css";
import Message from "../Message/Message.js";
import { user } from "../Join/Join.js";
import sendImg from "../../image/send.png";
import closeImg from "../../image/close.png";



const ENDPOINT = "http://localhost:4444"

let socket;

const Chat = () => {

  const [id, setid] = useState("")
  const [msg, setmsg] = useState([])
  console.log(msg)

  const send = ()=> {
    const message = document.getElementById('ChatInput').value;
    socket.emit('message',{message,id})
    document.getElementById('ChatInput').value="";
  }
  useEffect(() => {

    socket = socketIO(ENDPOINT, { transports: ['websocket'] });

    socket.on('connect', () => {
      console.log("Connected");
      setid(socket.id)
    })
    
    console.log(socket)
    socket.emit('joined',{user})

    socket.on('welcome',(data)=>{
      setmsg([...msg,data])
      console.log(data.user,data.message)
    })

    socket.on('userJoined',(data)=>{
      setmsg([...msg,data])
      console.log(data.user,data.message)
    })

    socket.on('leave',(data)=>{
      setmsg([...msg,data])
      console.log(data.user,data.message)
    })

    return () => {
      socket.emit('disconnected')
      socket.off();
    }
  }, [])

  useEffect(() => {
    socket.on('sendMessage',(data)=>{
      setmsg([...msg,data])
      console.log(data.user, data.message,data.id)
    })
    return () => {
      socket.off()
    }
  }, [msg])
  




  return (
    <div className='ChatPage'>
      <div className="ChatContainer">
        <div className="ChatHeader">
          <h2>Edu Chat</h2>
          <a href="/"><img src={closeImg} alt="close" /></a>
        </div>
        <ReactScrollToBottom className="ChatBox"> 
          {msg.map((item,i)=><Message user={item.id===id?'':item.user} message={item.message} key={i} classs={item.id===id?'left':'right'} />)}
        </ReactScrollToBottom>
        <div className="InputBox">
          <input type="text" id="ChatInput"  onKeyDown={(e)=> e.key === 'Enter' ? send():"" }/>
            {/* e.key==='Enter'?send:null}/> */}
          <button className="SendBtn" onClick={send}>
            <img src={sendImg} alt="send" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
