const Joi = require("joi");

const updateUserValidation = {
    body: Joi.object().required().keys({
        name: Joi.string().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{5,20}$/)).required().messages({
            'string.pattern.base': "plz follw my name rules",
            'any.required': "plz send u name",
            'string.empty': "plz fill in u name"
        }),
        email: Joi.string().email().required(),
    })
}
const deleteUserValidation = {
    params:Joi.object().required().keys( {
        id: Joi.string().min(24).max(24).required(),
    })
}
const getUserValidation = {
    params:Joi.object().required().keys( {
        id: Joi.string().min(24).max(24).required(),
    })
}


module.exports = {
  updateUserValidation,
  deleteUserValidation,
  getUserValidation
}