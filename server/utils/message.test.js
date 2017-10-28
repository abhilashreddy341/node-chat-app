var expect = require('expect');

var generateMessage = require('./message');

describe('generateMessage',()=>{
  it('should return the correct values',()=>{
    var from = 'satish';
    var text = 'hey what\'s going on';
    var genMsg = generateMessage.generateMessage(from,text);
    expect(genMsg).toInclude({from,text});
    expect(genMsg.createdAt).toBeA('number');
  })
})
