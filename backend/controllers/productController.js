const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const newProduct = new Product({ title, description, price, seller: req.user.userId });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('seller', 'name');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
