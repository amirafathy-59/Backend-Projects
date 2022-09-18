const Joi = require("joi");

const sendMessageValidation = {
    body: Joi.object().required().keys({
        messageBody: Joi.string().min(1).max(5000),
    }),
    params:Joi.object().required().keys( {
        id: Joi.string().min(24).max(24).required(),
    }),
    query:Joi.object().required().keys( {
        senderId: Joi.string().min(24).max(24),
    })
}
const deleteMessageValidation = {
  
    params:Joi.object().required().keys( {
        id: Joi.string().min(24).max(24).required(),
    })
}

module.exports={
    sendMessageValidation,
    deleteMessageValidation
}