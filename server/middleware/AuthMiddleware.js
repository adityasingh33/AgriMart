import jwt from 'jsonwebtoken'
import User from "../models/user.js"

const protect = async(req,res,next) => {
    try {
        if(!req.headers.authorization?.startsWith("Bearer")){
            return res.status(401).json({
                message : "Not authorized, no token"
            });
        }
        
        const token = req.headers.authorization.split("Bearer")[1].trim();
        console.log('Processing token: ',token);

        let decoded;
        try{
            decoded = jwt.verify(token,process.env.JWT_SECRET);
            console.log("Decoded token : ",decoded);

            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                return res.status(401).json({
                    message: "User not found"
                });
            }
            next();
        }
        catch(jwtError){
            if(jwtError.name === 'TokenExpiredError'){
                return res.status(401).json({
                    message:"Token expried",
                    error:"jwt expired"
                });
            }
            if(jwtError.name === 'JsonWebTokenError'){
                return res.status(401).json({
                    message : "Invalid token",
                    error:"jwt invalid"
                });
            }
            throw jwtError;
        }

    }catch(e){
       console.error('Auth Middleware error : ',error);
       return res.status(500).json({
        message:"Authentication failed",
        error:error.message
       });
    }
};

export default protect;