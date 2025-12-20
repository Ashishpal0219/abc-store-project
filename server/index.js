const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Log to confirm file is loaded
console.log("------------------------------------------");
console.log("   ✅ RUNNING FINAL V5.0 (FIXED SUGAR & TEA)   ");
console.log("------------------------------------------");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch(err => console.log("MongoDB Error:", err));

// Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
    category: String
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

// --- FINAL FIXED SEED ROUTE V5.0 ---
app.get('/api/seed', async (req, res) => {
    console.log("... Deleting old data ...");
    await Product.deleteMany({});
    
    console.log("... Inserting NEW data ...");
    const products = [
        // STAPLES
        { 
            name: "Basmati Rice (5kg)", 
            price: 450, 
            category: "Staples", 
            description: "Premium long-grain aged Basmati rice.",
            image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80"
        },
        { 
            name: "Sunflower Oil (1L)", 
            price: 140, 
            category: "Staples", 
            description: "Healthy refined sunflower cooking oil.",
            image: "https://images.unsplash.com/photo-1474979266404-7cadd259c308?auto=format&fit=crop&w=600&q=80"
        },
        { 
            name: "Sugar (1kg)", 
            price: 45, 
            category: "Staples", 
            description: "Fine white sulphur-free sugar.",
            image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80" 
        },
        { 
            name: "Wheat Flour (10kg)", 
            price: 350, 
            category: "Staples", 
            description: "Whole wheat flour, chakki fresh.",
            image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
        },

        // VEGETABLES
        { 
            name: "Fresh Tomato (1kg)", 
            price: 30, 
            category: "Vegetables", 
            description: "Farm fresh red juicy tomatoes.",
            image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80"
        },
        { 
            name: "Green Capsicum", 
            price: 40, 
            category: "Vegetables", 
            description: "Crunchy green capsicum.",
            image: "https://images.unsplash.com/photo-1563565375-f3fdf5dbc240?auto=format&fit=crop&w=600&q=80"
        },
        { 
            name: "Red Onions (1kg)", 
            price: 35, 
            category: "Vegetables", 
            description: "Fresh red onions.",
            image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=600&q=80"
        },
        { 
            name: "Potatoes (1kg)", 
            price: 25, 
            category: "Vegetables", 
            description: "Large size fresh potatoes.",
            image: "https://images.unsplash.com/photo-1518977676605-dc9b61140974?auto=format&fit=crop&w=600&q=80"
        },

        // SNACKS & BEVERAGES
        { 
            name: "Tea Powder (500g)", 
            price: 250, 
            category: "Beverages", 
            description: "Strong aromatic Assam tea.",
            image: "https://images.unsplash.com/photo-1564890369478-c59dc2d0df10?auto=format&fit=crop&w=600&q=80"
        },
        { 
            name: "Coffee Powder", 
            price: 300, 
            category: "Beverages", 
            description: "Instant coffee blend.",
            image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80"
        },
        { 
            name: "Biscuits Pack", 
            price: 50, 
            category: "Snacks", 
            description: "Crunchy butter cookies.",
            image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80"
        },
        { 
            name: "Chocolate Bar", 
            price: 80, 
            category: "Snacks", 
            description: "Dark chocolate bar.",
            image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=600&q=80"
        },

        // HOUSEHOLD
        { 
            name: "Detergent (1kg)", 
            price: 120, 
            category: "Household", 
            description: "Washing powder for clothes.",
            image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80"
        },
        { 
            name: "Toothpaste", 
            price: 90, 
            category: "Personal Care", 
            description: "Mint fresh toothpaste.",
            image: "https://images.unsplash.com/photo-1559599189-fe84dea4eb79?auto=format&fit=crop&w=600&q=80"
        },
        { 
            name: "Shampoo (200ml)", 
            price: 180, 
            category: "Personal Care", 
            description: "Hair strengthening shampoo.",
            image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80"
        }
    ];

    await Product.insertMany(products);
    res.send("SUCCESS! Sugar is White, Tea is Fixed. Refresh Site!");
});

app.post('/api/payment', (req, res) => {
    res.json({ message: "Payment Successful", orderId: "ORD" + Date.now() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});