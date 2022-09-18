const Joi= require("joi")

const createPostValidation={
    body: Joi.object().required().keys({
        text:Joi.string()
    })
}

const createCommentValidation={
    body: Joi.object().required().keys({
        text:Joi.string().required(),
    }),
    params: Joi.object().required().keys({
        postId:Joi.string().min(24).max(24).required(),
    })
}
const likePostValidation={
  
    params: Joi.object().required().keys({
        postId:Joi.string().min(24).max(24).required(),
    })
}
const updatePostValidation={
  
    params: Joi.object().required().keys({
        postId:Joi.string().min(24).max(24).required(),
    })
}

const softDeletePostValidation={
  
    params: Joi.object().required().keys({
        postId:Joi.string().min(24).max(24).required(),
    })
}

const softDeleteCommentValidation={
  
    params: Joi.object().required().keys({
        commentId:Joi.string().min(24).max(24).required(),
    })
}
const replyonCommentValidation={
    body: Joi.object().required().keys({
        text:Joi.string().required(),
    }),
    params: Joi.object().required().keys({
        postId:Joi.string().min(24).max(24).required(),
        commentId:Joi.string().min(24).max(24).required(),
    })
}
const replyonReplyonCommentValidation={
    body: Joi.object().required().keys({
        text:Joi.string().required(),
    }),
    params: Joi.object().required().keys({
        postId:Joi.string().min(24).max(24).required(),
        commentId:Joi.string().min(24).max(24).required(),
        replyId:Joi.string().min(24).max(24).required(),
    })
}


const editCommentValidation={
    body: Joi.object().required().keys({
        text:Joi.string().required(),
    }),
    params: Joi.object().required().keys({
       
        commentId:Joi.string().min(24).max(24).required(),
       
    })
}
const likeCommentValidation={
  
    params: Joi.object().required().keys({
        commentId:Joi.string().min(24).max(24).required(),
    })
}
const unLikeCommentValidation={
  
    params: Joi.object().required().keys({
        commentId:Joi.string().min(24).max(24).required(),
    })
}

module.exports={
    createPostValidation,
    createCommentValidation,
    updatePostValidation,
    softDeletePostValidation,
    softDeleteCommentValidation,
    likePostValidation,
    replyonCommentValidation,
    replyonReplyonCommentValidation,
    likeCommentValidation,
    unLikeCommentValidation,
    editCommentValidation
}