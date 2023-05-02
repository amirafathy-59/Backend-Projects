const { uploadSingleFile } = require("../../utils/fileUpload");
const { ProtectedRoutes, allowedTo } = require("../user/user.auth");
const {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("./brand.service");

const router = require("express").Router();

router
  .route("/")
  .post(
    ProtectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "brand"),
    createBrand
  )
  .get(getBrands);
router
  .route("/:id")
  .get(getBrand)
  .put(
    ProtectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "brand"),
    updateBrand
  )
  .delete(ProtectedRoutes, allowedTo("admin"), deleteBrand);

module.exports = router;
