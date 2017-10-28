const path = require('path');
const express= require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');

const port = process.env.PORT||3000;
var app = express();
var server = http.createServer(app);
app.use(express.static(publicPath));
var io = socketIO(server);

io.on('connection',(socket)=>{
  console.log("New user connected");

  socket.emit('newconnection',generateMessage('admin','Welcome to new chat app'));

  socket.broadcast.emit('newconnection',generateMessage('admin','New user Joined'));

  socket.on('createMessage',(message)=>{
    console.log('createMessage',message);
    io.emit('newMessage',generateMessage(message.from,message.text));

    // socket.broadcast.emit('newMessage',{
    //   from : message.from,
    //   text : message.text,
    //   createdAt: new Date().getTime()
    // })
  });

  socket.on('disconnect',()=>{
    console.log('A user is disconnected');
  })
})


server.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
})
