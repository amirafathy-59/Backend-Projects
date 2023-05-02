const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("./category.service");
const subcategoryRoute = require("../subcategory/subcategory.api");
const { uploadSingleFile } = require("../../utils/fileUpload");
const { ProtectedRoutes, allowedTo } = require("../user/user.auth");
const router = require("express").Router();

router.use("/:categoryId/subcategories", subcategoryRoute);

router
  .route("/")
  .post(
    ProtectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "category"),
    createCategory
  )
  .get(getCategories);
router
  .route("/:id")
  .get(getCategory)
  .put(
    ProtectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "category"),
    updateCategory
  )
  .delete(ProtectedRoutes, allowedTo("admin"), deleteCategory);

module.exports = router;
