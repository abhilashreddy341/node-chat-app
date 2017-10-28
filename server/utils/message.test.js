var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
  it('should return the correct values',()=>{
    var from = 'satish';
    var text = 'hey what\'s going on';
    var genMsg = generateMessage(from,text);
    expect(genMsg).toInclude({from,text});
    expect(genMsg.createdAt).toBeA('number');
  })
})

describe('generateLocationMessage',()=>{
  it('should return the coorect link for location',()=>{
    var from = 'naveen';
    var location = {
      longitude : 12345,
      latitude : 12345
    }
    var locurl = generateLocationMessage(from,location.latitude,location.longitude);
    expect(locurl.from).toBe(from);
    expect(locurl.createdAt).toBeA('number');
    expect(locurl.url).toBe(`https://www.google.com/maps?q=12345,12345`);
  })
})
