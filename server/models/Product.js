const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['men', 'women', 'kids']
    },
    subCategory: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    sizes: [{
        type: String,
        required: true
    }],
    colors: [{
        type: String,
        required: true
    }],
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: [reviewSchema],
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    isNew: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Add index for better search performance
productSchema.index({ name: 'text', description: 'text' });

// Virtual for discounted price
productSchema.virtual('discountedPrice').get(function() {
    if (this.discount > 0) {
        return this.price * (1 - this.discount / 100);
    }
    return this.price;
});

// Method to check if product is in stock
productSchema.methods.isInStock = function() {
    return this.stock > 0;
};

// Method to update rating when a new review is added
productSchema.methods.updateRating = function() {
    if (this.reviews.length === 0) {
        this.rating = 0;
        return;
    }
    
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.rating = totalRating / this.reviews.length;
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 