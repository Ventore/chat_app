const express = require("express"),
      http    = require("http"),
      socket  = require("socket.io"),
      path    = require("path");

const { generateMessage, generateLocationMessage } = require("./utils/message");
const { isRealString } = require("./utils/validation");
const { Users } = require("./utils/users"); 

const app = express();

const server = http.createServer(app);

const io = socket(server);
var users = new Users();

io.on('connection', (socket) => {
    
    socket.on('join', (params, callback) => {
        
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room are required');  
        }
        
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUsersList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));
        
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined chat`));
        callback();
    });
    
    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });
    
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('User', coords.latitude, coords.longitude));       
    });
    
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('updateUserList', users.getUsersList(user.room)); 
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))
        }
    });
});

app.use(express.static(path.join(__dirname, '../public')));

server.listen(process.env.PORT, process.env.IP, () => {
    console.log('Server is running');
});
