const express = require("express"),
      http    = require("http"),
      socket  = require("socket.io"),
      path    = require("path");

const { generateMessage, generateLocationMessage } = require("./utils/message");

const app = express();

const server = http.createServer(app);

const io = socket(server);


io.on('connection', (socket) => {
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));
    
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined chat'));
    
    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });
    
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('User', coords.latitude, coords.longitude));       
    });
    
    socket.on('disconnect', (socket) => {
        console.log('User disconnected');
        io.emit('newMessage', generateMessage('Admin', 'User has left chat'));
    });
});

app.use(express.static(path.join(__dirname, '../public')));

server.listen(process.env.PORT, process.env.IP, () => {
    console.log('Server is running');
});
