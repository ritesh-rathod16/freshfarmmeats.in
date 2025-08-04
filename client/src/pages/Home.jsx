import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TrustBadges from '../components/TrustBadges';
import { useCart } from '../components/CartContext';

const Home = () => {
  const navigate = useNavigate();
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [selectedWeights, setSelectedWeights] = useState({});
  const { addToCart, cartItems } = useCart();

  // Hero slides data
  const slides = [
    {
      image: 'https://i.pinimg.com/736x/7a/1d/52/7a1d52e2e1c3ec3ebc3d7bfa44013019.jpg',
      title: 'Fresh Goat Meat – 10% Off First Order!',
      description: 'Premium quality, hygienically packed, delivered to your doorstep',
      link: '/goat',
    },
    {
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'Daily Dairy Delivery – Subscribe & Save',
      description: 'Get fresh milk, curd, paneer and more delivered daily with 15% discount',
      link: '/dairy',
    },
    {
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'Weekend Seafood Special – Free Delivery!',
      description: 'Fresh prawns, fish and crabs for your weekend feast',
      link: '/seafood',
    },
  ];

  // Categories data
  const categories = [
    {
      name: 'Goat Meat',
      description: 'Fresh cuts for all your recipes',
      image: 'https://i.pinimg.com/736x/bb/a6/0a/bba60a0307e62e9ceb0073e1b55f752c.jpg',
      link: '/goat',
    },
    {
      name: 'Chicken',
      description: 'Farm raised, antibiotic-free',
      image: 'https://tse2.mm.bing.net/th/id/OIP.3B4SQMFF7BST2jz2UCjrxgHaFu?pid=Api&P=0&h=180',
      link: '/chicken',
    },
    {
      name: 'Seafood',
      description: 'Fresh catch from the coast',
      image: 'https://thumbs.dreamstime.com/b/raw-salmon-fish-whole-ingredients-cookings-black-salmon-fish-raw-salmon-fish-whole-ingredients-cookings-133501392.jpg',
      link: '/seafood',
    },
    {
      name: 'Dairy Products',
      description: 'Milk, cheese, butter and more',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      link: '/dairy',
    },
  ];

  // Best sellers data
  const bestSellers = [
    {
      id: 1,
      name: 'Fresh Goat Shoulder Curry Cut',
      category: 'Goat Meat',
      weights: [
        { weight: '500g', price: 399, originalPrice: 499 },
        { weight: '1kg', price: 750, originalPrice: 950 }
      ],
      image: 'https://i.pinimg.com/736x/bb/a6/0a/bba60a0307e62e9ceb0073e1b55f752c.jpg',
    },
    {
      id: 2,
      name: 'Fresh Chicken Breast (Boneless)',
      category: 'Chicken',
      weights: [
        { weight: '500g', price: 249, originalPrice: 299 },
        { weight: '1kg', price: 450, originalPrice: 550 }
      ],
      image: 'https://tse2.mm.bing.net/th/id/OIP.3B4SQMFF7BST2jz2UCjrxgHaFu?pid=Api&P=0&h=180',
    },
    {
      id: 3,
      name: 'Fresh Tiger Prawns (Medium)',
      category: 'Seafood',
      weights: [
        { weight: '500g', price: 599, originalPrice: 699 },
        { weight: '1kg', price: 1100, originalPrice: 1300 }
      ],
      image: 'https://images7.alphacoders.com/805/thumb-1920-805972.jpg',
    },
    {
      id: 4,
      name: 'Fresh Cow Milk (Pasteurized)',
      category: 'Dairy',
      weights: [
        { weight: '1L', price: 45, originalPrice: 50 },
        { weight: '2L', price: 85, originalPrice: 95 }
      ],
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 5,
      name: 'Farm Fresh Eggs (Pack of 12)',
      category: 'Dairy',
      weights: [
        { weight: '12 Eggs', price: 80, originalPrice: 90 },
        { weight: '24 Eggs', price: 150, originalPrice: 170 }
      ],
      image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 6,
      name: 'Fresh Mutton Leg Piece',
      category: 'Goat Meat',
      weights: [
        { weight: '500g', price: 499, originalPrice: 599 },
        { weight: '1kg', price: 950, originalPrice: 1150 }
      ],
      image: 'https://i.pinimg.com/736x/bb/a6/0a/bba60a0307e62e9ceb0073e1b55f752c.jpg',
    },
    {
      id: 7,
      name: 'Shrikhand',
      category: 'Dairy',
      weights: [
        { weight: '500ml', price: 140, originalPrice: 150 },
        { weight: '1L', price: 280, originalPrice: 300 }
      ],
      image: 'https://i.pinimg.com/1200x/8e/5c/12/8e5c1250680b38cf4686d455be5eb5e2.jpg',
    },
    {
      id: 8,
      name: 'Fresh Paneer (Cottage Cheese)',
      category: 'Dairy',
      weights: [
        { weight: '250g', price: 120, originalPrice: 135 },
        { weight: '500g', price: 240, originalPrice: 270 }
      ],
      image: 'https://i.pinimg.com/1200x/7b/74/d5/7b74d5aaa9e1b5a039f39da9bf9e55e8.jpg',
    }
  ];

  // Initialize selected weights
  useEffect(() => {
    const initialWeights = {};
    bestSellers.forEach(product => {
      initialWeights[product.id] = product.weights[0];
    });
    setSelectedWeights(initialWeights);
  }, []);

  // Auto-advance hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleWeightSelect = (productId, weight) => {
    const product = bestSellers.find(p => p.id === productId);
    const selectedWeight = product.weights.find(w => w.weight === weight);
    
    setSelectedWeights(prev => ({
      ...prev,
      [productId]: selectedWeight
    }));
  };

  const handleAddToCart = (productId) => {
    const product = bestSellers.find(p => p.id === productId);
    const selectedWeight = selectedWeights[productId];
    
    const cartItem = {
      id: `${productId}-${selectedWeight.weight}`,
      productId,
      name: product.name,
      weight: selectedWeight.weight,
      price: selectedWeight.price,
      originalPrice: selectedWeight.originalPrice,
      image: product.image,
      category: product.category,
      quantity: 1
    };
    
    addToCart(cartItem);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-100 py-10">
          <div className="container mx-auto px-4 relative h-96 rounded-lg overflow-hidden">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentHeroSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="bg-white bg-opacity-90 p-6 rounded-lg max-w-md m-10 shadow-lg">
                  <h2 className="text-2xl font-bold mb-3 text-gray-800">{slide.title}</h2>
                  <p className="mb-4 text-gray-700">{slide.description}</p>
                  <Link
                    to={slide.link}
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded transition"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <TrustBadges />
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Shop by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat, index) => (
                <Link key={index} to={cat.link} className="group relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-end">
                    <div>
                      <h3 className="text-white text-xl font-semibold">{cat.name}</h3>
                      <p className="text-gray-200 text-sm">{cat.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Best Selling Products</h2>
            
            {/* Desktop Grid View */}
            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Weight:</p>
                      <div className="flex space-x-2">
                        {product.weights.map((weightObj, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleWeightSelect(product.id, weightObj.weight)}
                            className={`px-3 py-1 text-sm rounded-full ${selectedWeights[product.id]?.weight === weightObj.weight 
                              ? 'bg-orange-500 text-white' 
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                          >
                            {weightObj.weight}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-orange-500 font-bold text-lg">
                          ₹{selectedWeights[product.id]?.price || product.weights[0].price}
                        </span>
                        <span className="line-through text-gray-400 text-sm">
                          ₹{selectedWeights[product.id]?.originalPrice || product.weights[0].originalPrice}
                        </span>
                      </div>
                      <button 
                        onClick={() => handleAddToCart(product.id)}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Horizontal Scroll */}
            <div className="sm:hidden">
              <div className="flex overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
                {bestSellers.map((product) => (
                  <div key={product.id} className="flex-shrink-0 w-64 mx-2">
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
                      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                      <div className="p-4 flex-grow flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                        
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-1">Weight:</p>
                          <div className="flex space-x-2">
                            {product.weights.map((weightObj, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleWeightSelect(product.id, weightObj.weight)}
                                className={`px-3 py-1 text-sm rounded-full ${selectedWeights[product.id]?.weight === weightObj.weight 
                                  ? 'bg-orange-500 text-white' 
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                              >
                                {weightObj.weight}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-auto">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-orange-500 font-bold text-lg">
                              ₹{selectedWeights[product.id]?.price || product.weights[0].price}
                            </span>
                            <span className="line-through text-gray-400 text-sm">
                              ₹{selectedWeights[product.id]?.originalPrice || product.weights[0].originalPrice}
                            </span>
                          </div>
                          <button 
                            onClick={() => handleAddToCart(product.id)}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded transition"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cart Preview Floating Button */}
        {cartItems.length > 0 && (
          <div 
            className="fixed bottom-6 right-6 bg-orange-500 text-white px-4 py-3 rounded-full shadow-lg flex items-center hover:bg-orange-600 transition-colors cursor-pointer z-40"
            onClick={() => navigate('/cart')}
          >
            <span className="mr-2 font-medium">{cartItems.reduce((sum, item) => sum + item.quantity, 0)} items</span>
            <span className="font-bold">View Cart</span>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;