const ReviewModel = require("./reviews.model");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");
const factory = require('../Handlers/handler.factory')

exports.createReview = catchAsyncError(async (req, res, next) => {

    const isReview = await ReviewModel.findOne({ user: req.user._id, product: req.body.product })

    if (isReview) next(new AppError('you are created a review before', 400))

    let Review = new ReviewModel(req.body);
    await Review.save();
    res.status(200).json(Review);
});

// to get all Reviews
exports.getReviews = catchAsyncError(async (req, res) => {
    let Reviews = await ReviewModel.find({})

    res.status(200).json(Reviews);
});

// to get specific Review
exports.getReview = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let Review = await ReviewModel.findById(id)
    !Review && next(new AppError("Review not found", 400));
    Review && res.status(200).json(Review);
});

// to update specific Review
exports.updateReview = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let isReview = await ReviewModel.findById(id);
    if (isReview.user._id.toString() == req.user._id.toString()) {
        let Review = await ReviewModel.findByIdAndUpdate(id, req.body, { new: true });
        !Review && next(new AppError("Review not found", 400));
        Review && res.status(200).json(Review);
    } else {
        next(new AppError("you are not the review you are looking for", 400));
    }

});

// to delete specific Review
exports.deleteReview = factory.deleteOne(ReviewModel)


