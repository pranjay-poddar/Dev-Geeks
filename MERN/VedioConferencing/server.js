const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io =  require('socket.io')(server);
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// Routing
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ZoomCord Bot';
const ACCEPTED_ROOMS = ["Malaysia", "Indonesia", "Singapore"];

// Run when client connets
io.on('connection', socket => {
    socket.on('joinRoom', ({ userPeerId, username, room }) => {
        if (!ACCEPTED_ROOMS.includes(room)) {
            socket.emit('roomNotValid');
        }

        const user = userJoin(userPeerId, username, room);

        if (!user) {
            socket.emit('sameName');
        } else {

            socket.join(user.room);
        
            // only show in client to the user connecting
            socket.emit('message', formatMessage(botName, 'Welcome to ZoomCord!'));

            // Broadcast to all except the user itself in a specif room
            socket.broadcast
                .to(user.room)
                .emit(
                    'message',
                    formatMessage(botName, `${user.username} has joined the chat`)
                );

            socket.broadcast.to(user.room).emit('user-connected', userPeerId)

            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room) // E.g return: [{id: '6JhtU8cQGMZzzzj5AAAB', username: 'kaiimran', room: 'Malaysia'}]
            });

            socket.on('typing', () => {
                console.log('typing');

                socket.broadcast
                    .to(user.room)
                    .emit('typing', {
                        username: user.username
                    });
            });

            socket.on('stop typing', () => {
                console.log('stop typing');

                socket.broadcast
                    .to(user.room)
                    .emit('stop typing', {
                        username: user.username
                    });
            });

            // Listen for chatMessage
            socket.on('chatMessage', msg => {
                const user = getCurrentUser(userPeerId);

                // Broadcast to all clients in the room
                io
                    .to(user.room)
                    .emit('message', formatMessage(user.username, msg));
            });

            // Runs when client disconnects
            socket.on('disconnect', () => {
                const user = userLeave(userPeerId);

                if (user) {
                    io
                    .to(user.room)
                    .emit('message', formatMessage(botName, `${user.username} has left the chat`));
                }

                // Send users and room info
                io.to(user.room).emit('roomUsers', {
                    room: user.room,
                    users: getRoomUsers(user.room)
                });

                socket.broadcast.to(user.room).emit('user-disconnected', userPeerId)
            });
        }
    });

});