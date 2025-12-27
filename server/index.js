// --- FINAL MANUAL FIX: CLEANED LINKS ---
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

// --- SEED ROUTE ---
app.get('/api/seed', async (req, res) => {
    console.log("... Wiping old data ...");
    await Product.deleteMany({});

    console.log("... Adding MANUAL products ...");
    const products = [
        // --- STAPLES ---
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
            image: "https://images.onlinedpi.com/uploads/2019/04/Sunrich-Refined-Sunflower-Oil-1L-Pouch.jpg"
        },
        { 
            name: "Sugar (1kg)", 
            price: 45, 
            category: "Staples", 
            description: "Fine white sulphur-free sugar.",
            image: "https://png.pngtree.com/thumb_back/fh260/background/20231229/pngtree-texture-of-pure-white-sugar-image_13840319.png" 
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
            image: "https://www.nellonfoods.com/wp-content/uploads/2022/12/toor-dal.png"
        },
       { 
            name: "Table Salt (1kg)", 
            price: 20, 
            category: "Staples", 
            description: "Iodized table salt.",
            // ✅ NEW IMAGE (A clear bowl of salt)
            image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80"
        },

        // --- VEGETABLES ---
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
            image: "https://tse2.mm.bing.net/th/id/OIP.9z7cw1Fd4pwLHaQNEYo4bwHaFj?pid=Api&P=0&h=180"
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
            image: "https://tse3.mm.bing.net/th/id/OIP.OLWNl47KZBa4iO68j1fB4AHaE7?pid=Api&P=0&h=180"
        },

        // --- SNACKS & BEVERAGES ---
        { 
            name: "Tea Powder (500g)", 
            price: 250, 
            category: "Beverages", 
            description: "Strong aromatic Assam tea.",
            image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&h=400&q=80"
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
            image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&h=400&q=80"
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
            image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&h=400&q=80"
        },

        // --- HOUSEHOLD & PERSONAL ---
        { 
            name: "Chocolate Bar", 
            price: 80, 
            category: "Snacks", 
            description: "Dark chocolate bar.",
            image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=600&h=400&q=80"
        },
        { 
            name: "Detergent (1kg)", 
            price: 120, 
            category: "Household", 
            description: "Washing powder for clothes.",
            image: "https://www.4sgm.com/assets/Image/Product/detailsbig/93591.jpg"
        },
        { 
            name: "Dish Soap", 
            price: 40, 
            category: "Household", 
            description: "Lemon fresh dish cleaning liquid.",
            image: "https://i5.walmartimages.com/seo/Dawn-Ultra-Dish-Soap-Dishwashing-Liquid-Original-Scent-18-fl-oz_440b7d0b-f2a2-4925-8336-55ae826e1d00.7561a63e49f11318cc7bf41e741b1922.jpeg"
        },
        { 
            name: "Toothpaste", 
            price: 90, 
            category: "Personal Care", 
            description: "Colgate toothpaste.",
            image: "https://tse2.mm.bing.net/th/id/OIP.sfjKrokfVWNCZxvzS4zuRwHaHa?pid=Api&P=0&h=180"
        },
        { 
            name: "Bathing Soap", 
            price: 45, 
            category: "Personal Care", 
            description: "Palmolive bathing soap.",
            image: "https://i1.wp.com/www.troyrhodenwebstore.com/wp-content/uploads/2014/12/Palmolive-Natural-Olive-Ultra-Moisturising-Soap-Bar-Deodorant-110g-Body-Skin-6.jpg"
        }
    ];

    await Product.insertMany(products);
    res.send("DB FIXED: Manual Images Added!");
});

app.post('/api/payment', (req, res) => {
    res.json({ success: true, message: "Payment Successful" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));