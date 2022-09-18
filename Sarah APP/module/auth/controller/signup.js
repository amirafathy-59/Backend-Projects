const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const userModel = require("../../../DB/model/User")
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const newUser = new userModel({ name, email, password });
        const savedUser = await newUser.save()
        res.json({ message: "Done", savedUser })
    } catch (error) {
        console.log(error.keyValue);
        if (error.keyValue?.email) {
                res.json({ message: "email exist" })
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "catch error", error,status:getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) })
        }
    }
}
module.exports = signup