var socket = io();

function scrollToBottom(){
 var messages = jQuery('#messages');
 var newMessage = messages.children('li:last-child');

 var clientHeight = messages.prop('clientHeight');
 var scrollTop = messages.prop('scrollTop');
 var scrollHeight = messages.prop('scrollHeight');
 var newMessageHeight = newMessage.innerHeight();
 var lastMessageHeight = newMessage.prev().innerHeight();

 if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
   messages.scrollTop(scrollHeight);
 }

}

socket.on('connect',function(){
   var params = jQuery.deparam(window.location.search);
  socket.emit('join',params,function(err){
    if(err){
       alert(err);
       window.location.href = '/';
    }
    else{
       console.log('no errors');
    }
  })

  socket.on('newconnection',function(adminMessage){
    console.log('message',adminMessage);
  })
})

socket.on('updatedUsersList',function(users){
  var ol = jQuery('<ol></ol>');
  users.forEach((user)=>{
   ol.append(jQuery('<li></li>').text(user));
  })
  jQuery('#users').html(ol);
});

socket.on('disconnect',function(){
  console.log('Disconnected from the server');
})
socket.on('newMessage',function(message){

  // var template = jQuery('#message-template').html();
  // var html = Mustache.render(template);
  // jQuery('#messages').append(html);
  var formattedtime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    text : message.text,
    from : message.from,
    createdAt : formattedtime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage',function(message){
  var formattedtime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template,{
    from: message.from,
    createdAt: formattedtime,
    url : message.url
  })
  jQuery('#messages').append(html);
  scrollToBottom();
})

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage',{
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
