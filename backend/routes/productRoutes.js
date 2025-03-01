import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { body } from "express-validator";
import multer from "multer";

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Initialize router
const router = express.Router();

// Create Product
router.post(
  "/",
  upload.array("images", 5), // Limit to 5 images per product
  [
    body("title", "Title is required").not().isEmpty(),
    body("description", "Description is required").not().isEmpty(),
    body("price", "Price must be a number").isNumeric(),
  ],
  createProduct
);

// Get All Products
router.get("/", getProducts);

// Get Single Product by ID
router.get("/:id", getProductById);

// Update Product
router.put(
  "/:id",
  upload.array("images", 5), // Limit to 5 images per product
  [
    body("title", "Title is required").not().isEmpty(),
    body("description", "Description is required").not().isEmpty(),
    body("price", "Price must be a number").isNumeric(),
  ],
  updateProduct
);

// Delete Product
router.delete("/:id", deleteProduct);

export default router;
