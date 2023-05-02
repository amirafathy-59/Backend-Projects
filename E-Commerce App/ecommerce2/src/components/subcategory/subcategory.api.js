const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("./subcategory.service");

const router = require("express").Router({mergeParams:true});

router.route("/").post(createSubCategory).get(getSubCategories);
router
  .route("/:id")
  .get(getSubCategory)
  .put(updateSubCategory)
  .delete(deleteSubCategory);

module.exports = router;
