import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaWhatsapp, 
  FaPhone, 
  FaShoppingCart, 
  FaLeaf, 
  FaTruck, 
  FaCertificate, 
  FaStar,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaMapMarkerAlt,
  FaEnvelope,
  FaTimes
} from 'react-icons/fa';
import { 
  IoFish, 
  IoPaw, 
  IoRestaurant,
  IoTimeOutline
} from 'react-icons/io5';
import { 
  MdOutlineEgg, 
  MdLocalShipping,
  MdPayment,
  MdSupportAgent
} from 'react-icons/md';
import { GiChickenOven } from 'react-icons/gi';
import logo from '../assets/logo.png';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Sample data
  const products = [
    { id: 1, name: 'Goat Curry Cut (1kg)', price: '₹450', rating: 5, reviews: 320, tag: 'Bestseller', icon: <IoPaw /> },
    { id: 2, name: 'Live Mud Crab (500g)', price: '₹600', rating: 4, reviews: 180, tag: 'Seasonal', icon: <IoFish /> },
    { id: 3, name: 'Country Chicken (Whole)', price: '₹350', rating: 5, reviews: 250, tag: 'Popular', icon: <GiChickenOven /> },
    { id: 4, name: 'Farm-Fresh Paneer (200g)', price: '₹120', rating: 4, reviews: 150, tag: 'Fresh', icon: <MdOutlineEgg /> },
  ];

  const testimonials = [
    { id: 1, text: "The goat meat is so tender – tastes like my village butcher!", author: "Rajesh M.", location: "Hyderabad" },
    { id: 2, text: "Only place for live crabs that survive 2-day shipping!", author: "Hotel SeaShell", location: "Goa" },
    { id: 3, text: "Paneer so fresh it melts in your mouth. Weekly order customer for 2 years!", author: "Priya K.", location: "Bangalore" },
    { id: 4, text: "Country chicken tastes like how chicken should taste. Never buying supermarket again.", author: "Arjun P.", location: "Chennai" }
  ];

  const features = [
    { icon: <FaLeaf />, title: "100% Natural", desc: "No hormones or antibiotics" },
    { icon: <FaTruck />, title: "Fast Delivery", desc: "Same-day processing" },
    { icon: <FaCertificate />, title: "Certified", desc: "FSSAI & Halal certified" },
    { icon: <MdLocalShipping />, title: "Live Seafood", desc: "Crabs delivered live" },
    { icon: <IoTimeOutline />, title: "24/7 Support", desc: "Always available" },
    { icon: <MdPayment />, title: "Easy Payments", desc: "Multiple options" }
  ];

  // Handle WhatsApp click
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919307190726', '_blank');
  };

  // Handle phone click
  const handlePhoneClick = () => {
    window.location.href = 'tel:+919307190726';
  };

  // Handle add to cart
  const handleAddToCart = (productId) => {
    alert(`Added product ${productId} to cart`);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="font-sans bg-gray-50">
     {/* Navigation */}
<nav className={`bg-white shadow-md sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 shadow-lg' : 'py-4'}`}>
  <div className="container mx-auto px-4 flex justify-between items-center">
    <div className="flex items-center space-x-3">
      <Link to="/" className="flex items-center">
        <div className={`relative ${isScrolled ? 'h-12 w-12' : 'h-16 w-16'} transition-all`}>
          {/* Golden circle frame */}
          <div className="absolute inset-0 rounded-full border-2 border-yellow-500"></div>
          {/* Logo image */}
          <div className="absolute inset-1 rounded-full overflow-hidden border border-gray-100">
            <img 
              src={logo} 
              alt="Fresh Farm Meats Logo" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="ml-2">
          <h1 className={`font-bold text-green-600 ${isScrolled ? 'text-lg' : 'text-xl'}`}>Fresh Farm Meats</h1>
          <p className={`text-gray-500 ${isScrolled ? 'text-xs' : 'text-sm'}`}>Farm-Fresh Meat & Dairy</p>
        </div>
      </Link>
    </div>
          {/* Mobile menu button (hamburger) */}
          <div className="md:hidden flex items-center">
            <button 
              className="text-gray-700 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/home" className="hover:text-green-600 transition">Home</Link>
            <Link to="/home" className="hover:text-green-600 transition">Shop</Link>
            <Link to="/about" className="hover:text-green-600 transition">AboutUs</Link>
            <Link to="/contact" className="hover:text-green-600 transition">Contact</Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex bg-green-600 text-white px-4 py-2 rounded-md items-center"
            onClick={handleWhatsAppClick}
          >
            <FaWhatsapp className="mr-2" /> Order Now
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-2 px-4 shadow-lg">
            <Link 
              to="/" 
              className="block py-3 hover:text-green-600 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              to="/about" 
              className="block py-3 hover:text-green-600 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              AboutUs
            </Link>
            <Link 
              to="/contact" 
              className="block py-3 hover:text-green-600 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <button
              className="w-full mt-2 bg-green-600 text-white px-4 py-2 rounded-md flex items-center justify-center"
              onClick={() => {
                handleWhatsAppClick();
                setIsMenuOpen(false);
              }}
            >
              <FaWhatsapp className="mr-2" /> Order Now
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="bg-[url('https://images.unsplash.com/photo-1604329760661-e71dc83f8f26')] bg-cover bg-center absolute inset-0"></div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Farm-to-Table Meats & Seafood
          </h1>
          <p className="text-xl mb-8">
            Premium quality, ethically sourced, and delivered to your doorstep
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold flex items-center justify-center"
              >
                <FaShoppingCart className="mr-2" /> Shop Now
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-gray-100 text-green-700 px-6 py-3 rounded-lg text-lg font-semibold flex items-center justify-center"
              onClick={handlePhoneClick}
            >
              <FaPhone className="mr-2" /> Call: +91 93071 90726
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Product Categories */}
      <section id="products" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Premium Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hand-selected, farm-fresh meats and dairy delivered with care
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={slideUp}
                whileHover={{ y: -10 }}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 border border-gray-200"
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center text-6xl text-gray-400">
                  {product.icon}
                </div>
                <div className="p-6">
                  {product.tag && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
                      {product.tag}
                    </span>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${i < product.rating ? 'text-yellow-400' : 'text-gray-300'} mr-1`}
                      />
                    ))}
                    <span className="text-gray-500 text-sm ml-2">({product.reviews})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-800">{product.price}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Fresh Farm Meats?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to quality, freshness, and your complete satisfaction
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="text-green-600 text-3xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trusted by homes and restaurants across India
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={slideUp}
                className="bg-gray-50 p-8 rounded-xl shadow-md border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 mr-1" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold mr-4">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Experience Fresh Farm Meats?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of happy customers enjoying premium quality meats
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-green-700 px-8 py-3 rounded-lg text-lg font-semibold"
                >
                  Start Shopping
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white px-8 py-3 rounded-lg text-lg font-semibold"
                onClick={handleWhatsAppClick}
              >
                Bulk Orders
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white pt-10 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Brand Info */}
            <div className="md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-2">
                <img 
                  src={logo} 
                  alt="Fresh Farm Meats Logo" 
                  className="h-14 mr-3"
                />
                <h2 className="text-2xl font-bold text-white">Fresh Farm Meats</h2>
              </div>
              <p className="text-gray-300 text-base mb-4">
                Fresh Farm Meats delivers high-quality, affordable meats straight from our farm to your table—serving homes, hotels, restaurants, and more with fresh, low-cost options for every meal.
              </p>
              
              {/* Social Icons */}
              <div className="flex gap-4">
                <a href="#" className="text-white hover:text-orange-500 transition-colors">
                  <FaInstagram size={24} />
                </a>
                <a href="#" className="text-white hover:text-orange-500 transition-colors">
                  <FaFacebook size={24} />
                </a>
                <a href="#" className="text-white hover:text-orange-500 transition-colors">
                  <FaTwitter size={24} />
                </a>
                <a href="#" className="text-white hover:text-orange-500 transition-colors">
                  <FaYoutube size={24} />
                </a>
              </div>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-xl font-semibold mb-4 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-orange-500">
                CONTACT US
              </h3>
              <ul className="space-y-3 text-gray-300 text-base">
                <li className="flex items-start">
                  <FaMapMarkerAlt className="mt-1 mr-3 flex-shrink-0 text-lg" />
                  <span>Nagpur, Maharashtra, India</span>
                </li>
                <li className="flex items-center">
                  <FaPhone className="mr-3 flex-shrink-0 text-lg" />
                  <a href="tel:+919307190726" className="hover:text-orange-500 transition-colors">+91 93071 90726</a>
                </li>
                <li className="flex items-center">
                  <FaPhone className="mr-3 flex-shrink-0 text-lg" />
                  <a href="tel:+917721874530" className="hover:text-orange-500 transition-colors">+91 77218 74530</a>
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="mr-3 flex-shrink-0 text-lg" />
                  <a href="mailto:freshfarmmeats@gmail.com" className="hover:text-orange-500 transition-colors">freshfarmmeats@gmail.com</a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-orange-500">
                QUICK LINKS
              </h3>
              <ul className="space-y-2 text-gray-300 text-base">
                <li><Link to="/" className="hover:text-orange-500 transition-colors block">Home</Link></li>
                <li><Link to="/home" className="hover:text-orange-500 transition-colors block">Shop</Link></li>
                <li><Link to="/about" className="hover:text-orange-500 transition-colors block">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-orange-500 transition-colors block">Contact</Link></li>
              </ul>
            </div>

            {/* Opening Hours */}
            <div>
              <h3 className="text-xl font-semibold mb-4 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-orange-500">
                OPENING HOURS
              </h3>
              <div className="text-gray-300 text-base space-y-2">
                <p>Monday - Sunday:<br />12:00 PM - 12:00 AM</p>
                <p className="font-medium mt-2">Special Event orders - By Contact</p>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm pt-4 border-t border-gray-700">
            <p>&copy; {new Date().getFullYear()} Fresh Farm Meats. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;