import React, { useState } from 'react';
import { useCart } from '../components/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import FilterSortBar from '../components/FilterSortBar';

const GoatMeatPage = () => {
  const { addToCart } = useCart();
  const [selectedWeight, setSelectedWeight] = useState({});
  
  const [products] = useState([
    {
      id: 1,
      name: 'Premium Goat Shoulder Curry Cut',
      image: 'https://i.pinimg.com/736x/bb/a6/0a/bba60a0307e62e9ceb0073e1b55f752c.jpg',
      weights: [
        { weight: '500g', currentPrice: 200, originalPrice: 250 },
        { weight: '1kg', currentPrice: 399, originalPrice: 499 }
      ],
      type: 'Curry Cuts',
      category: 'Goat Meat'
    },
    {
      id: 2,
      name: 'Goat Leg Curry Cut',
      image: 'https://i.pinimg.com/736x/bb/a6/0a/bba60a0307e62e9ceb0073e1b55f752c.jpg',
      weights: [
        { weight: '500g', currentPrice: 215, originalPrice: 250 },
        { weight: '1kg', currentPrice: 429, originalPrice: 499 }
      ],
      type: 'Curry Cuts',
      category: 'Goat Meat'
    },
    {
      id: 3,
      name: 'Goat Boneless Cubes',
      image: 'https://5.imimg.com/data5/ANDROID/Default/2022/12/ID/SN/GQ/149432295/product-jpeg-500x500.jpg',
      weights: [
        { weight: '500g', currentPrice: 499, originalPrice: 599 },
        { weight: '1kg', currentPrice: 999, originalPrice: 1199 }
      ],
      type: 'Boneless',
      category: 'Goat Meat'
    },
    {
      id: 4,
      name: 'Goat Ribs',
      image: 'https://i.pinimg.com/736x/bb/a6/0a/bba60a0307e62e9ceb0073e1b55f752c.jpg',
      weights: [
        { weight: '500g', currentPrice: 379, originalPrice: 449 },
        { weight: '1kg', currentPrice: 749, originalPrice: 899 }
      ],
      type: 'Special Cuts',
      category: 'Goat Meat'
    },
    {
      id: 5,
      name: 'Goat Liver',
      image: 'https://s3.amazonaws.com/grazecart/millersbiodiversityfarm/images/1584881954_5e7761229b2ec.jpg',
      weights: [
        { weight: '500g', currentPrice: 299, originalPrice: 349 },
        { weight: '1kg', currentPrice: 599, originalPrice: 699 }
      ],
      type: 'Special Cuts',
      category: 'Goat Meat'
    },
    {
      id: 6,
      name: 'Goat Biryani Cut',
      image: 'https://s3.ap-south-1.amazonaws.com/diingdong/1602655552_170a1ef7-96e8-405e-983c-fba94e5d8e5c.jpg',
      weights: [
        { weight: '500g', currentPrice: 230, originalPrice: 275 },
        { weight: '1kg', currentPrice: 459, originalPrice: 549 }
      ],
      type: 'Special Cuts',
      category: 'Goat Meat'
    },
    {
      id: 7,
      name: 'Goat Curry Cut Mix',
      image: 'https://s3.ap-south-1.amazonaws.com/diingdong/1602655552_170a1ef7-96e8-405e-983c-fba94e5d8e5c.jpg',
      weights: [
        { weight: '500g', currentPrice: 195, originalPrice: 225 },
        { weight: '1kg', currentPrice: 389, originalPrice: 449 }
      ],
      type: 'Curry Cuts',
      category: 'Goat Meat'
    },
    {
      id: 8,
      name: 'Whole Goat Leg',
      image: 'https://i.pinimg.com/736x/bb/a6/0a/bba60a0307e62e9ceb0073e1b55f752c.jpg',
      weights: [
        { weight: '2kg', currentPrice: 899, originalPrice: 999 },
        { weight: '3kg', currentPrice: 1349, originalPrice: 1499 }
      ],
      type: 'Special Cuts',
      category: 'Goat Meat'
    }
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleAddToCart = (product) => {
    const selectedWeightObj = selectedWeight[product.id] || product.weights[0];
    const weight = typeof selectedWeightObj === 'object' ? selectedWeightObj.weight : selectedWeightObj;
    const price = typeof selectedWeightObj === 'object' ? selectedWeightObj.currentPrice : product.currentPrice;
    
    const cartItem = {
      ...product,
      weight,
      currentPrice: price,
      originalPrice: typeof selectedWeightObj === 'object' ? selectedWeightObj.originalPrice : product.originalPrice,
      discount: typeof selectedWeightObj === 'object' 
        ? Math.round((1 - price / selectedWeightObj.originalPrice) * 100)
        : product.originalPrice ? Math.round((1 - price / product.originalPrice) * 100) : 0
    };
    
    addToCart(cartItem);
  };

  const handleWeightChange = (productId, weight) => {
    setSelectedWeight(prev => ({
      ...prev,
      [productId]: weight
    }));
  };

  const handleFilterChange = (filter) => {
    setFilteredProducts(filter === 'All' ? products : products.filter(p => p.type === filter));
  };

  const handleSortChange = (sortValue) => {
    let sorted = [...filteredProducts];
    switch (sortValue) {
      case 'price-low': 
        sorted.sort((a, b) => {
          const aSelected = selectedWeight[a.id] || a.weights[0];
          const bSelected = selectedWeight[b.id] || b.weights[0];
          const aPrice = typeof aSelected === 'object' ? aSelected.currentPrice : a.currentPrice;
          const bPrice = typeof bSelected === 'object' ? bSelected.currentPrice : b.currentPrice;
          return aPrice - bPrice;
        }); 
        break;
      case 'price-high': 
        sorted.sort((a, b) => {
          const aSelected = selectedWeight[a.id] || a.weights[0];
          const bSelected = selectedWeight[b.id] || b.weights[0];
          const aPrice = typeof aSelected === 'object' ? aSelected.currentPrice : a.currentPrice;
          const bPrice = typeof bSelected === 'object' ? bSelected.currentPrice : b.currentPrice;
          return bPrice - aPrice;
        }); 
        break;
      case 'newest': sorted.sort((a, b) => b.id - a.id); break;
      default: break;
    }
    setFilteredProducts(sorted);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Premium Goat Meat
          </h1>
          
          <FilterSortBar 
            filters={['All', 'Curry Cuts', 'Boneless', 'Special Cuts']}
            onFilterChange={handleFilterChange} 
            onSortChange={handleSortChange} 
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {filteredProducts.map(product => {
              const selectedWeightForProduct = selectedWeight[product.id] || 
                (typeof product.weights[0] === 'object' ? product.weights[0].weight : product.weights[0]);
              
              return (
                <ProductCard 
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                  selectedWeight={selectedWeightForProduct}
                  onWeightChange={(weight) => handleWeightChange(product.id, weight)}
                />
              );
            })}
          </div>
        </div>
      </main>
      
    
    </div>
  );
};

export default GoatMeatPage;