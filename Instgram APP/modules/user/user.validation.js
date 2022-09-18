const Joi= require("joi")

const displayProfileValidation={
    headers: Joi.object().required().keys({
        authorization:Joi.string().required()
    }).options({allowUnknown:true})
}

const updatePasswordValidation={
    body:Joi.object().required().keys({
      
       
        oldPassword: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        newPassword: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        cPassword: Joi.string().valid(Joi.ref("newPassword")).required() // ref to refer password and check match or not
    })
}

module.exports={
    displayProfileValidation,
    updatePasswordValidation
}