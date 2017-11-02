const expect = require('expect');

const {isStringValid} = require('./validation');

describe('isStringValid',()=>{
  it('should reject non string values',()=>{
    var str = isStringValid(12345);
    expect(str).toBe(false);
  });
  it('should reject string with just spaces',()=>{
    var str = isStringValid('    ');
    expect(str).toBe(false);
  });
  it('should accept valid strings',()=>{
    var str = isStringValid('arjun');
    expect(str).toBe(true);
  });
})
