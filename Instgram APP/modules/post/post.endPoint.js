const { roles } = require("../../middleware/auth")

const endPoint={
    createPost: [roles.Admin,roles.User],
    updatePost: [roles.Admin,roles.User],
    softDeletePost: [roles.Admin,roles.User],
    editComment: [roles.Admin,roles.User],
   

}

module.exports={
    endPoint,
}