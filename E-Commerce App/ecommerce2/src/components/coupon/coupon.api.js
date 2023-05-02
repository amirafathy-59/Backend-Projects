
const { ProtectedRoutes, allowedTo } = require("../user/user.auth");
const { createCoupon, getCoupons, getCoupon, updateCoupon, deleteCoupon } = require("./coupon.service");

const router = require("express").Router();
router.use(ProtectedRoutes, allowedTo("user"))
router
    .route("/")
    .post(createCoupon)
    .get(getCoupons);
router
    .route("/:id")
    .get(getCoupon)
.put(updateCoupon).delete(deleteCoupon);

module.exports = router;
