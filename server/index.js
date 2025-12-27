// --- FINAL MEGA UPDATE: 20 PRODUCTS + OPTIMIZED IMAGES ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch(err => console.log("MongoDB Error:", err));

// Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    description: String
});
const Product = mongoose.model('Product', productSchema);

// API Routes
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

// --- SEED ROUTE (Run this to fix DB) ---
app.get('/api/seed', async (req, res) => {
    console.log("... Wiping old data ...");
    await Product.deleteMany({});

    console.log("... Adding 20 OPTIMIZED products ...");
    const products = [
        // --- STAPLES (6 Items) ---
        { 
            name: "Basmati Rice (5kg)", 
            price: 450, 
            category: "Staples", 
            description: "Premium long-grain aged Basmati rice.",
            image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&h=400&q=80"
        },
        { 
            name: "Sunflower Oil (1L)", 
            price: 140, 
            category: "Staples", 
            description: "Healthy refined sunflower cooking oil.",
            image: "https://plus.unsplash.com/premium_photo-1667520043080-53dcca77e2aa?auto=format&fit=crop&w=600&h=400&q=80"
        },
        { 
            name: "Sugar (1kg)", 
            price: 45, 
            category: "Staples", 
            description: "Fine white sulphur-free sugar.",
            image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&h=400&q=60" 
        },
        { 
            name: "Wheat Flour (10kg)", 
            price: 350, 
            category: "Staples", 
            description: "Whole wheat flour, chakki fresh.",
            image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&h=400&q=80"
        },
        { 
            name: "Toor Dal (1kg)", 
            price: 130, 
            category: "Staples", 
            description: "Premium unpolished Toor Dal.",
            image: "https://plus.unsplash.com/premium_photo-1675237626068-bf46dd79df95?auto=format&fit=crop&w=600&h=400&q=80"
        },
        { 
            name: "Table Salt (1kg)", 
            price: 20, 
            category: "Staples", 
            description: "Iodized table salt.",
            image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=600&h=400&q=80"
        },

        // --- VEGETABLES (4 Items) ---
        { 
            name: "Fresh Tomato (1kg)", 
            price: 30, 
            category: "Vegetables", 
            description: "Farm fresh red juicy tomatoes.",
            image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&h=400&q=80"
        },
        { 
            name: "Green Capsicum", 
            price: 40, 
            category: "Vegetables", 
            description: "Crunchy green capsicum.",
            image: "https://images.unsplash.com/photo-1563565375-f3fdf5dbc240?auto=format&fit=crop&w=600&h=400&q=80"
        },
        { 
            name: "Red Onions (1kg)", 
            price: 35, 
            category: "Vegetables", 
            description: "Fresh red onions.",
            image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=600&h=400&q=80"
        },
        { 
            name: "Potatoes (1kg)", 
            price: 25, 
            category: "Vegetables", 
            description: "Large size fresh potatoes.",
            image: "https://images.unsplash.com/photo-1518977676605-dc9b61140974?auto=format&fit=crop&w=600&h=400&q=80"
        },

        // --- SNACKS & BEVERAGES (5 Items) ---
        { 
            name: "Tea Powder (500g)", 
            price: 250, 
            category: "Beverages", 
            description: "Strong aromatic Assam tea.",
            image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&h=400&q=80"
        },
        { 
            name: "Coffee Powder", 
            price: 300, 
            category: "Beverages", 
            description: "Instant coffee blend.",
            image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&h=400&q=80"
        },
        { 
            name: "Fresh Milk (1L)", 
            price: 60, 
            category: "Beverages", 
            description: "Fresh organic cow milk.",
            image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&h=400&q=80"
        },
        { 
            name: "Biscuits Pack", 
            price: 50, 
            category: "Snacks", 
            description: "Crunchy butter cookies.",
            image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&h=400&q=80"
        },
        { 
            name: "Instant Noodles", 
            price: 15, 
            category: "Snacks", 
            description: "Spicy masala noodles.",
            image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=600&h=400&q=80"
        },

        // --- HOUSEHOLD & PERSONAL (5 Items) ---
        { 
            name: "Chocolate Bar", 
            price: 80, 
            category: "Snacks", 
            description: "Dark chocolate bar.",
            image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=600&h=400&q=80"
        },
        { 
            name: "Detergent (1kg)", 
            price: 120, 
            category: "Household", 
            description: "Washing powder for clothes.",
            image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&h=400&q=80"
        },
        { 
            name: "Dish Soap", 
            price: 40, 
            category: "Household", 
            description: "Lemon fresh dish cleaning liquid.",
            image: "https://plus.unsplash.com/premium_photo-1677688220067-16d4c5c249c5?auto=format&fit=crop&w=600&h=400&q=80"
        },
        { 
            name: "Toothpaste", 
            price: 90, 
            category: "Personal Care", 
            description: "Mint fresh toothpaste.",
            image: "https://images.unsplash.com/photo-1559599189-fe84dea4eb79?auto=format&fit=crop&w=600&h=400&q=80"
        },
        { 
            name: "Bathing Soap", 
            price: 45, 
            category: "Personal Care", 
            description: "Lavender scented bathing soap.",
            image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=600&h=400&q=80"
        }
    ];

    await Product.insertMany(products);
    res.send("DB FIXED: 20 Products Added with PERFECT Sizes!");
});

app.post('/api/payment', (req, res) => {
    res.json({ success: true, message: "Payment Successful" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));