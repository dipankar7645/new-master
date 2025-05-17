import React from 'react';
import { useCart } from './CartContext';
import './Pizza.css';

// Sample pizza data
const pizzaTypes = [
  { name: 'Margherita', image: '/images/pizza1.jpg', description: 'Classic cheese & tomato', rating: 4, price: 199 },
  { name: 'Pepperoni', image: '/images/pizza2.jpg', description: 'Spicy pepperoni with mozzarella', rating: 5, price: 249 },
  { name: 'Veggie Supreme', image: '/images/pizza3.jpg', description: 'Loaded with veggies and cheese', rating: 4, price: 229 },
  { name: 'Paneer Tikka', image: '/images/pizza4.jpg', description: 'Spiced paneer with onions & capsicum', rating: 5, price: 259 },
  { name: 'Paneer Tandoori', image: '/images/pizza5.jpg', description: 'Tandoori paneer with herbs', rating: 4, price: 279 },
  { name: 'Chicken Crust', image: '/images/pizza6.jpg', description: 'Cheesy chicken crust delight', rating: 5, price: 289 },
  { name: 'Onion Paneer', image: '/images/pizza7.jpg', description: 'Onions, paneer & cheese burst', rating: 4, price: 239 },
];

// Function to render stars
const renderStars = (rating) => {
  return (
    <span>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  );
};

const Pizza = ({ onClose }) => {
  const { addToCart } = useCart();

  const handleBuyNow = (pizza) => {
    addToCart(pizza);
    alert(`${pizza.name} added to cart`);
  };

  return (
    <section className="pizza-section">
      <button className="back-button" onClick={onClose}>← Back to Menu</button>
      <h2 className="pizza-title">🍕 Pizza Varieties</h2>
      <div className="pizza-list">
        {pizzaTypes.map((pizza, index) => (
          <div className="pizza-card" key={index}>
            <img src={pizza.image} alt={pizza.name} className="pizza-image" />
            <h3 className="pizza-name">{pizza.name}</h3>
            <p className="pizza-description">{pizza.description}</p>
            <div className="pizza-rating">{renderStars(pizza.rating)}</div>
            <p className="pizza-price">₹{pizza.price}</p>
            <button className="buy-now-button" onClick={() => handleBuyNow(pizza)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pizza;
