const BrandModel = require("./brand.model");
const slugify = require("slugify");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");
const factory = require('../Handlers/handler.factory')
const cloudinary = require('cloudinary')
cloudinary.config({
  cloud_name: 'dhb7yebcv',
  api_key: '144284845545949',
  api_secret: '071jf120fM1G-Wi9VsxwUqKlQjQ'
});
// to add new barnds
exports.createBrand = catchAsyncError(async (req, res) => {
  // cloudinary.v2.uploader.upload(req.file.path, (error, result) => {
  //   console.log(result);
  // });

  req.body.slug = slugify(req.body.name)
  req.body.image = req.file?.filename;
  let Brand = new BrandModel(req.body);
  await Brand.save();
  res.status(200).json(Brand);
});

// to get all brands
exports.getBrands = catchAsyncError(async (req, res) => {
  let brands = await BrandModel.find({});
  res.status(200).json(brands);
});

// to get specific Brand
exports.getBrand = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let Brand = await BrandModel.findById(id);
  !Brand && next(new AppError("Category not found", 400));
  Brand && res.status(200).json(Brand);
});

// to update specific Brand
exports.updateBrand = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.name) {
    req.body.slug = slugify(req.body.name)
  }
  req.body.image = req.file?.filename;
  let Brand = await BrandModel.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );

  !Brand && next(new AppError("Category not found", 400));
  Brand && res.status(200).json(Brand);
});

// to delete specific Brand
exports.deleteBrand = factory.deleteOne(BrandModel)


