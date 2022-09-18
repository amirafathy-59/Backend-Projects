const Joi= require("joi")


const signup={
    body:Joi.object().required().keys({
        userName: Joi.string().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)).required().messages({
            'string.pattern.base': "plz follw my name rules",
            'any.required': "plz send u name",
            'string.empty': "plz fill in u name"
        }),
        
        email: Joi.string().email().required(),
        age: Joi.number().min(18).required(),
       gender: Joi.valid('Male','Female').required(),
        password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        cPassword: Joi.string().valid(Joi.ref("password")).required() // ref to refer password and check match or not
    })
}
const login={
    body:Joi.object().required().keys({
      
        
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    })
}
const confirmEmail={
    params:Joi.object().required().keys({
        token: Joi.string().required(),
    })
}

const sendCodeValidation={
    body:Joi.object().required().keys({
        email: Joi.string().email().required(),
    })
}

const forgetPasswordValidation={
    body:Joi.object().required().keys({
      
        code: Joi.number().required(),
        email: Joi.string().email().required(),
        newPassword: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        cPassword: Joi.string().valid(Joi.ref(" newPassword")).required() // ref to refer password and check match or not
    })
}

module.exports={signup,login,confirmEmail,forgetPasswordValidation,sendCodeValidation}