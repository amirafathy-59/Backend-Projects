const userModel = require("../../../DB/model/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = await userModel.findOne({email});
        console.log(newUser);
        // const user = await userModel.findOne({ 
        //     email:"newUser5@gmail.com" }) // return object or null
        //console.log({User:user});
        console.log(email);
        if (newUser) {
            const match = await bcrypt.compare(password, user.password); // return true or false
            // compare -> make hashing for entered password and compare it with user.password that already saved in DB
            if (match) {
                const token = jwt.sign({ id: user._id, isLoggedIn: true }, process.env.tokenSignature, { expiresIn: "1h" })
                // sign -> generate token
                res.json({ message: "Done", token })
            } else {

                res.json({ message: "in-valid password" })
            }

        } else {

            res.json({ message: "in-valid account email" })
        }

    } catch (error) {

        res.json({ message: "catch error", error })
    }
}
module.exports = signin