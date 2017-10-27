const path = require('path');
const express= require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT||3000;
const publicPath = path.join(__dirname,'../public');
var app = express();
var server = http.createServer(app);
app.use(express.static(publicPath));
var io = socketIO(server);

io.on('connection',(socket)=>{
  console.log("New user connected");

  socket.on('createMessage',(message)=>{
    console.log('createMessage',message);
    io.emit('newMessage',{
      from : message.from,
      text : message.text,
      createdAt : new Date().getTime()
    })
  });

  socket.on('disconnect',()=>{
    console.log('A user is disconnected');
  })
})


server.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
})
