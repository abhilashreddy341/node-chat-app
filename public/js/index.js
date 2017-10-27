var socket = io();
socket.on('connect',function(){
  console.log('connected to the server');

  socket.emit('createMessage',{
    to : 'praveen',
    text : 'hey there'
  });
})
socket.on('disconnect',function(){
  console.log('Disconnected from the server');
})
socket.on('newMessage',function(message){
  console.log('New message arrived',message);
})
