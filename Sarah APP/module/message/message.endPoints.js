const { roles } = require("../../middlwear/auth");


const endPoint={
    messageList: [roles.User],
    messageByMe:[roles.User],
    deleteMessage:[roles.User]
}

module.exports={
    endPoint,
}