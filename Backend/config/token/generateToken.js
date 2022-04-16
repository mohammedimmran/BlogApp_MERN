const jwt = require('jsonwebtoken');

const generateToken = id =>{
    return jwt.sign({id}, process.env.JWT_KEY , {expiresIn:"50d"});

};

module.exports =generateToken;