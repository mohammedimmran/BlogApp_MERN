const expressAsyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");
const User = require("../../../model/user/User");

const authMiddleware = expressAsyncHandler(async (req, res , next) => {
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            if(token){
                const decoded = jwt.verify(token,process.env.JWT_KEY);
                // find user by id
                const user  = await User.findById(decoded?.id).select("-password");
                req.user = user;
                next();
            }
            
        } catch (error) {

            throw new Error("not authorized token expired");
            
        }
    }
    else{
        throw new Error("no token attach");
    }
    
});

module.exports = authMiddleware;
