/* global io */
/* global moment */
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
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    li.text(`${message.from} at ${formattedTime}: ${message.text}`);
    $('#chat').append(li);
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');
    li.text(`${message.from} at ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#chat').append(li);
    
});

/* global $ */
$("#message-form").on('submit', function(event) {
    event.preventDefault();
    
    var messageTextBox = $('[name=message]');
    
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {
        $('[name=message]').val('');        
    });
});


var locationButton = $('#send-location');

/* global navigator */
if("geolocation" in navigator){
    locationButton.on('click', function(e) {
        
        locationButton.attr('disabled', 'disabled').text('Sending location...')
        
        navigator.geolocation.getCurrentPosition(function(possition) {
            locationButton.removeAttr('disabled').text('Send my location');
            socket.emit('createLocationMessage', {
                latitude: possition.coords.latitude,
                longitude: possition.coords.longitude
            });
        }, function() {
            alert('Unable to fetch possition');
            locationButton.removeAttr('disabled').text('Send my location');
        });
    });    
} else {
    locationButton.prop('disabled', true);
}
