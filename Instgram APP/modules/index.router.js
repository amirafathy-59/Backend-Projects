
const userRouter = require("./user/user.router");

const authRouter = require("./auth/auth.router");
const postRouter = require("./post/post&comment.router");
const adminRouter= require("./admin/admin.router")

module.exports = {
    userRouter ,
    authRouter,
    postRouter,
    adminRouter
    
}