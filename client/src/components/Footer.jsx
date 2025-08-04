import { FaInstagram, FaFacebook, FaTwitter, FaYoutube, FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import React from 'react';
import logo from '../assets/logo.png';


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Brand Info - Tightened spacing */}
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
                <a href="tel:+919307190726" className="hover:text-orange-500 transition-colors">+91 9307190726</a>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 flex-shrink-0 text-lg" />
                <a href="tel:+917721874530" className="hover:text-orange-500 transition-colors">+91 7721874530</a>
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
              <li><a href="/home" className="hover:text-orange-500 transition-colors block">Home</a></li>
              <li><a href="/" className="hover:text-orange-500 transition-colors block">Shop</a></li>
              <li><a href="/about" className="hover:text-orange-500 transition-colors block">About Us</a></li>
              <li><a href="/contact" className="hover:text-orange-500 transition-colors block">Contact</a></li>
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
        
        {/* Copyright - Reduced padding */}
        <div className="text-center text-gray-400 text-sm pt-4 border-t border-gray-700">
          <p>&copy; {new Date().getFullYear()} Fresh Farm Meats. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;