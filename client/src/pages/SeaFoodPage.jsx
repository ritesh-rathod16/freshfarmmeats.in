import { useState } from 'react';
import React from 'react';
import { useCart } from '../components/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import FilterSortBar from '../components/FilterSortBar';

const SeafoodPage = () => {
  const { addToCart } = useCart();
  const [selectedWeight, setSelectedWeight] = useState({});
  
  const [products] = useState([
    {
      id: 1,
      name: 'Salmon Fillets',
      image: 'https://thumbs.dreamstime.com/b/raw-salmon-fish-whole-ingredients-cookings-black-salmon-fish-raw-salmon-fish-whole-ingredients-cookings-133501392.jpg',
      weights: [
        { weight: '250g', currentPrice: 799, originalPrice: 849 },
        { weight: '500g', currentPrice: 1599, originalPrice: 1699 }
      ],
      type: 'fish',
      category: 'Seafood'
    },
    {
      id: 2,
      name: 'Fresh Rohu Fish (Whole)',
      image: 'https://cdn.shopify.com/s/files/1/0153/6960/1088/products/ROHU-1_1366x911.jpg?v=1593143791',
      weights: [
        { weight: '500g', currentPrice: 299, originalPrice: 349 },
        { weight: '1kg', currentPrice: 599, originalPrice: 699 }
      ],
      type: 'fish',
      category: 'Seafood'
    },
    {
      id: 3,
      name: 'Prawns (Medium, Cleaned)',
      image: 'https://images7.alphacoders.com/805/thumb-1920-805972.jpg',
      weights: [
        { weight: '250g', currentPrice: 399, originalPrice: 449 },
        { weight: '500g', currentPrice: 799, originalPrice: 899 }
      ],
      type: 'prawns',
      category: 'Seafood'
    },
    {
      id: 4,
      name: 'Crab (Live, Medium)',
      image: 'https://www.maangchi.com/wp-content/uploads/2013/07/bluecrabs_cleaned.jpg',
      weights: [
        { weight: '1pc (approx 300g)', currentPrice: 349, originalPrice: 399 },
        { weight: '2pcs', currentPrice: 699, originalPrice: 799 }
      ],
      type: 'crab',
      category: 'Seafood'
    },
    {
      id: 5,
      name: 'Squid (Cleaned)',
      image: 'https://cdn.shopify.com/s/files/1/2264/3783/products/20180208_110327_1024x1024.jpg?v=1519240643',
      weights: [
        { weight: '250g', currentPrice: 279, originalPrice: 329 },
        { weight: '500g', currentPrice: 559, originalPrice: 659 }
      ],
      type: 'other',
      category: 'Seafood'
    },
    {
      id: 6,
      name: 'Pomfret Fish (White, Whole)',
      image: 'https://st4.depositphotos.com/6782220/22720/i/450/depositphotos_227205256-stock-photo-fresh-pomfret-table.jpg',
      weights: [
        { weight: '1pc (approx 300g)', currentPrice: 499, originalPrice: 549 },
        { weight: '2pcs', currentPrice: 999, originalPrice: 1099 }
      ],
      type: 'fish',
      category: 'Seafood'
    },
    {
      id: 7,
      name: 'Tiger Prawns (Jumbo)',
      image: 'https://img3.exportersindia.com/product_images/bc-full/2019/4/5264049/tiger-prawns-jumbo-1554285387-4367706.jpg',
      weights: [
        { weight: '250g', currentPrice: 599, originalPrice: 649 },
        { weight: '500g', currentPrice: 1199, originalPrice: 1299 }
      ],
      type: 'prawns',
      category: 'Seafood'
    },
    {
      id: 8,
      name: 'Mirgal Fish (Fresh)',
      image: 'https://sakyfoods.com/wp-content/uploads/2022/12/rohu-fish-Who-round-scaled.jpg',
      weights: [
        { weight: '500g', currentPrice: 199, originalPrice: 249 },
        { weight: '1kg', currentPrice: 399, originalPrice: 499 }
      ],
      type: 'fish',
      category: 'Seafood'
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
    setFilteredProducts(filter === 'All' ? products : products.filter(p => p.type === filter.toLowerCase()));
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
            Fresh Seafood
          </h1>
          
          <FilterSortBar 
            filters={['All', 'Fish', 'Prawns', 'Crab', 'Other']}
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

export default SeafoodPage;