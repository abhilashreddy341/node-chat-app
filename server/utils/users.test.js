const expect = require('expect');

const {Users}= require('./users');

describe('Adding a user',()=>{
  it('should return a added user',()=>{
    var users = new Users();
    var user ={
      id: '123',
      name:'Rahul',
      room:'electrical'
    }
    var res = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  })
})
