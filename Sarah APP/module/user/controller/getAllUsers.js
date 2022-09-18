const userModel = require("../../../DB/model/User");

const userList = async (req, res) => {
    try {
        const users = await userModel.find({  })
        if (users) {
            
        res.json({ message: "Done", users })
        } else {
            
        res.json({ message: "not authorized account" })
        }
    } catch (error) {
        res.json({ message: "catch error", error })
    }
}

module.exports= userList