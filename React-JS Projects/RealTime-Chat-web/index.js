const express =require('express')
const app=express()
const http=require("http")
const cors=require("cors")
const { Socket } = require('socket.io')
const {Server}=require("socket.io")

app.use(cors());
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    },
})

io.on("connection",(socket)=>{
    console.log(socket.id)

    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`user join the room ${socket.id} is ${data}`);

    })

    socket.on("send_message",(data)=>{
        console.log(data)
        socket.to(data.room).emit("recieve_message",data);
    });

    socket.on("disconnect",()=>{
        console.log("user disconnected")
    })
})
server.listen(3001,()=>{
    console.log("server is running in 3001")
})