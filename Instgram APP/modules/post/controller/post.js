const commentModel = require("../../../DB/model/Comment");
const postModel = require("../../../DB/model/Post");
const userModel = require("../../../DB/model/User");
const { endPoint } = require("../post.endPoint");

// const getAllPost = async (req, res) => {

//  let post=[];
//     const cursor =  postModel.find({}).cursor();
//     for (let doc = await cursor.next(); doc !=null; doc=await cursor.next()) {
//         console.log(doc); // doc contains post id 
//         const comment= await commentModel.find({postId:doc._id})
//         post.push({post:doc,comment})
//     }

//         res.status(200).json({ message: "Done", post })
// }

const getAllPost = async (req, res) => {

    const post = await postModel.find({}).populate([{

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
const createPost = async (req, res) => {
    const { text } = req.body;
    if (req.fileErr) {
        res.status(404).json({ message: "in-valid format" })
    } else {
        const imageURL = [];
        req.files.forEach(file => {
            imageURL.push(`${req.finalDestination}/${file.filename}`)
        });

        const post = await postModel({ text, image: imageURL, createdBy: req.user._id })
        const savePost = await post.save();
        res.status(201).json({ message: "Done", savePost })

    }

}





const updatePost = async (req , res) =>{
    try {
        const {postId} = req.params;
        const { text,image } = req.body;
        const user = await userModel.findById(req.user._id);
        const post = await postModel.findOne({postId});
        if(post.createdBy == user._id){
            const updatedPost = await postModel.findByIdAndUpdate(post._id , {text: text}, {image: image});
            res.status(200).json({ message: "Done" , updatedPost });
        }else{
            res.status(400).json({message:"sorry, you are not authorized to update this post"});
        }
    } catch (error) {
        res.status(500).json({ message: "catch error", error });
    }
}


const softDeletePost = async (req , res) => {
    try {
        const {postId} = req.params;
        const post = await postModel.findOne({ _id: postId });
        const user = await userModel.findById(req.user._id);
        if (user.role == endPoint.softDeletePost && user._id == post.createdBy) {
            await postModel.findByIdAndUpdate(post._id, { isDeleted: true })
           // await userModel.findByIdAndUpdate(user._id,{$pull:{posts:postId}})
            res.status(200).json({ message: "Done", post })
        }
        else{
            res.status(401).json({ message: "You do not have the permission to delete that post " })
        }
    } catch (error) {
        res.status(500).json({ message: "catch error", error });
    }
}








const likePost = async (req, res) => {
    //   const post = await postModel.findOne({_id:req.params.postId});
    //   if (!post) {
    //     res.status(404).json({ message: "in-valid post id" })
    // } else {
        await postModel.findByIdAndUpdate(/*post._id*/req.params.postId,{$push:{likes:req.user._id}})
        res.status(200).json({ message: "Done" })
   // }
        

    }

    const unLikePost = async (req, res) => {
        
            await postModel.findByIdAndUpdate(/*post._id*/req.params.postId,{$pull:{likes:req.user._id}})
            res.status(200).json({ message: "Done" })
       
            
    
        }



module.exports = {
    createPost,
    updatePost,
    softDeletePost,
    getAllPost,
    likePost,
    unLikePost
}