const Product = require('../models/Product');

// Get all products with filters
const getProducts = async (req, res) => {
    try {
        const {
            category,
            subCategory,
            minPrice,
            maxPrice,
            sort,
            page = 1,
            limit = 12
        } = req.query;

        const query = {};

        // Apply filters
        if (category) query.category = category;
        if (subCategory) query.subCategory = subCategory;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Apply sorting
        let sortOption = {};
        if (sort) {
            switch (sort) {
                case 'price-asc':
                    sortOption = { price: 1 };
                    break;
                case 'price-desc':
                    sortOption = { price: -1 };
                    break;
                case 'newest':
                    sortOption = { createdAt: -1 };
                    break;
                case 'rating':
                    sortOption = { rating: -1 };
                    break;
                default:
                    sortOption = { createdAt: -1 };
            }
        }

        // Execute query with pagination
        const products = await Product.find(query)
            .sort(sortOption)
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Product.countDocuments(query);

        res.json({
            products,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// Get single product
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

// Create new product (admin only)
const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({
            message: 'Product created successfully',
            product
        });
    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error: error.message });
    }
};

// Update product (admin only)
const updateProduct = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        'name', 'description', 'price', 'category', 'subCategory',
        'images', 'sizes', 'colors', 'stock', 'discount', 'isNew'
    ];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ message: 'Invalid updates' });
    }

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        updates.forEach(update => product[update] = req.body[update]);
        await product.save();

        res.json({
            message: 'Product updated successfully',
            product
        });
    } catch (error) {
        res.status(400).json({ message: 'Error updating product', error: error.message });
    }
};

// Delete product (admin only)
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

// Add product review
const addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = {
            user: req.user._id,
            rating,
            comment
        };

        product.reviews.push(review);

        // Update product rating
        const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
        product.rating = totalRating / product.reviews.length;

        await product.save();

        res.json({
            message: 'Review added successfully',
            product
        });
    } catch (error) {
        res.status(400).json({ message: 'Error adding review', error: error.message });
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    addReview
}; 