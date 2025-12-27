import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// ✅ Added CheckCircle for the popup icon
import { ShoppingCart, Menu, X, Trash2, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Truck, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

// --- Navbar Component ---
const Navbar = ({ cartCount, toggleCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-emerald-900 text-white sticky top-0 z-50 shadow-xl">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-wider text-yellow-400">ABC STORE</h1>
        
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 font-medium">
          <a href="#" className="hover:text-yellow-400 transition">Home</a>
          <a href="#products" className="hover:text-yellow-400 transition">Products</a>
          <a href="#services" className="hover:text-yellow-400 transition">Services</a>
          <a href="#about" className="hover:text-yellow-400 transition">About</a>
          <a href="#contact" className="hover:text-yellow-400 transition">Contact</a>
        </div>

        {/* Cart Icon */}
        <div className="relative cursor-pointer hover:scale-110 transition" onClick={toggleCart}>
          <ShoppingCart size={28} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-bounce">
              {cartCount}
            </span>
          )}
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-emerald-800 p-4 space-y-2 text-center">
          <a href="#" className="block py-2" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#products" className="block py-2" onClick={() => setIsOpen(false)}>Products</a>
          <a href="#services" className="block py-2" onClick={() => setIsOpen(false)}>Services</a>
          <a href="#contact" className="block py-2" onClick={() => setIsOpen(false)}>Contact</a>
        </div>
      )}
    </nav>
  );
};

