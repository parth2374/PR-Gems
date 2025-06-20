const express = require("express");

const {
  handleImageUpload,
  handleVideoUpload,
  handleFrontSideImageUpload,
  handleBackSideImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
  toggleProductListing
} = require("../../controllers/admin/products-controller");

const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/upload-video", upload.single("my_video_file"), handleVideoUpload);
router.post("/upload-front-image", upload.single("my_front_image_file"), handleFrontSideImageUpload);
router.post("/upload-back-image", upload.single("my_back_image_file"), handleBackSideImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchAllProducts);
router.put("/toggle-listing/:id", toggleProductListing);

module.exports = router;
