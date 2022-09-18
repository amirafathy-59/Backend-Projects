const userModel = require("../../../DB/model/User")

const updateUser = async (req, res) => {
    try {
        
  const {name,email}= req.body;
  
  const user = await userModel.findById(req.user._id);
  if(user){
         
        const updatedUser = await userModel.findOneAndUpdate({ _id: req.user._id  }, { name, email }, { new: true }).select("-password");
        if (updatedUser) {
            res.json({ message: "Done", updatedUser })
        } else {
            res.json({ message: "in-valid id", updatedUser })
        }
  }
  else{
   
    res.json({ message: "in-valid account owner" })
  }
           
    } catch (error) {

        res.json({ message: "catch error", error })
    }
}

module.exports = updateUser