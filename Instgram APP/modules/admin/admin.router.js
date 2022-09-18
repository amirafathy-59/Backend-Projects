const { auth } = require("../../middleware/auth");
const { endPoint } = require("./admin.endPoint");
const { getAllUsers } = require("./controller/admin");

const router = require("express").Router();


router.patch("/blockAccount/:id",)
router.get("/users",auth(endPoint.UserList),getAllUsers)


module.exports = router