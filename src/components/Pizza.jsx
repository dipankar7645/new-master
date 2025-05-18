// Pizza.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import this
import { useCart } from './CartContext';
import './Pizza.css';

const pizzaTypes = [
  { name: 'Margherita', image: '/images/pizza1.jpg', description: 'Classic cheese & tomato', rating: 4, price: 199 },
  { name: 'Pepperoni', image: '/images/pizza2.jpg', description: 'Spicy pepperoni with mozzarella', rating: 5, price: 249 },
  { name: 'Veggie Supreme', image: '/images/pizza3.jpg', description: 'Loaded with veggies and cheese', rating: 4, price: 229 },
  { name: 'Paneer Tikka', image: '/images/pizza4.jpg', description: 'Spiced paneer with onions & capsicum', rating: 5, price: 259 },
  { name: 'Paneer Tandoori', image: '/images/pizza5.jpg', description: 'Tandoori paneer with herbs', rating: 4, price: 279 },
  { name: 'Chicken Crust', image: '/images/pizza6.jpg', description: 'Cheesy chicken crust delight', rating: 5, price: 289 },
  { name: 'Onion Paneer', image: '/images/pizza7.jpg', description: 'Onions, paneer & cheese burst', rating: 4, price: 239 },
];

const Pizza = () => {
  const navigate = useNavigate(); // Use this hook for navigation
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const getPizzaQuantity = (pizzaName) => {
    const item = cartItems.find(item => item.name === pizzaName);
    return item ? item.quantity : 0;
  };

  return (
    <section className="pizza-section">
      <button className="back-button" onClick={() => navigate('/')}>← Back to Menu</button>
      <h2 className="pizza-title">🍕 Pizza Varieties</h2>
      <div className="pizza-list">
        {pizzaTypes.map((pizza, index) => {
          const quantity = getPizzaQuantity(pizza.name);
          return (
            <div className="pizza-card" key={index}>
              <div className="pizza-left">
                <div className="pizza-title-row">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/2048px-Veg_symbol.svg.png"
                    alt="veg"
                    className="veg-icon"
                  />
                  <h3 className="pizza-name">{pizza.name}</h3>
                  <span className="pizza-price">₹{pizza.price}</span>
                </div>
                <div className="pizza-rating">⭐ {pizza.rating}.0 ({pizza.rating + 3})</div>
                <p className="pizza-description">Now in 3 New Flavours - {pizza.description}</p>
              </div>

              <div className="pizza-right">
                <img src={pizza.image} alt={pizza.name} className="pizza-image" />
                {quantity === 0 ? (
                  <button className="add-button" onClick={() => addToCart(pizza)}>ADD</button>
                ) : (
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(pizza.name)} className="quantity-button">−</button>
                    <span className="quantity-count">{quantity}</span>
                    <button onClick={() => increaseQuantity(pizza.name)} className="quantity-button">+</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Pizza;
