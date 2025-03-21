const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const products = [
    {
        name: 'Classic White T-Shirt',
        description: 'A comfortable and versatile white t-shirt made from 100% cotton. Perfect for everyday wear.',
        price: 29.99,
        category: 'men',
        subCategory: 't-shirts',
        images: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
            'https://images.unsplash.com/photo-1562157873-818bc0726f68'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['white'],
        stock: 100,
        rating: 4.5,
        reviews: [],
        discount: 0,
        isNew: true
    },
    {
        name: 'Slim Fit Denim Jeans',
        description: 'Modern slim-fit jeans in classic blue denim. Features comfortable stretch material.',
        price: 79.99,
        category: 'men',
        subCategory: 'jeans',
        images: [
            'https://images.unsplash.com/photo-1542272604-787c3835535d',
            'https://images.unsplash.com/photo-1541099649105-f69ad21f3246'
        ],
        sizes: ['30', '32', '34', '36'],
        colors: ['blue'],
        stock: 75,
        rating: 4.3,
        reviews: [],
        discount: 10,
        isNew: false
    },
    {
        name: 'Floral Summer Dress',
        description: 'Beautiful floral print dress perfect for summer days. Made from lightweight, breathable fabric.',
        price: 89.99,
        category: 'women',
        subCategory: 'dresses',
        images: [
            'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1',
            'https://images.unsplash.com/photo-1612336307429-8a898d10e223'
        ],
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['blue', 'pink'],
        stock: 50,
        rating: 4.7,
        reviews: [],
        discount: 15,
        isNew: true
    },
    {
        name: 'Leather Jacket',
        description: 'Classic black leather jacket with silver hardware. Perfect for adding an edge to any outfit.',
        price: 199.99,
        category: 'women',
        subCategory: 'jackets',
        images: [
            'https://images.unsplash.com/photo-1551028719-00167b16eac5',
            'https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f'
        ],
        sizes: ['S', 'M', 'L'],
        colors: ['black'],
        stock: 30,
        rating: 4.8,
        reviews: [],
        discount: 0,
        isNew: true
    },
    {
        name: 'Kids Dinosaur T-Shirt',
        description: 'Fun dinosaur print t-shirt for kids. Made from soft, comfortable cotton.',
        price: 24.99,
        category: 'kids',
        subCategory: 't-shirts',
        images: [
            'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8',
            'https://images.unsplash.com/photo-1622290291289-a9f0e3e7b608'
        ],
        sizes: ['4', '6', '8', '10'],
        colors: ['green', 'blue'],
        stock: 60,
        rating: 4.6,
        reviews: [],
        discount: 0,
        isNew: true
    }
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Insert new products
        await Product.insertMany(products);
        console.log('Added sample products');

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
};

seedProducts(); 