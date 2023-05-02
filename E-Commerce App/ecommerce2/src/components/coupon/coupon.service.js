const CouponModel = require("./coupon.model");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");
const factory = require('../Handlers/handler.factory')

exports.createCoupon = catchAsyncError(async (req, res, next) => {
    let Coupon = new CouponModel(req.body);
    await Coupon.save();
    res.status(200).json(Coupon);
});

// to get all Coupons
exports.getCoupons = catchAsyncError(async (req, res) => {
    let Coupons = await CouponModel.find({})
    res.status(200).json(Coupons);
});

// to get specific Coupon
exports.getCoupon = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let Coupon = await CouponModel.findById(id)
    !Coupon && next(new AppError("Coupon not found", 400));
    Coupon && res.status(200).json(Coupon);
});

// to update specific Coupon
exports.updateCoupon = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
        let Coupon = await CouponModel.findByIdAndUpdate(id, req.body, { new: true });
        !Coupon && next(new AppError("Coupon not found", 400));
        Coupon && res.status(200).json(Coupon);
});

// to delete specific Coupon
exports.deleteCoupon = factory.deleteOne(CouponModel)


