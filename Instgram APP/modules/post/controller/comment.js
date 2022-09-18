const commentModel = require("../../../DB/model/Comment");
const postModel = require("../../../DB/model/Post");


const createComment = async (req, res) => {  // comment on post
    const { text } = req.body;
    const { postId } = req.params;
    const { _id } = req.user;

    const post = await postModel.findOne({ _id: postId });
    if (!post) {
        res.status(404).json({ message: "in-valid post id" })
    } else {
        const comment = await commentModel({ text, createdBy: _id, postId: post._id })
        const saveComment = await comment.save();
        await postModel.findByIdAndUpdate(post._id, { $push: { comments: saveComment._id } })
        res.status(200).json({ message: "Done", saveComment })
    }


}




const editComment = async (req , res) =>{
    try {
        const {commentId} = req.params;
        const { text } = req.body;
        const user = await userModel.findById(req.user._id);
        const comment = await commentModel.findOne({commentId});
        if(comment.createdBy == user._id){
            const updatedComment = await commentModel.findByIdAndUpdate(comment._id , {text: text});
            res.status(200).json({ message: "Done" , updatedComment });
        }else{
            res.status(400).json({message:"sorry, you are not authorized to update this comment"});
        }
    } catch (error) {
        res.status(500).json({ message: "catch error", error });
    }
}


const softDeleteComment = async (req , res) => {
    try {
        const {commentId} = req.params;
        const comment = await commentModel.findOne({ _id: commentId });
        const user = await userModel.findById(req.user._id);
        if (user.role == endPoint.softDeletePost && user._id == comment.createdBy) {
            await commentModel.findByIdAndUpdate(comment._id, { isDeleted: true })
           // await userModel.findByIdAndUpdate(user._id,{$pull:{posts:postId}})
            res.status(200).json({ message: "Done", comment })
        }
        else{
            res.status(401).json({ message: "You do not have the permission to delete that post " })
        }
    } catch (error) {
        res.status(500).json({ message: "catch error", error });
    }
}







const replyonComment = async (req, res) => { // comment on another comment /// and  reply on reply on comment
    const { text } = req.body;
    const { postId, commentId } = req.params;
    const { _id } = req.user;


    const post = await postModel.findOne({ _id: postId });
    if (!post) {
        res.status(404).json({ message: "in-valid post id" })
    } else {
        const comment= await commentModel.findOne({_id:commentId},{postId:post._id}/*to know that comment follow that post*/ )/// questionnn
        if (!comment) {

            res.status(404).json({ message: "in-valid comment id" })
        } else {

            const comment = await commentModel({ text, createdBy: _id, postId: post._id })
            const saveComment = await comment.save();
            await commentModel.findByIdAndUpdate(commentId, { $push: { reply: saveComment._id } })
            res.status(200).json({ message: "Done", saveComment })
        }
    }

}
const likeComment = async (req, res) => {
        
    await commentModel.findByIdAndUpdate(/*post._id*/req.params.postId,{$pull:{likes:req.user._id}})
    res.status(200).json({ message: "Done" })

    

}
const unLikeComment = async (req, res) => {
        
    await commentModel.findByIdAndUpdate(/*post._id*/req.params.postId,{$pull:{likes:req.user._id}})
    res.status(200).json({ message: "Done" })

    

}

const replyonReplyonComment = async (req, res) => { // comment on another comment
    const { text } = req.body;
    const { postId, commentId, replyId } = req.params;
    const { _id } = req.user;


    const post = await postModel.findOne({ _id: postId });
    if (!post) {
        res.status(404).json({ message: "in-valid post id" })
    } else {
        if (!post.comments.includes(commentId)) {

            res.status(404).json({ message: "in-valid comment id" })
        } else {
            if (!post.comments.reply.includes(replyId)) {

                res.status(404).json({ message: "in-valid reply id" })
            } else {

                const comment = await commentModel({ text, createdBy: _id, postId: post._id })
                const saveComment = await comment.save();
                await commentModel.findByIdAndUpdate(replyId, { $push: { reply: saveComment._id } })
                res.status(200).json({ message: "Done", saveComment })
            }
        }
    }

}


module.exports = {
    createComment,
    replyonComment,
    replyonReplyonComment,
    editComment,
    softDeleteComment,
    likeComment,
    unLikeComment
}