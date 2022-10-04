import './App.css';
import io from "socket.io-client"
import { useState } from 'react';
import Chat from './Chat';



const socket=io.connect("http://localhost:3001")

function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showchat,setshowChat]=useState(false);

  const joinRoom=()=>{
    if(username!=="" && room!==""){
      socket.emit("join_room",room)
      setshowChat(true);
    }
  }
  return (
    <div className="App">
      {!showchat?(
      <div className='joinChatContainer'>
      <h3>Wanna chat</h3>
      <input type="text" placeholder="Your Name" onChange={(e)=>{
        setUsername(e.target.value)
      }}/>
      <input type ="text" placeholder="room id" onChange={(e)=>{
        setRoom(e.target.value);
      }}/>
      <button onClick={joinRoom}>join a room</button>
      </div>
  )
  :
  (
      <Chat socket={socket} username={username} room={room}/>
  )
  }
    </div>
  );
}

export default App;
