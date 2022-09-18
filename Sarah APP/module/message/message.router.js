//const { sendMessage } = require('./controller/message')
const { roles, auth } = require('../../middlwear/auth')
const validation = require('../../middlwear/validation')
const  messageController = require('./controller/message')
const { endPoint } = require('./message.endPoints')
const messageValidation= require('./message.validation')
const router = require('express').Router()



router.post("/message/:id",validation(messageValidation.sendMessageValidation),messageController.sendMessage)

router.get("/messageList",auth(endPoint.messageList),messageController.messageList)

router.get("/messageList/ByMe",auth(endPoint.messageByMe),messageController.messageByMeList)

router.delete("/deleteMessage/:id",validation(messageValidation.deleteMessageValidation),auth(endPoint.deleteMessage),messageController.deleteMessage)
module.exports = router