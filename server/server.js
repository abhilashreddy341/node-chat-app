const path = require('path');
const express= require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isStringValid} = require('./utils/validation');
const publicPath = path.join(__dirname,'../public');

const port = process.env.PORT||3000;
var app = express();
var server = http.createServer(app);
app.use(express.static(publicPath));
var io = socketIO(server);

io.on('connection',(socket)=>{
  console.log("New user connected");

  socket.on('join',(params,callback)=>{
    if(!isStringValid(params.name)&&!isStringValid(params.room)){
      callback('enter valid name and room name');
    }
    socket.join(params.room);

    socket.emit('newMessage',generateMessage('admin','Welcome to new chat app'));

    socket.broadcast.to(params.room).emit('newMessage',generateMessage('admin',`${params.name} has joined`));

    callback();
  })

  socket.on('createMessage',(message,callback)=>{
    console.log('createMessage',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
     callback();
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
