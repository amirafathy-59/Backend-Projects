const userModel = require("../../../DB/model/User");

const userById = async (req, res) => {
    try {
        const user = await userModel.find({ _id:req.params.id })
        if (user) {
            
        res.json({ message: "Done", user })
        } else {
            
        res.json({ message: "in-valid id " })
        }
    } catch (error) {
        res.json({ message: "catch error", error })
    }
}

module.exports= userById