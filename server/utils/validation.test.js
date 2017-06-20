const expect = require("expect");
const { isRealString } = require("./validation");

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var result = isRealString(4);
        expect(result).toBe(false);
    });   
    it('should reject space only strings', () => {
        var result = isRealString('       ');
        expect(result).toBe(false);
    });
    it('should accept valid string', () => {
        var result = isRealString('Aasdasd');
        expect(result).toBe(true);
    });
});