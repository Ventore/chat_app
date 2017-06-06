const express = require("express"),
      http    = require("http"),
      socket  = require("socket.io"),
      path    = require("path");

const { generateMessage } = require("./utils/message");

const app = express();

const server = http.createServer(app);

const io = socket(server);

io.on('connection', (socket) => {
    socket.emit('newMessage', generateMessage('Welcome to the Chat App', 'Admin'));
    
    socket.broadcast.emit('newMessage', generateMessage('New user joined chat', 'Admin'));
    
    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.text, message.from));
        callback('This is from server');
    });
    
    socket.on('createLocationMessage', (coords) => {
        io.emit('newMessage', generateMessage('Admin', `${coords.longitude}, ${coords.latitude}`))        
    });
    
    socket.on('disconnect', (socket) => {
        console.log('User disconnected');
        io.emit('newMessage', generateMessage('User has left chat', 'Admin'));
    });
});

app.use(express.static(path.join(__dirname, '../public')));

server.listen(process.env.PORT, process.env.IP, () => {
    console.log('Server is running');
});
