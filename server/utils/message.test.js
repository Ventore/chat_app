const expect = require("expect");
const { generateMessage, generateLocationMessage } = require("./message");

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        let from = 'John';
        let text = 'Hello!';
        let result = generateMessage(from, text);
        expect(result).toInclude({from, text});
        expect(result.createdAt).toBeA('number');
    });    
});

describe('generateLocationMessage', () => {
    it('should generate the correct location message', () => {
        let from = 'User';
        let lat = '12.4564654';
        let long = '54.1654654';
        let url = `https://www.google.com/maps?q=${lat},${long}`;
        let result = generateLocationMessage(from, lat, long);
        expect(result).toInclude({from, url});
        expect(result.createdAt).toBeA('number');    
    });
});
      