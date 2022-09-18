const { roles } = require("../../middlwear/auth");


const endPoint={
    profile: [roles.Admin,roles.User],
    updateUser: [roles.User],
    UserList: [roles.Admin],
    deleteUser: [roles.Admin],

}

module.exports={
    endPoint,
}