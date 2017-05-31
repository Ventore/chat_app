const express = require("express"),
      http    = require("http"),
      socket  = require("socket.io"),
      path    = require("path");


const app = express();

const server = http.createServer(app);

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New user connected');
    
    socket.emit('new user', {
        from: 'Admin',
        text: "Welcome to the chat app",
        createdAt: new Date().getTime()
    });
    
    socket.broadcast.emit('new user', {
        from: "Admin",
        text: 'New user joined us',
        createdAt: new Date().getTime()
    });
    
    socket.on('createMessage', (message) => {
        console.log(message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });
    
    socket.on('disconnect', (socket) => {
        console.log('User disconnected');
    });
});

app.use(express.static(path.join(__dirname, '../public')));

server.listen(process.env.PORT, process.env.IP, () => {
    console.log('Server is running');
});
