const express = require("express"),
      http    = require("http"),
      socket  = require("socket.io"),
      path    = require("path");


const app = express();

const server = http.createServer(app);

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('disconnect', (socket) => {
        console.log('User disconnected');
    });
    socket.emit('newMessage', {
        from: 'mike@example.com',
        text: 'test',
        createdAt: 123
    });
    
    socket.on('createMessage', (newMessage) => {
        console.log(newMessage);
    });
});

app.use(express.static(path.join(__dirname, '../public')));

server.listen(process.env.PORT, process.env.IP, () => {
    console.log('Server is running');
});
