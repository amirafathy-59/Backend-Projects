const router = require("express").Router();
const { validation } = require("../../middleware/validation");
const validators=require("./auth.validation")
const registerationController =require("./controller/registeration")

router.post("/signup",validation(validators.signup),registerationController.signup)
router.get("/confirmEmail/:token",validation(validators.confirmEmail),registerationController.confirmEmail)
router.get("/refreshEmail/:id",registerationController.refreshEmail)
router.post("/login",validation(validators.login),registerationController.login)
router.post("/sendCode",validation(validators.sendCodeValidation),registerationController.sendCode)
router.post("/forgetPassword",validation(validators.forgetPasswordValidation),registerationController.forgetPassword)

module.exports = router