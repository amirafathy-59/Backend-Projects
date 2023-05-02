const UserModel = require("../user/user.model");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");

exports.addToWishlist = catchAsyncError(async (req, res, next) => {
    let { wishlist } = await UserModel.findByIdAndUpdate(req.user._id, {
        $addToSet: { wishlist: req.body.product }
    }, { new: true })
    !wishlist && next(new AppError("wishlist not found", 400));
    wishlist && res.status(200).json(wishlist);
});

exports.removeFromWishlist = catchAsyncError(async (req, res, next) => {
    let { wishlist } = await UserModel.findByIdAndUpdate(req.user._id, {
        $pull: { wishlist: req.body.product }
    }, { new: true });
    !wishlist && next(new AppError("wishlist not found", 400));
    wishlist && res.status(200).json(wishlist);
});

exports.getUserWishlists = catchAsyncError(async (req, res, next) => {

    let { wishlist } = await UserModel.findById(req.user._id)
    !wishlist && next(new AppError("wishlist not found", 400));
    wishlist && res.status(200).json(wishlist);
});




