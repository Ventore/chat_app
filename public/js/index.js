/* global io */
var socket = io();
        
socket.on('connect', function(msg) {
    console.log('Connected!');
});

socket.on('disconnect', function() {
    console.log('Disconnected!');    
});

socket.on('new user', function(message){
    console.log(message);
});

socket.on('newMessage', function(message) {
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#chat').append(li);
});

socket.on('newLocationMessage', function(message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#chat').append(li);
    
});

/* global $ */
$("#message-form").on('submit', function(event) {
    event.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {
        
    });
    $('[name=message]').val('');
});


var locationButton = $('#send-location');

/* global navigator */
if("geolocation" in navigator){
    locationButton.on('click', function(e) {
        navigator.geolocation.getCurrentPosition(function(possition) {
            console.log(possition.coords); 
            socket.emit('createLocationMessage', {
                latitude: possition.coords.latitude,
                longitude: possition.coords.longitude
            });
        }, function() {
            alert('Unable to fetch possition');    
        });
    });    
} else {
    locationButton.prop('disabled', true);
}
