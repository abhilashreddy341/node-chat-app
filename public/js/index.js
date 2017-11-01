var socket = io();
socket.on('connect',function(){
  console.log('connected to the server');

  socket.on('newconnection',function(adminMessage){
    console.log('message',adminMessage);
  })
})
socket.on('disconnect',function(){
  console.log('Disconnected from the server');
})
socket.on('newMessage',function(message){
  console.log('New message arrived',message);
  var li= jQuery('<li></li>');
  li.text(`${message.from}:${message.text}`);
  jQuery('#messages').append(li);
})

socket.on('newLocationMessage',function(message){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current Location</a>');
  li.text(`${message.from}: `)
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage',{
    from : 'User',
    text : messageTextbox.val()
  },function(){
    messageTextbox.val('');
  })
})

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
  if(!navigator.geolocation){
   return alert('geolocation is not supported by your browser');
  }
  locationButton.attr('disabled','disabled').text('sending location');
  navigator.geolocation.getCurrentPosition(function(positions){
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage',{
      longitude:positions.coords.longitude,
      latitude : positions.coords.latitude
    });
  },function(){
    alert('unable to fetch your location');
    locationButton.removeAttr('disabled').text('Send Location');
  });
});
