// CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (pizza) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.name === pizza.name);
      if (existingItem) {
        return prevItems.map(item =>
          item.name === pizza.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...pizza, quantity: 1 }];
      }
    });
  };

  const increaseQuantity = (pizzaName) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.name === pizzaName ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (pizzaName) => {
    setCartItems(prevItems =>
      prevItems
        .map(item =>
          item.name === pizzaName ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (pizzaName) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.name !== pizzaName)
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
