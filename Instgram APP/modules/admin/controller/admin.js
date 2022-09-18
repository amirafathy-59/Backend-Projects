const userModel = require("../../../DB/model/User")


const getAllUsers= async (req,res)=>{
    const users= await userModel.find({role:{$ne:'Admin'}});
    res.json({message:"Done",users})
}

module.exports={
    getAllUsers
}