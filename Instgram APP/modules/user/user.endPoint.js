const { roles } = require("../../middleware/auth")

const endPoint={
    displayProfile: [roles.Admin,roles.User],
    // updateUser: [roles.User],
    // UserList: [roles.Admin],
    // deleteUser: [roles.Admin],

}

module.exports={
    endPoint,
}