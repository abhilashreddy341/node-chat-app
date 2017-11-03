const expect = require('expect');

const {Users}= require('./users');

describe('Users',()=>{
 beforeEach(()=>{
   users = new Users();
   users.users = [{
     id : '1',
     name : 'rakesh',
     room : 'node course'
   },{
     id : '2',
     name : 'rahul',
     room : 'node course'
   },{
     id : '3',
     name : 'arjun',
     room : 'react course'
   }]
 });

  it('should return a added user',()=>{
    var users = new Users();
    var user ={
      id: '123',
      name:'Rahul',
      room:'electrical'
    }
    var res = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  });
  it('should remove a user',()=>{
    var user = users.removeUser('1');
    expect(user[0].name).toEqual(['rakesh']);
  })
  it('should not remove a user',()=>{
    var user = users.removeUser('10');
    expect(user).toEqual([]);
  })
  it('should find a user',()=>{
    var user = users.getUser('1');
    expect(user[0].name).toEqual(['rakesh']);
  })
  it('should not find a user',()=>{
    var user = users.getUser('10');
    expect(user).toEqual([]);
  })
  it('should return users list',()=>{
    var usersList = users.getUserList('node course');
    expect(usersList).toEqual(['rakesh','rahul']);
  });

  it('should return users list',()=>{
    var usersList = users.getUserList('react course');
    expect(usersList).toEqual(['arjun']);
  });
})
