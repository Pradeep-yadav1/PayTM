const jwt = require("jsonwebtoken");
const{JWT_SECRET} = require("../config");

const authMiddleware = (req,res,next) => {
    try{
    const authHeader = req.headers.authorization
    // console.log(authHeader);
    if(!authHeader || !authHeader.startsWith("bearer")){
       return res.status(403).json({msg:"Unauthorized Access"})
    }

    const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token,JWT_SECRET)
        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }else {
            return res.status(403).json({
                msg : "Invalid token: user ID not found"
            })
        }
            
    }catch(err){
        return res.status(403).json({
            msg :"Invalid token", error: err.message 
        })
    }  
}

module.exports = {
    authMiddleware
}

