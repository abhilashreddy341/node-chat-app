const path = require('path');
const express= require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {Users} = require('./utils/users');
const {isStringValid} = require('./utils/validation');
const publicPath = path.join(__dirname,'../public');

const port = process.env.PORT||3000;
var app = express();
var server = http.createServer(app);
app.use(express.static(publicPath));
var io = socketIO(server);
var users = new Users();

io.on('connection',(socket)=>{
  console.log("New user connected");

  socket.on('join',(params,callback)=>{
    if(!isStringValid(params.name)&&!isStringValid(params.room)){
      return callback('enter valid name and room name');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);
    io.to(params.room).emit('updatedUsersList',users.getUserList(params.room));

    socket.emit('newMessage',generateMessage('admin','Welcome to new chat app'));

    socket.broadcast.to(params.room).emit('newMessage',generateMessage('admin',`${params.name} has joined`));

    callback();
  })

  socket.on('createMessage',(message,callback)=>{
    var user = users.getUser(socket.id);
    if(user&&isStringValid(message.text)){
        io.to(user[0].room).emit('newMessage',generateMessage(user[0].name,message.text));
    }
     callback();
  });
  socket.on('createLocationMessage',(coords)=>{
    var user = users.getUser(socket.id);
    if(user){
    io.to(user[0].room).emit('newLocationMessage',generateLocationMessage(user[0].name,coords.latitude,coords.longitude));
  }
  })
  socket.on('disconnect',()=>{
    var user = users.removeUser(socket.id);
    if(user){
    io.to(user[0].room).emit('updatedUsersList',users.getUserList(user[0].room));
    io.to(user[0].room).emit('newMessage',generateMessage('Admin',`${user[0].name} has left the room`));
  }

  })
})


server.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
})
