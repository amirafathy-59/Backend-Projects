const { roles } = require("../../middleware/auth")

const endPoint={
    
    // updateUser: [roles.User],
     UserList: [roles.Admin],
     blockUser: [roles.Admin],

}

module.exports={
    endPoint,
}