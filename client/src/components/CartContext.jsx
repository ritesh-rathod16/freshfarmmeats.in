// src/components/CartContext.js
import { createContext, useContext, useState } from 'react';
import React from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (product, weight) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id === product.id && item.weight === weight
      );
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.weight === weight
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            image: product.image,
            weight: weight,
            price: product.currentPrice,
            quantity: 1,
            category: product.type || product.category || 'General'
          }
        ];
      }
    });
    setCartCount(prev => prev + 1);
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === id);
      if (itemToRemove) {
        setCartCount(prev => prev - itemToRemove.quantity);
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === id) {
          const quantityDiff = newQuantity - item.quantity;
          setCartCount(prev => prev + quantityDiff);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,  // This is named removeFromCart in the provider
        updateQuantity,  // This is named updateQuantity in the provider
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);