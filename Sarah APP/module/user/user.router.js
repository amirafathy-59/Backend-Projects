const { auth } = require('../../middlwear/auth')
const validation = require('../../middlwear/validation')
const deleteUser = require('./controller/deleteUser')
const userList = require('./controller/getAllUsers')
const userById = require('./controller/getUserById')
const {profile, updateProfilePic, updateProfileCoverPic }= require('./controller/profile')
const softDeleteUser = require('./controller/softDelete')
const updateUser = require('./controller/updateUser')
const { endPoint } = require('./user.endPoints')

const multerData = require('../../services/multer')
const userValidation= require('./user.validation')
const { getUserMessages } = require('./controller/getUserMessages')
const router = require('express').Router()



router.get("/user/profile",auth(endPoint.profile),profile)

router.get("/userById/:id",validation(userValidation.getUserValidation),auth(endPoint.updateUser),userById)

router.get("/user/:id/messages",validation(userValidation.getUserValidation),auth(),getUserMessages)

router.get("/userLIst",auth(endPoint.UserList),userList)
router.patch("/updateUser",validation(userValidation.updateUserValidation),auth(endPoint.updateUser),updateUser)

router.patch("/user/profile/pic", multerData.myMulter('users/profilePic', multerData.validateFileMthod.image).single('image'), auth(endPoint.profileMessages), updateProfilePic)
router.patch("/user/profile/coverPic",
    multerData.myMulter('users/coverPic', multerData.validateFileMthod.image).array('image', 5),
    auth(endPoint.profileMessages), updateProfileCoverPic)
router.delete("/deleteUser/:id",validation(userValidation.deleteUserValidation),auth(endPoint.deleteUser),deleteUser)

router.delete("/deleteUserByMe/:id",validation(userValidation.deleteUserValidation),auth(endPoint.updateUser),softDeleteUser)


module.exports = router