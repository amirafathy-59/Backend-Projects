const userModel = require("../../../DB/model/User")

const deleteUser = async (req, res) => {
    try {
        
  
         
        const deletedUser = await userModel.deleteOne({ _id:req.params.id});
        if (deletedUser.deletedCount) {
            res.json({ message: "Done", deleteUser })
        } else {
            res.json({ message: "in-valid id or you not authorized" })
        }
  
           
    } catch (error) {

        res.json({ message: "catch error", error })
    }
}

module.exports = deleteUser