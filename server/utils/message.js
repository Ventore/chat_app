var generateMessage = (text, from) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };        
};

module.exports = { generateMessage };