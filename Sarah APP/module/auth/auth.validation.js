const Joi = require("joi");

const signupValidation = {
    body: Joi.object().required().keys({
        name: Joi.string().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{5,20}$/)).required().messages({
            'string.pattern.base': "plz follw my name rules",
            'any.required': "plz send u name",
            'string.empty': "plz fill in u name"
        }),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        cPassword: Joi.string().valid(Joi.ref("password")).required() // ref to refer password and check match or not
    })
}
const signinValidation = {
    body: Joi.object().required().keys({

        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),

    })
}


module.exports = {
    signupValidation,
    signinValidation
}