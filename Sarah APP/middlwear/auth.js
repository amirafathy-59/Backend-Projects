
const jwt = require("jsonwebtoken");
const userModel = require("../DB/model/User");
const roles={
    User:"User",
    Admin:"Admin",
    Hr:"Hr"
}
const {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} =require( 'http-status-codes');
const auth = (accessRoles) => {
    return async (req, res, next) => {
        try {
            const headerToken = req.headers['authorization']// the key that we take its value from headers;
            console.log(headerToken);
            if (!headerToken || headerToken == null || headerToken == undefined || !headerToken.startsWith(`${process.env.bearerKey}`)) {
                res.json({ message: "in-valid header token" })
            }
            else {
                const token = headerToken.split(" ")[1];// to get token after space , [0] to get Bearer
                console.log(token);
                const decodedToken = jwt.verify(token, process.env.tokenSignature);// if true return object else return null
                  // verify -> make decoding for token
                console.log({DecodedToken:decodedToken}); /// return object contain the userID
                if (!decodedToken.isLoggedIn) {
                    res.json({ message: "in-valid  token payload" })
                }
                else {
                    const findUser = await userModel.findById(decodedToken.id).select("name email role");
                    console.log(findUser)
                    if (!findUser) {

                        res.json({ message: "in-valid user ID token " })
                    }
                    else {
                        console.log({accessRoles});
                        console.log(findUser.role);
                        if (accessRoles.includes(findUser.role)) {
                            req.user = findUser// to store in req object user
                        next();
                        } else {
                            res.status(StatusCodes.UNAUTHORIZED).json({ message: "not authorized User " })
                        }
                        
                    }
                }
            }
        } catch (error) {

            res.json({ message: "catch error token", error })
        }
    }

}

module.exports = {
    auth,
    roles,
}