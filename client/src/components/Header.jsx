import { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import logo from '../assets/logo.png';
import { 
  FaUser, 
  FaShoppingCart, 
  FaChevronDown, 
  FaWhatsapp, 
  FaBars, 
  FaTimes,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';

const Header = () => {
  const { cartCount } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setIsMobileDropdownOpen(false);
    }
  };

  const handleLogoClick = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 1000);
  };

  return (
    <>
      {/* Main header */}
      <header className={`bg-white shadow-md sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 shadow-lg' : 'py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center" onClick={handleLogoClick}>
                <div className={`relative ${isScrolled ? 'h-12 w-12' : 'h-16 w-16'} transition-all`}>
                  {/* Golden circle frame */}
                  <div className={`absolute inset-0 rounded-full border-2 border-yellow-500 ${isRotating ? 'animate-spin' : ''}`}></div>
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
                  <h1 className="text-xl font-bold text-green-600 sm:block">Fresh Farm Meats</h1>
                  <p className="text-xs text-gray-500 sm:block">Farm-Fresh Meat & Dairy</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <ul className="flex items-center space-x-6">
                <li><Link to="/" className="font-medium text-gray-700 hover:text-orange-500 transition-colors">Home</Link></li>
                
                <li className="relative dropdown-container">
                  <button 
                    className="flex items-center font-medium text-gray-700 hover:text-orange-500 transition-colors"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    Shop <FaChevronDown className={`ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50 border border-gray-100">
                      <Link 
                        to="/goat" 
                        className="block px-4 py-2 hover:bg-orange-50 text-gray-700 hover:text-orange-600"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Goat Meat
                      </Link>
                      <Link 
                        to="/chicken" 
                        className="block px-4 py-2 hover:bg-orange-50 text-gray-700 hover:text-orange-600"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Chicken
                      </Link>
                      <Link 
                        to="/seafood" 
                        className="block px-4 py-2 hover:bg-orange-50 text-gray-700 hover:text-orange-600"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Seafood
                      </Link>
                      <Link 
                        to="/dairy" 
                        className="block px-4 py-2 hover:bg-orange-50 text-gray-700 hover:text-orange-600"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Dairy Products
                      </Link>
                    </div>
                  )}
                </li>
                
                <li><Link to="/about" className="font-medium text-gray-700 hover:text-orange-600 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="font-medium text-gray-700 hover:text-orange-600 transition-colors">Contact</Link></li>
              </ul>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/profile" className="text-gray-700 hover:text-orange-600 transition-colors">
                  <FaUser size={18} />
                </Link>
                <Link to="/cart" className="relative text-gray-700 hover:text-green-500 transition-colors">
                  <FaShoppingCart size={18} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </Link>
              </div>
              
              {/* Mobile cart and menu buttons */}
              <div className="flex items-center space-x-4 md:hidden">
                <Link to="/cart" className="relative text-gray-700 hover:text-green-500 transition-colors">
                  <FaShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </Link>
                <button 
                  onClick={toggleMobileMenu} 
                  className="text-gray-700 hover:text-green-500 transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg w-full py-4">
            <div className="container mx-auto px-4">
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/" 
                    className="block font-medium text-gray-700 hover:text-green-500 py-2 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Home
                  </Link>
                </li>
                
                <li>
                  <button 
                    className="flex items-center justify-between w-full font-medium text-gray-700 hover:text-green-500 py-2 transition-colors"
                    onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                  >
                    <span>Shop</span>
                    <FaChevronDown className={`transition-transform ${isMobileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isMobileDropdownOpen && (
                    <div className="mt-2 ml-4 bg-gray-50 rounded-md py-2 space-y-2">
                      <Link 
                        to="/goat" 
                        className="block px-4 py-2 hover:bg-green-50 text-gray-700 hover:text-green-600 rounded transition-colors"
                        onClick={toggleMobileMenu}
                      >
                        Goat Meat
                      </Link>
                      <Link 
                        to="/chicken" 
                        className="block px-4 py-2 hover:bg-green-50 text-gray-700 hover:text-green-600 rounded transition-colors"
                        onClick={toggleMobileMenu}
                      >
                        Chicken
                      </Link>
                      <Link 
                        to="/seafood" 
                        className="block px-4 py-2 hover:bg-green-50 text-gray-700 hover:text-green-600 rounded transition-colors"
                        onClick={toggleMobileMenu}
                      >
                        Seafood
                      </Link>
                      <Link 
                        to="/dairy" 
                        className="block px-4 py-2 hover:bg-green-50 text-gray-700 hover:text-green-600 rounded transition-colors"
                        onClick={toggleMobileMenu}
                      >
                        Dairy Products
                      </Link>
                    </div>
                  )}
                </li>
                
                <li>
                  <Link 
                    to="/about" 
                    className="block font-medium text-gray-700 hover:text-green-500 py-2 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="block font-medium text-gray-700 hover:text-green-500 py-2 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Contact
                  </Link>
                </li>

                <li className="pt-4 border-t border-gray-100">
                  <Link 
                    to="/account" 
                    className="flex items-center space-x-3 text-gray-700 hover:text-green-500 py-2 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    <FaUser size={18} />
                    <span>My Account</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </header>

      {/* WhatsApp floating button */}
      <a 
        href="https://wa.me/917722003712" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform z-40"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </>
  );
};

export default Header;