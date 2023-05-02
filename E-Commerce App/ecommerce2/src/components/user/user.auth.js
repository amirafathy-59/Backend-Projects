const UserModel = require("./user.model");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.signup = catchAsyncError(async (req, res, next) => {
  let isUser = await UserModel.findOne({ email: req.body.email });
  if (isUser) return next(new AppError("user already exist", 401));

  let User = new UserModel(req.body);
  await User.save();
  res.status(200).json(User);
});

exports.signin = catchAsyncError(async (req, res, next) => {
  let user = await UserModel.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return next(new AppError("incorrect email or password", 401));

  let token = jwt.sign(
    { name: user.name, userId: user._id },
    process.env.JWT_KEY
  );
  res.status(200).json({ token });
});

exports.ProtectedRoutes = catchAsyncError(async (req, res, next) => {
  let token = req.headers.token;
  if (!token) return next(new AppError("token not provided", 401));

  let decoded = await jwt.verify(token, process.env.JWT_KEY);

  let user = await UserModel.findById(decoded.userId);
  if (!user) return next(new AppError("User Not Found", 401));

  if (user.passwordChangedAt) {
    let changePassword = parseInt(user.passwordChangedAt.getTime() / 1000);
    if (changePassword > decoded.iat)
      return next(new AppError("password changed", 401));
  }


  req.user = user;

  next();
});

exports.allowedTo = (...roles) => {
  return catchAsyncError(async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError("YOU are not authorized to acces this route", 401)
      );

    next();
  });
};
