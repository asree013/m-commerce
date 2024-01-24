const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const path = require('path');


app.use(express.static(path.join(__dirname, 'view/page')));
app.use('/js', express.static(path.join(__dirname, 'view/js')));
app.use('/css', express.static(path.join(__dirname, 'view/css')));
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(require('./routes'))


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log({
            user: msg.user,
            message: msg.message
        });
        io.emit('chat message', msg)
      });
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});

