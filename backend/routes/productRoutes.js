const express = require('express');
const { createProduct, getProducts } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware'); // Ensure this is correctly imported

const router = express.Router();

router.post('/', protect, createProduct); // Use only one middleware function
router.get('/', getProducts);

module.exports = router;
