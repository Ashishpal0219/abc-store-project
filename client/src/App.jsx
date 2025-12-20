import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ShoppingCart, Menu, X, Facebook, Twitter, Instagram, MapPin, Phone, Mail } from 'lucide-react';

// --- Components ---

const Navbar = ({ cartCount, toggleCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-blue-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wider">ABC STORE</h1>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-yellow-400 transition">Home</a>
          <a href="#products" className="hover:text-yellow-400 transition">Products</a>
          <a href="#services" className="hover:text-yellow-400 transition">Services</a>
          <a href="#about" className="hover:text-yellow-400 transition">About</a>
          <a href="#contact" className="hover:text-yellow-400 transition">Contact</a>
        </div>

        {/* Cart Icon */}
        <div className="relative cursor-pointer" onClick={toggleCart}>
          <ShoppingCart size={28} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-800 p-4 space-y-2">
          <a href="#" className="block py-2 hover:text-yellow-400">Home</a>
          <a href="#products" className="block py-2 hover:text-yellow-400">Products</a>
          <a href="#contact" className="block py-2 hover:text-yellow-400">Contact</a>
        </div>
      )}
    </nav>
  );
};

const HeroSlider = () => {
  const settings = { dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1, autoplay: true };
  return (
    <div className="w-full overflow-hidden mb-10">
      <Slider {...settings}>
        <div className="relative h-[400px] bg-gray-800">
          <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80" alt="Sale" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
            <h2 className="text-5xl font-bold mb-4">Mega Sale is Live!</h2>
            <p className="text-xl mb-6">Up to 50% off on all Grocery Items</p>
            <button className="bg-yellow-500 text-black px-8 py-3 font-bold rounded hover:bg-yellow-400 transition">Shop Now</button>
          </div>
        </div>
        <div className="relative h-[400px] bg-gray-800">
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80" alt="Groceries" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
            <h2 className="text-5xl font-bold mb-4">Fresh Vegetables</h2>
            <p className="text-xl mb-6">Farm fresh delivered to your doorstep</p>
            <button className="bg-green-500 text-white px-8 py-3 font-bold rounded hover:bg-green-600 transition">Explore</button>
          </div>
        </div>
      </Slider>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-10 mt-20" id="contact">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-white text-xl font-bold mb-4">ABC General Store</h3>
        <p>Your one-stop shop for all daily needs. Quality products at the best prices.</p>
      </div>
      <div>
        <h3 className="text-white text-xl font-bold mb-4">Contact Us</h3>
        <p className="flex items-center gap-2 mb-2"><MapPin size={18}/> 123 Market Road, Dehradun</p>
        <p className="flex items-center gap-2 mb-2"><Phone size={18}/> +91 98765 43210</p>
        <p className="flex items-center gap-2"><Mail size={18}/> support@geniusesfactory.com</p>
      </div>
      <div>
        <h3 className="text-white text-xl font-bold mb-4">Follow Us</h3>
        <div className="flex space-x-4">
          <Facebook className="hover:text-blue-500 cursor-pointer"/>
          <Twitter className="hover:text-blue-400 cursor-pointer"/>
          <Instagram className="hover:text-pink-500 cursor-pointer"/>
        </div>
      </div>
    </div>
    <div className="text-center mt-10 border-t border-gray-700 pt-6">
      &copy; 2025 ABC General Store. All rights reserved.
    </div>
  </footer>
);

// --- Main App ---

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    // Fetch products from backend
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error:", err));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handlePayment = async () => {
    if(cart.length === 0) return alert("Cart is empty");
    try {
      await axios.post('http://localhost:5000/api/payment');
      alert("Payment Successful (Demo Mode)");
      setCart([]);
      setShowCart(false);
    } catch (e) { alert("Payment Failed"); }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar cartCount={cart.length} toggleCart={() => setShowCart(true)} />
      <HeroSlider />

      {/* Products Section */}
      <div className="container mx-auto px-4 py-8" id="products">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Our Products</h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-10"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <div key={product._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 group">
              <div className="h-48 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
              </div>
              <div className="p-5">
                <div className="text-xs text-blue-500 font-bold uppercase mb-2">{product.category || "General"}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition flex items-center gap-2">
                    <ShoppingCart size={16}/> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide-over Cart */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <button onClick={() => setShowCart(false)}><X size={24}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4">
              {cart.length === 0 ? <p className="text-gray-500 text-center">Your cart is empty.</p> : 
                cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <div>
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-sm text-gray-500">₹{item.price}</p>
                    </div>
                  </div>
                ))
              }
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between text-xl font-bold mb-4">
                <span>Total:</span>
                <span>₹{cart.reduce((sum, item) => sum + item.price, 0)}</span>
              </div>
              <button 
                onClick={handlePayment}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
                Checkout Securely
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;