/* eslint-disable no-unused-vars */
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)

io.on('connection', (socket) => {
console.log('socket connected', socket.id);
});

const port = process.env.port || 5000
server.listen(port, () => console.log(`listen ${port}`))
