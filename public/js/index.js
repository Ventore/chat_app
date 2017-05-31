var socket = io();
        
socket.on('connect', function(msg) {
    console.log('Connected!');
});

socket.on('disconnect', function() {
    console.log('Disconnected!');    
});

socket.on('new user', function(message){
    console.log(message);
})

socket.on('newMessage', function(message) {
    console.log(message);
});

