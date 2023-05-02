
const { ProtectedRoutes, allowedTo } = require("../user/user.auth");
const { addToWishlist, removeFromWishlist, getUserWishlists } = require("./wishlist.service");

const router = require("express").Router();
router.use(ProtectedRoutes, allowedTo("user"))
router.route("/").patch(addToWishlist)
    .delete(removeFromWishlist)
    .get(getUserWishlists)
module.exports = router;
