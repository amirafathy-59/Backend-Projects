const validation = require('../../middlwear/validation')
const signup = require('./controller/signup')
const authValidation = require("./auth.validation")
const signin = require('./controller/signin')
const router = require('express').Router()


router.post("/signup" ,validation(authValidation.signupValidation), signup)

router.post("/signin" ,/*validation(authValidation.signinValidation),*/ signin)





module.exports = router