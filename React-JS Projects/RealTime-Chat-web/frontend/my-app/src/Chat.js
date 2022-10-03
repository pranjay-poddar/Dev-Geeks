import React from 'react'
import {useState ,useEffect} from 'react'
import ScrollToBottom from "react-scroll-to-bottom";
function Chat({socket,username,room}) {
    const [currentmsg, setcurrentmsg] = useState("")
    const [messagelist,setMessagelist]=useState([])

    const sendMessage= async ()=>{
        if(currentmsg !== ""){
            const messageData={
                room:room,
                author:username,
                message:currentmsg,
                time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
            }
          await  socket.emit("send_message",messageData);
          setMessagelist((list)=>[...list,messageData])
          setcurrentmsg("")
        }


    }
    useEffect(() => {
      socket.on("recieve_message",(data)=>{
        setMessagelist((list) => [...list, data]);
      })
    }, [socket])
    
  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <p>live chat</p>
      </div>
      <div className='chat-body'>
      <ScrollToBottom className="message-container">
        {messagelist.map((messagecont)=>{
            return <div className='message' id={username===messagecont.author ? "you" : "other"}>
                <div>
                    <div className='message-content'>
                        <p>{messagecont.message}</p>
                    </div>
                    <div className='message-meta'>
                        <p className='time'>{messagecont.time}</p>
                        <p className='author'>{messagecont.author}</p>
                    </div>
                </div>
            </div>
        })

        }
       </ScrollToBottom>
      </div>
      <div className='chat-footer'>
        <input type="text" placeholder='hello' 
        value={currentmsg}
        onChange={(e)=>{
            setcurrentmsg(e.target.value)
        }}
        onKeyPress={(e)=>{
            e.key==="Enter" && sendMessage();
        }}
        />
        <button className='send-btn' onClick={sendMessage}>send</button>
      </div>
    </div>
  )
}

export default Chat
