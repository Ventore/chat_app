const express = require("express"),
      http    = require("http"),
      socket  = require("socket.io"),
      path    = require("path");

const { generateMessage } = require("./utils/message");

const app = express();

const server = http.createServer(app);

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New user connected');
    
    socket.emit('new user', generateMessage('Welcome to the Chat App', 'Admin'));
    
    socket.broadcast.emit('new user', generateMessage('New user joined chat', 'Admin'));
    
    socket.on('createMessage', (message) => {
        console.log(message);
        io.emit('newMessage', generateMessage(message.text, message.from));
    });
    
    socket.on('disconnect', (socket) => {
        console.log('User disconnected');
    });
});

app.use(express.static(path.join(__dirname, '../public')));

server.listen(process.env.PORT, process.env.IP, () => {
    console.log('Server is running');
});
