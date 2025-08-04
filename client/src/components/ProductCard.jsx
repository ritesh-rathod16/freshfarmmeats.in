import React from "react";

const ProductCard = ({ product, onAddToCart, onWeightChange, selectedWeight }) => {
  // Calculate price based on selected weight
  const getCurrentPrice = () => {
    if (typeof product.weights[0] === 'object') {
      const weightObj = product.weights.find(w => w.weight === selectedWeight);
      return weightObj ? weightObj.currentPrice : product.currentPrice;
    }
    return product.currentPrice;
  };

  const getOriginalPrice = () => {
    if (typeof product.weights[0] === 'object') {
      const weightObj = product.weights.find(w => w.weight === selectedWeight);
      return weightObj ? weightObj.originalPrice : product.originalPrice;
    }
    return product.originalPrice;
  };

  const currentPrice = getCurrentPrice();
  const originalPrice = getOriginalPrice();
  const discount = originalPrice ? Math.round((1 - currentPrice / originalPrice) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Product image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x200?text=Product+Image";
          }}
        />
      </div>
      
      {/* Product details */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg mb-2 text-gray-800">{product.name}</h3>
        
        {/* Price display */}
        <div className="flex items-center mb-3">
          <span className="text-lg font-bold text-gray-900">₹{currentPrice}</span>
          {originalPrice && originalPrice > currentPrice && (
            <>
              <span className="ml-2 text-sm text-gray-500 line-through">₹{originalPrice}</span>
              <span className="ml-2 text-sm font-medium text-green-600">{discount}% OFF</span>
            </>
          )}
        </div>
        
        {/* Weight selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
          <div className="flex flex-wrap gap-2">
            {product.weights.map((weightObj) => {
              const weight = typeof weightObj === 'object' ? weightObj.weight : weightObj;
              return (
                <button
                  key={weight}
                  className={`px-3 py-1 text-sm rounded-full border ${
                    selectedWeight === weight
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
                  }`}
                  onClick={() => onWeightChange(weight)}
                >
                  {weight}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Add to cart button - aligned at bottom */}
        <div className="mt-auto">
          <button
            onClick={onAddToCart}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;