// --- Hero Slider ---
const HeroSlider = () => {
  const settings = { dots: true, infinite: true, speed: 600, slidesToShow: 1, slidesToScroll: 1, autoplay: true, autoplaySpeed: 3000 };
  const slides = [
    { img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80", title: "Fresh Vegetables", sub: "Farm to Table, Daily." },
    { img: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1600&q=80", title: "Organic Staples", sub: "Healthy living starts here." },
    { img: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1600&q=80", title: "Mega Discounts", sub: "Up to 50% OFF on Snacks!" }
  ];
  return (
    <div className="overflow-hidden shadow-lg">
      <Slider {...settings}>
        {slides.map((s, i) => (
          <div key={i} className="relative h-[500px]">
            <img src={s.img} alt="Banner" className="w-full h-full object-cover brightness-50" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">{s.title}</h2>
              <p className="text-2xl mb-8 font-light">{s.sub}</p>
              <a href="#products" className="bg-yellow-500 text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-400 transition transform hover:scale-105">Shop Now</a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

// --- Main App ---
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [category, setCategory] = useState("All");
  
  // ✅ NEW: State for the Custom Notification Toast
  const [toast, setToast] = useState(null);

  useEffect(() => {
    axios.get('https://abc-store-project.onrender.com/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  // ✅ IMPROVED: Add to Cart with Professional Popup
  const addToCart = (product) => {
    setCart([...cart, product]);
    
    // Show the custom toast
    setToast(`${product.name} added to cart! 🛒`);

    // Hide it automatically after 3 seconds
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const handlePayment = () => {
    if (cart.length === 0) return alert("Cart is empty");
    
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
    setShowCart(false);

    if (window.startPayment) {
        window.startPayment(totalAmount);
        setCart([]); 
    } else {
        alert("Payment Error: Please refresh the page.");
    }
  };

  // Filter Logic
  const categories = ["All", ...new Set(products.map(p => p.category))];
  const filteredProducts = category === "All" ? products : products.filter(p => p.category === category);

  return (
    <div className="bg-gray-50 min-h-screen font-sans scroll-smooth relative">
      <Navbar cartCount={cart.length} toggleCart={() => setShowCart(true)} />
      <HeroSlider />

      {/* --- SERVICES SECTION --- */}
      <div id="services" className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
            <Truck size={48} className="mx-auto text-emerald-600 mb-4"/>
            <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
            <p className="text-gray-500">Free delivery on orders above ₹500 within 2 hours.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
            <ShieldCheck size={48} className="mx-auto text-emerald-600 mb-4"/>
            <h3 className="text-xl font-bold mb-2">Quality Guarantee</h3>
            <p className="text-gray-500">100% Organic and fresh products sourced directly.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
            <Clock size={48} className="mx-auto text-emerald-600 mb-4"/>
            <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
            <p className="text-gray-500">Our team is here to help you anytime, anywhere.</p>
          </div>
        </div>
      </div>

      {/* --- PRODUCTS SECTION --- */}
      <div id="products" className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Our Products</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8"></div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} 
                className={`px-4 py-2 rounded-full font-medium transition ${category === cat ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <div key={product._id} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-2xl transition duration-300 group">
                <div className="h-56 overflow-hidden relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">FRESH</div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-emerald-600 font-bold uppercase tracking-wide mb-1">{product.category}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-gray-800">₹{product.price}</span>
                    <button onClick={() => addToCart(product)} className="bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 transition shadow-lg hover:shadow-emerald-500/50">
                      <ShoppingCart size={20}/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- ABOUT SECTION --- */}
      <div id="about" className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" className="rounded-2xl shadow-2xl" alt="About Us" />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-6 text-emerald-900">About ABC General Store</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Established in 2025, ABC General Store is committed to providing the highest quality groceries, fresh produce, and daily essentials to our community.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            We partner directly with local farmers to ensure that the vegetables and fruits you get are harvested the same day. Our mission is health, freshness, and affordability.
          </p>
        </div>
      </div>

      {/* --- CONTACT SECTION --- */}
      <div id="contact" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <p className="mb-8 text-gray-400">Have questions? We are here to help!</p>
            <div className="space-y-4">
              <p className="flex items-center gap-3"><MapPin className="text-yellow-400"/> 123 Market Road, Dehradun, India</p>
              <p className="flex items-center gap-3"><Phone className="text-yellow-400"/> +91 98765 43210</p>
              <p className="flex items-center gap-3"><Mail className="text-yellow-400"/> support@geniusesfactory.com</p>
            </div>
            <div className="flex gap-4 mt-8">
              <Facebook className="hover:text-blue-500 cursor-pointer"/>
              <Twitter className="hover:text-blue-400 cursor-pointer"/>
              <Instagram className="hover:text-pink-500 cursor-pointer"/>
            </div>
          </div>
          
          <form className="bg-gray-800 p-8 rounded-xl space-y-4">
            <h3 className="text-xl font-bold mb-4">Send us a message</h3>
            <input type="text" placeholder="Your Name" className="w-full p-3 rounded bg-gray-700 border-none text-white focus:ring-2 focus:ring-emerald-500" />
            <input type="email" placeholder="Your Email" className="w-full p-3 rounded bg-gray-700 border-none text-white focus:ring-2 focus:ring-emerald-500" />
            <textarea placeholder="Message" rows="3" className="w-full p-3 rounded bg-gray-700 border-none text-white focus:ring-2 focus:ring-emerald-500"></textarea>
            <button className="w-full bg-emerald-500 py-3 rounded font-bold hover:bg-emerald-600 transition">Submit Query</button>
          </form>
        </div>
        <div className="text-center mt-12 border-t border-gray-800 pt-6 text-gray-500 text-sm">
          &copy; 2025 ABC General Store. All rights reserved.
        </div>
      </div>

      {/* --- CART DRAWER --- */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
            <div className="p-6 bg-emerald-900 text-white flex justify-between items-center shadow-md">
              <h2 className="text-xl font-bold">Your Cart ({cart.length})</h2>
              <button onClick={() => setShowCart(false)}><X/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {cart.length === 0 ? (
                <div className="text-center text-gray-400 mt-20">
                  <ShoppingCart size={48} className="mx-auto mb-4 opacity-50"/>
                  <p>Your cart is empty.</p>
                </div>
              ) : 
                cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                      <img src={item.image} className="w-12 h-12 rounded-md object-cover" alt="" />
                      <div>
                        <h4 className="font-bold text-gray-800">{item.name}</h4>
                        <p className="text-sm text-emerald-600 font-semibold">₹{item.price}</p>
                      </div>
                    </div>
                    {/* Remove Button */}
                    <button onClick={() => removeFromCart(index)} className="text-red-400 hover:text-red-600 p-2">
                      <Trash2 size={18}/>
                    </button>
                  </div>
                ))
              }
            </div>

            <div className="p-6 border-t bg-white shadow-inner">
              <div className="flex justify-between text-xl font-bold mb-4 text-gray-800">
                <span>Total Amount:</span>
                <span>₹{cart.reduce((sum, item) => sum + item.price, 0)}</span>
              </div>
              <button 
                onClick={handlePayment}
                className="w-full bg-yellow-500 text-black py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition shadow-lg">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ NEW: BEAUTIFUL POPUP TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-emerald-700 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 animate-bounce">
          <CheckCircle className="text-yellow-400" size={28} />
          <div>
            <h4 className="font-bold text-lg">Success!</h4>
            <p className="text-sm opacity-90">{toast}</p>
          </div>
          <button onClick={() => setToast(null)} className="ml-4 hover:text-gray-300"><X size={18}/></button>
        </div>
      )}

    </div>
  );
}

export default App;