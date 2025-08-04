import { useState } from 'react';
import React from 'react';
import { useCart } from '../components/CartContext';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import FilterSortBar from '../components/FilterSortBar';

const ChickenPage = () => {
  const { addToCart } = useCart();
  const [selectedWeight, setSelectedWeight] = useState({});
  
  const [products] = useState([
    {
      id: 1,
      name: 'Fresh Chicken Breast (Boneless)',
      image: 'https://tse2.mm.bing.net/th/id/OIP.3B4SQMFF7BST2jz2UCjrxgHaFu?pid=Api&P=0&h=180',
      weights: [
        { weight: '500g', currentPrice: 249, originalPrice: 299 },
        { weight: '1kg', currentPrice: 499, originalPrice: 599 }
      ],
      type: 'Boneless',
      category: 'Chicken'
    },
    {
      id: 2,
      name: 'Chicken Curry Cut (With Skin)',
      image: 'https://godavaricuts.com/cdn/shop/files/Godavari-Cuts-Day-1-_60-of-65_1_1a645364-e537-47cf-a978-4c1e7101ed5f_1024x1024.jpg?v=1682943338',
      weights: [
        { weight: '500g', currentPrice: 199, originalPrice: 249 },
        { weight: '1kg', currentPrice: 399, originalPrice: 499 }
      ],
      type: 'Curry Cut',
      category: 'Chicken'
    },
    {
      id: 3,
      name: 'Chicken Thighs (Boneless)',
      image: 'https://st3.depositphotos.com/1465849/15334/i/600/depositphotos_153345458-stock-photo-raw-chicken-thighs.jpg',
      weights: [
        { weight: '500g', currentPrice: 279, originalPrice: 329 },
        { weight: '1kg', currentPrice: 559, originalPrice: 659 }
      ],
      type: 'Boneless',
      category: 'Chicken'
    },
    {
      id: 4,
      name: 'Chicken Drumsticks',
      image: 'https://thumbs.dreamstime.com/b/fresh-chicken-drumsticks-legs-skin-raw-poultry-meat-wooden-background-top-view-fresh-chicken-drumsticks-legs-skin-raw-265973079.jpg',
      weights: [
        { weight: '500g', currentPrice: 229, originalPrice: 279 },
        { weight: '1kg', currentPrice: 459, originalPrice: 559 }
      ],
      type: 'Special Cuts',
      category: 'Chicken'
    },
    {
      id: 5,
      name: 'Chicken Wings',
      image: 'https://e1.pxfuel.com/desktop-wallpaper/109/634/desktop-wallpaper-chicken-wings-raw-chicken.jpg',
      weights: [
        { weight: '500g', currentPrice: 189, originalPrice: 229 },
        { weight: '1kg', currentPrice: 379, originalPrice: 459 }
      ],
      type: 'Special Cuts',
      category: 'Chicken'
    },
    {
      id: 6,
      name: 'Chicken Mince (Keema)',
      image: 'https://m.media-amazon.com/images/I/41QmKZSCYAL.jpg',
      weights: [
        { weight: '500g', currentPrice: 199, originalPrice: 249 },
        { weight: '1kg', currentPrice: 399, originalPrice: 499 }
      ],
      type: 'Special Cuts',
      category: 'Chicken'
    },
    {
      id: 7,
      name: 'Chicken Liver',
      image: 'https://kitchenbun.com/wp-content/uploads/2023/03/raw-chicken-liver.jpg',
      weights: [
        { weight: '500g', currentPrice: 149, originalPrice: 179 },
        { weight: '1kg', currentPrice: 299, originalPrice: 359 }
      ],
      type: 'Special Cuts',
      category: 'Chicken'
    },
    {
      id: 8,
      name: 'Whole Chicken (Skinless)',
      image: 'https://tse2.mm.bing.net/th/id/OIP.3B4SQMFF7BST2jz2UCjrxgHaFu?pid=Api&P=0&h=180',
      weights: [
        { weight: '1kg', currentPrice: 349, originalPrice: 399 },
        { weight: '1.5kg', currentPrice: 499, originalPrice: 599 }
      ],
      type: 'Whole',
      category: 'Chicken'
    }
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleAddToCart = (product) => {
    const selectedWeightObj = selectedWeight[product.id] || product.weights[0];
    const weight = typeof selectedWeightObj === 'object' ? selectedWeightObj.weight : selectedWeightObj;
    const price = typeof selectedWeightObj === 'object' ? selectedWeightObj.currentPrice : product.currentPrice;
    
    const discount = typeof selectedWeightObj === 'object'
      ? Math.round((1 - price / selectedWeightObj.originalPrice) * 100)
      : (product.originalPrice ? Math.round((1 - price / product.originalPrice) * 100) : 0);
    
    const cartItem = {
      ...product,
      weight,
      currentPrice: price,
      originalPrice: typeof selectedWeightObj === 'object' ? selectedWeightObj.originalPrice : product.originalPrice,
      discount
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
            Chicken
          </h1>
          
          <FilterSortBar 
            filters={['All', 'Boneless', 'Curry Cut', 'Special Cuts', 'Whole']}
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

export default ChickenPage;