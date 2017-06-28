/* global io */
/* global moment */
/* global Mustache */
var socket = io();

function scrollToButton () {
    // Selectors
    var messages = $('#chat');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function(msg) {
    var params = $.deparam(window.location.search);
    socket.emit('join', params, function(err) {
        if(err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No errors');    
        }       
    });
});

socket.on('disconnect', function() {

});

socket.on('updateUserList', function(users) {
    var ol = $('<ol></ol>');
    users.forEach(function(user) {
        ol.append($('<li></li>').text(user));  
    });
    $('#users').html(ol);
});

socket.on('new user', function(message){
    console.log(message);
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    $('#chat').append(html);
    scrollToButton();
});

socket.on('newLocationMessage', function(message) {
    var template = $('#location-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template,{
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    $('#chat').append(html);
    scrollToButton();
});

/* global $ */
$("#message-form").on('submit', function(event) {
    event.preventDefault();
    
    var messageTextBox = $('[name=message]');
    
    socket.emit('createMessage', {
        text: messageTextBox.val()
    }, function() {
        $('[name=message]').val('');        
    });
});


var locationButton = $('#send-location');

/* global navigator */
if("geolocation" in navigator){
    locationButton.on('click', function(e) {
        
        locationButton.attr('disabled', 'disabled').text('Sending location...');
        
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
