const userModel = require("../../../DB/model/User");

const getUserMessages = async (req, res) => {
    const{id}=req.params
    try {
        const users = await userModel.find({_id:id}).populate({
            path:"messagesArray"
        })
        if (users) {
            
        res.json({ message: "Done", users })
        } else {
            
        res.json({ message: "not authorized account" })
        }
    } catch (error) {
        res.json({ message: "catch error", error })
    }
}

module.exports= {getUserMessages}