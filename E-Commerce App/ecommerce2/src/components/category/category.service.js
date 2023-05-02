const CategoryModel = require("./category.model");
const slugify = require("slugify");
const factory = require('../Handlers/handler.factory')

const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");
// to add new categories

exports.createCategory = catchAsyncError(async (req, res) => {
  req.body.slug = slugify(req.body.name)
  req.body.image = req.file?.filename;
  let category = new CategoryModel(req.body);
  await category.save();
  res.status(200).json(category);
});

// to get all categories
exports.getCategories = catchAsyncError(async (req, res) => {

  let categories = await CategoryModel.find({});
  res.status(200).json(categories);
});

// to get specific category
exports.getCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let category = await CategoryModel.findById(id);
  if (!category) {
    return next(new AppError("Category not found", 400));
  }
  res.status(200).json(category);
});

// to update specific category
exports.updateCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  if( req.body.name){
    req.body.slug = slugify(req.body.name)
  }
  req.body.image = req.file?.filename;
  let category = await CategoryModel.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );

  if (!category) {
    return next(new AppError("Category not found", 400));

  }
  res.status(200).json(category);
});

// to delete specific category
exports.deleteCategory = factory.deleteOne(CategoryModel)