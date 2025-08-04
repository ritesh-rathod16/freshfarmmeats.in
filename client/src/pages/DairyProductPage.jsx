import { useState } from 'react';
import React from 'react';
import { useCart } from '../components/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import FilterSortBar from '../components/FilterSortBar';

const DairyPage = () => {
  const { addToCart } = useCart();
  const [selectedWeight, setSelectedWeight] = useState({});
  
  const [products] = useState([
    {
      id: 1,
      name: 'Fresh Cow Milk',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      weights: [
        { weight: '500ml', currentPrice: 65, originalPrice: 75 },
        { weight: '1L', currentPrice: 125, originalPrice: 150 }
      ],
      type: 'Milk',
      category: 'Dairy'
    },
    {
      id: 2,
      name: 'Fresh Curd (Dahi)',
      image: 'https://i.pinimg.com/736x/40/dd/9a/40dd9acf75371c3e99bb25da4e21e6ce.jpg',
      weights: [
        { weight: '500g', currentPrice: 40, originalPrice: 45 },
        { weight: '1kg', currentPrice: 80, originalPrice: 90 }
      ],
      type: 'Curd',
      category: 'Dairy'
    },
    {
      id: 3,
      name: 'Fresh Paneer (Cottage Cheese)',
      image: 'https://i.pinimg.com/1200x/7b/74/d5/7b74d5aaa9e1b5a039f39da9bf9e55e8.jpg',
      weights: [
        { weight: '250g', currentPrice: 120, originalPrice: 135 },
        { weight: '500g', currentPrice: 240, originalPrice: 270 }
      ],
      type: 'Paneer',
      category: 'Dairy'
    },
    {
      id: 4,
      name: 'Fresh Butter (Unsalted)',
      image: 'https://i.pinimg.com/1200x/45/98/3e/45983ed3ae0da8759f0e7ed7036eb17e.jpg',
      weights: [
        { weight: '100g', currentPrice: 80, originalPrice: 90 },
        { weight: '250g', currentPrice: 200, originalPrice: 225 }
      ],
      type: 'Butter & Ghee',
      category: 'Dairy'
    },
    {
      id: 5,
      name: 'Fresh Cheese (Cheddar)',
      image: 'https://i.pinimg.com/736x/b9/3b/db/b93bdb25d0078244dd92739b2faf1c81.jpg',
      weights: [
        { weight: '200g', currentPrice: 150, originalPrice: 170 },
        { weight: '400g', currentPrice: 300, originalPrice: 340 }
      ],
      type: 'Cheese',
      category: 'Dairy'
    },
    {
      id: 6,
      name: 'Pure Cow Ghee',
      image: 'https://i.pinimg.com/736x/70/a0/55/70a0551f58193854e53e17354b01e3e5.jpg',
      weights: [
        { weight: '500g', currentPrice: 400, originalPrice: 450 },
        { weight: '1kg', currentPrice: 800, originalPrice: 900 }
      ],
      type: 'Butter & Ghee',
      category: 'Dairy'
    },
    {
      id: 7,
      name: 'Fresh Cream',
      image: 'https://i.pinimg.com/1200x/85/f6/3f/85f63fd988f5f426452f8889e254c707.jpg',
      weights: [
        { weight: '100g', currentPrice: 60, originalPrice: 70 },
        { weight: '200g', currentPrice: 120, originalPrice: 140 }
      ],
      type: 'Cream',
      category: 'Dairy'
    },
    {
      id: 8,
      name: 'Shrikhand',
      image: 'https://i.pinimg.com/1200x/8e/5c/12/8e5c1250680b38cf4686d455be5eb5e2.jpg',
      weights: [
        { weight: '500ml', currentPrice: 140, originalPrice: 150 },
        { weight: '1L', currentPrice: 280, originalPrice: 300 }
      ],
      type: 'Dessert',
      category: 'Dairy'
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Dairy Products
          </h1>
          
          <FilterSortBar 
            filters={['All', 'Milk', 'Curd', 'Paneer', 'Butter & Ghee', 'Cheese', 'Cream', 'Dessert']}
            onFilterChange={handleFilterChange} 
            onSortChange={handleSortChange} 
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

export default DairyPage;