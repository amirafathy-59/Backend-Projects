const jwt= require("jsonwebtoken")
const userModel = require("../DB/model/User")

const roles={
    Admin:"Admin",
    User:"User",
    HR:"HR"
}
const auth=(accessRoles)=>{
   return async (req,res,next)=>{
    try {
        const headerToken = req.headers['authorization']
        if(/*!headerToken || headerToken==null || headerToken==undefined || we check them in validation*/ !headerToken.startsWith('Bearer ')){
            res.status(400).json({message:"in-valid header token"})
           
        }
        else{
            console.log({headerToken});
            const token = headerToken.split(" ")[1];
            console.log({token});
            const decodedToken= jwt.verify(token,process.env.loginToken)/// return true or false
            if (!decodedToken || !decodedToken.isLoggedIn) {
                res.status(400).json({message:"in-valid token"})
            } else {
                const findUser= await userModel.findOne({_id:decodedToken.id}).select('role userName email')
                if (! findUser) {
                    res.status(404).json({message:"in-valid account id"})
                    
                } else {
                    if (!accessRoles.includes(findUser.role)) {
                        res.status(401).json({message:"Not Authorized"})
                    } else {
                        req.user= findUser;
                        next();
                    }
                   
                }
            }
        }
    } catch (error) {
        res.status(500).json({message:"catch error",error})
    }
   }
}

module.exports={auth,
roles}