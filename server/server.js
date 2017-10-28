const path = require('path');
const express= require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');

const port = process.env.PORT||3000;
var app = express();
var server = http.createServer(app);
app.use(express.static(publicPath));
var io = socketIO(server);

io.on('connection',(socket)=>{
  console.log("New user connected");

  socket.emit('newMessage',generateMessage('admin','Welcome to new chat app'));

  socket.broadcast.emit('newMessage',generateMessage('admin','New user Joined'));

  socket.on('createMessage',(message,callback)=>{
    console.log('createMessage',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
     callback('This is from server');
  });
  socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('admin',coords.latitude,coords.longitude));
  })
  socket.on('disconnect',()=>{
    console.log('A user is disconnected');
  })
})


server.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
})
