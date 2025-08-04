import { FaHeart, FaBox, FaEye } from 'react-icons/fa';
import React from 'react';
const Wishlist = ({ wishlist }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <FaHeart className="mr-2" /> My Wishlist
      </h2>
      
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {wishlist.map(item => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="h-40 bg-gray-100 rounded mb-3 flex items-center justify-center">
                <FaBox className="text-3xl text-gray-400" />
              </div>
              <h3 className="font-medium">{item.name}</h3>
              <div className="flex items-center mt-2">
                <span className="font-semibold">₹{item.price}</span>
                {item.oldPrice && (
                  <span className="ml-2 text-sm text-gray-500 line-through">₹{item.oldPrice}</span>
                )}
              </div>
              <div className="mt-4 flex justify-between">
                <button className="text-sm text-gray-700 hover:text-black flex items-center">
                  <FaEye className="mr-1" /> View
                </button>
                <button className="bg-orange-500 text-white px-3 py-1 rounded text-sm">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FaHeart className="text-5xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mt-2">Save items you like to your wishlist for later</p>
          <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded">
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;