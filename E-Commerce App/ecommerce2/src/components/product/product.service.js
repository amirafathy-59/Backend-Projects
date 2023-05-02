const ProductModel = require("./product.model");
const slugify = require("slugify");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");
const factory = require('../Handlers/handler.factory');
const ApiFeatures = require("../../utils/ApiFeatures");

// to add new products
exports.createProduct = catchAsyncError(async (req, res) => {
  let imgs = []
  req.body.slug = slugify(req.body.name);
  req.body.imageCover = req.files.imageCover[0].filename
  req.files.images.forEach((elm) => {
    imgs.push(elm.filename)
  })
  req.body.images = imgs
  let Product = new ProductModel(req.body);
  await Product.save();
  res.status(200).json(Product);
});














// to get all Products
exports.getProducts = catchAsyncError(async (req, res) => {

  let apiFeatures = new ApiFeatures(ProductModel.find(), req.query).paginate().fields().filter().search().sort()

  Products = await apiFeatures.mongooseQuery
  res.status(200).json({ page: apiFeatures.page, Products });
});

















// to get specific Product
exports.getProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let Product = await ProductModel.findById(id);
  !Product && next(new AppError("Category not found", 400));
  Product && res.status(200).json(Product);
});

// to update specific Product
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }

  let Product = await ProductModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !Product && next(new AppError("Category not found", 400));
  Product && res.status(200).json(Product);
});

// to delete specific Product
exports.deleteProduct = factory.deleteOne(ProductModel)