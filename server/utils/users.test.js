var expect = require("expect");
var {Users} = require("./users");

describe('Users', () => {
    
    var users;
    beforeEach(() => {
        users = new Users;
        users.users = [{
            id: '123',
            name: 'Mike',
            room: 'Node js'
        },
        {
            id: '234',
            name: 'Jessica',
            room: 'Node js'
        },
        {
            id: '345',
            name: 'Bohdan',
            room: 'Learn Node js'
        }];
    });
    
    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Bohdan',
            room: 'Node js'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });
    
    it('should remove User from room', () => {
        expect(users.removeUser('123').id).toBe('123');
        expect(users.users.length).toBe(2);
    });
    it('should not remove User from room', () => {
        expect(users.removeUser('523')).toNotExist();
    });
    
    it('should find User', () => {
        expect(users.getUser('123').id).toBe('123');    
    });
    it('should not find User', () => {
        expect(users.getUser('1')).toNotExist();    
    });
    
    it('should return names for "Node js" room', () => {
        expect(users.getUsersList('Node js')).toEqual(['Mike', 'Jessica']);
    });
    it('should return names for "Learn Node js', () => {
        expect(users.getUsersList('Learn Node js')).toEqual(['Bohdan']);
    });
});