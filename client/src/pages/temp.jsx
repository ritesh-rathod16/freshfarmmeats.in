import { useState } from 'react';
import React from 'react';
import logo from '../';
import { FaSearch, FaUser, FaShoppingCart, FaChevronDown, FaWhatsapp } from 'react-icons/fa';
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[460px] overflow-hidden">
          <img 
            className="absolute inset-0 w-full h-full object-cover" 
            src="https://goatwala.com/wp-content/uploads/2025/05/goatwala.jpg" 
            alt="Goatwala Farm" 
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl bg-white bg-opacity-80 p-8 rounded-lg">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Welcome to Goatwala</h1>
              <p className="text-lg md:text-xl text-gray-700 mb-6">
                "India's Oldest Goat Farming Unit — The First to Be Approved Under the National Livestock Mission Goat Unit"
              </p>
              <a 
                href="/about-us" 
                className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-6 rounded transition duration-300"
              >
                Know More
              </a>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Training Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2">
              <a href="/training">
                <img 
                  className="w-full h-48 object-cover" 
                  src="https://goatwala.com/wp-content/uploads/2025/05/goatwala-training.jpeg" 
                  alt="Goat Farming Training" 
                />
              </a>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  <a href="/training" className="hover:text-orange-600">Training</a>
                </h3>
                <p className="text-gray-600 mb-4">
                  Goatwala Farm provides training for farmers, NGO coordinators, and new commercial goat farmers with 3-day residential programs and 1-day exposure visits.
                </p>
                <a href="/training" className="text-orange-600 font-medium hover:underline">Know More</a>
              </div>
            </div>
            
            {/* Farm Visit Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2">
              <a href="/farmvisit">
                <img 
                  className="w-full h-48 object-cover" 
                  src="https://goatwala.com/wp-content/uploads/2025/05/goatwala-banner4.jpeg" 
                  alt="Farm Visit" 
                />
              </a>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  <a href="/farmvisit" className="hover:text-orange-600">Farm Visit</a>
                </h3>
                <p className="text-gray-600 mb-4">
                  Our farm is open for visitors with free visits on 15th and 30th of each month, or payable visits at Rs 100 per person on other days.
                </p>
                <a href="/farmvisit" className="text-orange-600 font-medium hover:underline">Know More</a>
              </div>
            </div>
            
            {/* Farm Video Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2">
              <a href="/videos">
                <img 
                  className="w-full h-48 object-cover" 
                  src="https://goatwala.com/wp-content/uploads/2025/05/goatwala-farm.jpeg" 
                  alt="Farm Videos" 
                />
              </a>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  <a href="/videos" className="hover:text-orange-600">Farm Videos</a>
                </h3>
                <p className="text-gray-600 mb-4">
                  Watch our farm videos to understand goat breeds, farm practices, feeding management and all relevant activities of commercial goat farming.
                </p>
                <a href="/videos" className="text-orange-600 font-medium hover:underline">Know More</a>
              </div>
            </div>
            
            {/* Consultancy Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2">
              <a href="/consultancy">
                <img 
                  className="w-full h-48 object-cover" 
                  src="https://goatwala.com/wp-content/uploads/2025/06/experience-cmd2.jpg" 
                  alt="Consultancy" 
                />
              </a>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  <a href="/consultancy" className="hover:text-orange-600">Consultancy</a>
                </h3>
                <p className="text-gray-600 mb-4">
                  We provide consultancy for goat projects and commercial goat farms with terms and conditions based on project and farm planning requirements.
                </p>
                <a href="/consultancy" className="text-orange-600 font-medium hover:underline">Know More</a>
              </div>
            </div>
          </div>
        </div>

        {/* Breeds Section */}
        <div className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">Breeds at Goatwala Farm</h2>
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                Goatwala Farm, situated in Sundrel, Madhya Pradesh, is the oldest goat farm in India and a leading institute dedicated to goat farming in Central India.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Barbari Male */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                <a href="/barbari-male">
                  <img 
                    className="w-full h-48 object-cover" 
                    src="https://goatwala.com/wp-content/uploads/2025/06/BARBARI-MALE-GOATWALA-FARM-2022-25.jpg" 
                    alt="Barbari Male" 
                  />
                </a>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">
                    <a href="/barbari-male" className="hover:text-orange-600">BARBARI MALE</a>
                  </h3>
                  <p className="text-sm text-orange-600 mb-3">Goat Breed</p>
                  <p className="text-gray-600 mb-4">Small, fast breeders, compact</p>
                  <a href="/barbari-male" className="text-orange-600 font-medium hover:underline">Continue Reading</a>
                </div>
              </div>
              
              {/* Barbari Female */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                <a href="/barbari-female">
                  <img 
                    className="w-full h-48 object-cover" 
                    src="https://goatwala.com/wp-content/uploads/2025/06/062-IMG_3497.jpg" 
                    alt="Barbari Female" 
                  />
                </a>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">
                    <a href="/barbari-female" className="hover:text-orange-600">BARBARI FEMALE</a>
                  </h3>
                  <p className="text-sm text-orange-600 mb-3">Goat Breed</p>
                  <p className="text-gray-600 mb-4">Small, fast breeders, compact</p>
                  <a href="/barbari-female" className="text-orange-600 font-medium hover:underline">Continue Reading</a>
                </div>
              </div>
              
              {/* Sojat Male */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                <a href="/sojat-male">
                  <img 
                    className="w-full h-48 object-cover" 
                    src="https://goatwala.com/wp-content/uploads/2025/06/sojatMALE1.jpg" 
                    alt="Sojat Male" 
                  />
                </a>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">
                    <a href="/sojat-male" className="hover:text-orange-600">SOJAT MALE</a>
                  </h3>
                  <p className="text-sm text-orange-600 mb-3">Goat Breed</p>
                  <p className="text-gray-600 mb-4">Long, drooping</p>
                  <a href="/sojat-male" className="text-orange-600 font-medium hover:underline">Continue Reading</a>
                </div>
              </div>
              
              {/* Sojat Female */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                <a href="/sojat-female">
                  <img 
                    className="w-full h-48 object-cover" 
                    src="https://goatwala.com/wp-content/uploads/2025/06/sojatfemale1.jpg" 
                    alt="Sojat Female" 
                  />
                </a>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">
                    <a href="/sojat-female" className="hover:text-orange-600">SOJAT FEMALE</a>
                  </h3>
                  <p className="text-sm text-orange-600 mb-3">Goat Breed</p>
                  <p className="text-gray-600 mb-4">Long, drooping</p>
                  <a href="/sojat-female" className="text-orange-600 font-medium hover:underline">Continue Reading</a>
                </div>
              </div>
              
              {/* Beetel Male */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                <a href="/beetel-male">
                  <img 
                    className="w-full h-48 object-cover" 
                    src="https://goatwala.com/wp-content/uploads/2025/06/beetalmale.jpg" 
                    alt="Beetel Male" 
                  />
                </a>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">
                    <a href="/beetel-male" className="hover:text-orange-600">BEETEL MALE</a>
                  </h3>
                  <p className="text-sm text-orange-600 mb-3">Goat Breed</p>
                  <p className="text-gray-600 mb-4">A pure source of renewal, cleansing energies while restoring balance and vitality.</p>
                  <a href="/beetel-male" className="text-orange-600 font-medium hover:underline">Continue Reading</a>
                </div>
              </div>
              
              {/* Beetel Female */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                <a href="/beetel-female">
                  <img 
                    className="w-full h-48 object-cover" 
                    src="https://goatwala.com/wp-content/uploads/2025/06/beetalfemale1.jpg" 
                    alt="Beetel Female" 
                  />
                </a>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">
                    <a href="/beetel-female" className="hover:text-orange-600">BEETEL FEMALE</a>
                  </h3>
                  <p className="text-sm text-orange-600 mb-3">Goat Breed</p>
                  <p className="text-gray-600 mb-4">A timeless scent of calm, infusing spaces with warmth, clarity, and meditative focus.</p>
                  <a href="/beetel-female" className="text-orange-600 font-medium hover:underline">Continue Reading</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;