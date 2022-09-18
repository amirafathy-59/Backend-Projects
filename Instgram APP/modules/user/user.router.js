const router = require("express").Router();

const validators= require("./user.validation")

const { auth } = require("../../middleware/auth");
const profileController = require('./controller/profile');
const { endPoint } = require("./user.endPoint");
const { validation } = require("../../middleware/validation");
const { myMulter, fileValidation, HandleMulterError } = require("../../sevices/multer");

router.get("/profile",validation(validators.displayProfileValidation),auth(endPoint.displayProfile),profileController.displayProfile)
router.patch("/profile/pic",myMulter("user/profile/pic",fileValidation.image).single('image'),auth(endPoint.displayProfile),profileController.profilePicture)

router.patch("/profile/covPic",myMulter("user/profile/covPic",fileValidation.image).array('image',5),HandleMulterError,auth(endPoint.displayProfile),profileController.profileCoverPicture)
router.patch("/profile/updatePassword",validation(validators.updatePasswordValidation),auth(endPoint.displayProfile),profileController.updatePassword)
module.exports = router