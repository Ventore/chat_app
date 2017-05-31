var socket = io();
        
socket.on('connect', function() {
    console.log('Connected!');
    socket.emit('createMessage', {
        to: "johndoe@example.com",
        text: "Hello from client"
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected!');    
});

socket.on('newMessage', function(message) {
    console.log(message);
});

