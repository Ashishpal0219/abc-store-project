const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch(err => console.log("MongoDB Error:", err));

// 2. Define what a "Product" looks like
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
    category: String
});
const Product = mongoose.model('Product', productSchema);

// 3. API Routes

// Route to get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

// Route to add dummy data (Run this once)
app.get('/api/seed', async (req, res) => {
    const dummyProducts = [
        { name: "Sugar (1kg)", price: 50, description: "Premium quality sugar", image: "https://via.placeholder.com/150", category: "Grocery" },
        { name: "Tea Powder", price: 120, description: "Strong leaf tea", image: "https://via.placeholder.com/150", category: "Grocery" },
        { name: "Rice (5kg)", price: 300, description: "Basmati Rice", image: "https://via.placeholder.com/150", category: "Grocery" },
        { name: "Cooking Oil", price: 180, description: "Sunflower Oil 1L", image: "https://via.placeholder.com/150", category: "Grocery" },
        { name: "Biscuits", price: 20, description: "Crunchy cookies", image: "https://via.placeholder.com/150", category: "Snacks" }
    ];
    
    await Product.insertMany(dummyProducts);
    res.send("Database seeded with products!");
});

// Route for Fake Payment (Simplifying for now)
app.post('/api/payment', (req, res) => {
    res.json({ message: "Payment Successful", orderId: "ORD" + Date.now() });
});

app.get('/', (req, res) => {
    res.send("Server is Running!");
});

// 4. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});