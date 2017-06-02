const expect = require("expect");
const { generateMessage } = require("./message");

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        let from = 'John';
        let text = 'Hello!';
        let result = generateMessage(text, from);
        expect(result).toInclude({text, from});
        expect(result.createdAt).toBeA('number');
    });    
});
      