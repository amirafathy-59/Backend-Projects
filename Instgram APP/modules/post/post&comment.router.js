const { auth } = require("../../middleware/auth");
const { myMulter, fileValidation } = require("../../sevices/multer");
const { endPoint } = require("./post.endPoint");
const postController= require("./controller/post")
const commentController= require("./controller/comment")
const router = require("express").Router();
const validators= require("./post.validation");
const { validation } = require("../../middleware/validation");
// addPost
router.post("/",auth(endPoint.createPost)
,myMulter("/post",fileValidation.image).array("image",5),
validation(validators.createPostValidation),postController.createPost)

// addComment
router.patch("/:postId/comment",auth(endPoint.createPost),
validation(validators.createCommentValidation),commentController.createComment),

//  likePost
router.patch("/:postId/like",auth(endPoint.createPost),
validation(validators.likePostValidation),postController.likePost),

//  unlikePost
router.patch("/:postId/unlike",auth(endPoint.createPost),
validation(validators.likePostValidation),postController.unLikePost),

// updatePost
router.patch("/:postId/updatePost",auth(endPoint.updatePost),
validation(validators.updatePostValidation),postController.updatePost),

// getAllPosts
router.get("/",postController.getAllPost)

// softDeletePost
router.patch("/:postId/softDeletePost",auth(endPoint.softDeletePost),
validation(validators.softDeletePostValidation),postController.softDeletePost),

// editComment
router.patch("/:commentId/editComment",auth(endPoint.editComment),
validation(validators.editCommentValidation),commentController.editComment),

// softDeleteComment
router.patch("/:commentId/softDeleteComment",auth(endPoint.softDeletePost),
validation(validators.softDeleteCommentValidation),commentController.softDeleteComment),


// replyOnComment
router.patch("/:postId/comment/:commentId/reply",auth(endPoint.createPost),
validation(validators.replyonCommentValidation),commentController.replyonComment)

// likeComment
router.patch("/comment/:commentId/like",auth(endPoint.createPost),
validation(validators.likeCommentValidation),commentController.likeComment)

// unlikeComment
router.patch("/comment/:commentId/unlike",auth(endPoint.createPost),
validation(validators.unLikeCommentValidation),commentController.unLikeComment)
// replyOnreplyOnComment
router.patch("/:postId/comment/:commentId/reply/:replyId",auth(endPoint.createPost),
validation(validators.replyonReplyonCommentValidation),commentController.replyonReplyonComment)


module.exports = router