const userModel = require("../../../DB/model/User");
const { paginate } = require("../../../sevices/paginate");
const bcrypt =require(("bcryptjs"))

const displayProfile=async (req,res)=>{
  try {
    const user= await userModel.findById(req.user._id);
res.status(200).json({message:"Done",user})
  } catch (error) {
    res.status(500).json({message:"catch error",error})
  }
}
const profilePicture=async (req,res)=>{
    try {
        if (req.fileErr) {
            res.status(400).json({message:"in-valid format"})
        } else {
            const imageURL =`${req.finalDestination}/${req.file.filename}`;
            const user = await userModel.findByIdAndUpdate(req.user._id,{profilePic:imageURL},{new:true})
            res.status(200).json({message:"Done",user})
        }
    } catch (error) {
        res.status(500).json({message:"catch error",error})
    }
}
const profileCoverPicture=async (req,res)=>{
    try {
        if (req.fileErr) {
            res.status(400).json({message:"in-valid format"})
        } else {
            const imageURL =[];
            req.files.forEach(file => {
                imageURL.push(`${req.finalDestination}/${file.filename}`)
            });
            const user = await userModel.findByIdAndUpdate(req.user._id,{coverPic:imageURL},{new:true})
            res.status(200).json({message:"Done",user})
        }
    } catch (error) {
        res.status(500).json({message:"catch error",error})
    }
}

const updatePassword=async (req,res)=>{
 try {
    const {oldPassword,newPassword}= req.body;
    if (oldPassword == newPassword) {
        res.status(409).json({message:"sorry, you have to make new password"})
    } else {
        const user= await userModel.findById(req.user._id);
        const match= await bcrypt.compare(oldPassword,user.password);// return true or false
        if (!match) {
         res.status(400).json({message:"in-valid old password"})
        } else {
         const hashedPassword = await bcrypt.hash(newPassword,parseInt(process.env.saltRound));
         await userModel.findByIdAndUpdate({_id:user._id},{password:hashedPassword});
         res.status(200).json({message:"Done"})
        }
    }
  
 } catch (error) {
    res.status(500).json({message:"catch error",error})
 }

}

const getAllUsers = async (req, res) => {
        const{page,size}=req.query;
        const{limit,skip}= paginate(page,size);
    const post = await postModel.find({}).limit(limit).skip(skip).populate([{

        path: 'createdBy',
        select: 'userName email'
    },
    {
        path: 'comments',
        populate: [
            {
                path: 'createdBy',
                select: 'userName email'
            },
            {
                path: 'likes',
                select: 'userName email'
            },
            {
                path:'reply',
                populate: [
                    {
                        path: 'createdBy',
                        select: 'userName email'
                    }, {
                        path: 'likes',
                        select: 'userName email'
                    },
                ]
            },
            {
                path:'reply',
                populate: [
                    {
                        path: 'reply',
                        select: 'userName email'
                      
                    },
                    {
                        path: 'likes',
                        select: 'userName email'
                    },
                ]

            }

        ]
    },
    {
        path: 'likes',
        select: 'userName email'
       
    }
    ]);


    res.status(200).json({ message: "Done", post })
}



module.exports={
    displayProfile,
    profilePicture,
    profileCoverPicture,
    updatePassword
}