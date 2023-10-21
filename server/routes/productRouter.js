const express = require("express");
const productRouter = express.Router();
const productController = require("../controller/productController");
const multer = require("multer");
const { protact } = require("../middleware/authMiddleware");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./roroadmin/public/img");
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage });
productRouter.get("/allproduct", productController.getallProduct);
productRouter.get("/category", productController.getCategory);
productRouter.post("/product/details", productController.getDetails);
productRouter.delete("/product/:id", productController.deletproduct);
productRouter.post("/createproduct", productController.createlProduct);

module.exports = productRouter;
