const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    addReview
} = require('../controllers/productController');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected routes (require authentication)
router.post('/:id/reviews', auth, addReview);

// Admin routes
router.post('/', auth, isAdmin, createProduct);
router.patch('/:id', auth, isAdmin, updateProduct);
router.delete('/:id', auth, isAdmin, deleteProduct);

module.exports = router; 