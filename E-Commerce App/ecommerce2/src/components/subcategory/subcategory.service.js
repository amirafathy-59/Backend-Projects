const SubCategoryModel = require("./subcategory.model");
const slugify = require("slugify");
const factory=require('../Handlers/handler.factory')
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");
// to add new subcategories

exports.createSubCategory = catchAsyncError(async (req, res) => {
  const { name, category } = req.body;
  console.log(req.body);
  let subcategory = new SubCategoryModel({
    name,
    slug: slugify(name),
    category,
  });
  await subcategory.save();
  res.status(200).json(subcategory);
});

// to get all subcategories
exports.getSubCategories = catchAsyncError(async (req, res) => {
  let filter = {};
  if (req.params.categoryId) {
    filter = { category: req.params.categoryId };
  }
  
  let subcategories = await SubCategoryModel.find(filter).populate('category','name -_id')
  res.status(200).json(subcategories);
});

// to get specific subcategory
exports.getSubCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let subcategory = await SubCategoryModel.findById(id);
  if (!subcategory) {
    return next(new AppError("Category not found", 400));
  }
  res.status(200).json(subcategory);
});

// to update specific subcategory
exports.updateSubCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  let subcategory = await SubCategoryModel.findByIdAndUpdate(
    id,
    {
      name,
      slug: slugify(name),
      category,
    },
    { new: true }
  );

  if (!subcategory) {
    return next(new AppError("Category not found", 400));
  }
  res.status(200).json(subcategory);
});

// to delete specific subcategory
exports.deleteSubCategory = factory.deleteOne(SubCategoryModel)


