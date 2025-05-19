import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  const getPizzaQuantity = (pizzaName) => {
    const item = cartItems.find(item => item.name === pizzaName);
    return item ? item.quantity : 0;
  };

  const filteredPizzas = pizzaTypes.filter(pizza => {
    const matchesSearch = pizza.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === 'all' ||
      (ratingFilter === 'low' && pizza.rating < 4) ||
      (ratingFilter === 'mid' && pizza.rating >= 4 && pizza.rating < 5) ||
      (ratingFilter === 'high' && pizza.rating === 5);
    return matchesSearch && matchesRating;
  });

  return (
    <section className="pizza-section">
      <button className="back-button" onClick={() => navigate('/')}>← Back to Menu</button>
      <h2 className="pizza-title">🍕 Pizza Varieties</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search pizzas by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pizza-search"
        />

        <div className="rating-filter">
          {['all', 'low', 'mid', 'high'].map(level => (
            <button
              key={level}
              onClick={() => setRatingFilter(level)}
              className={ratingFilter === level ? 'active' : ''}
            >
              {level === 'all' ? 'All Ratings' : level === 'low' ? '< 4 Stars' : level === 'mid' ? '4 to <5 Stars' : '5 Stars'}
            </button>
          ))}
        </div>
      </div>

      <div className="pizza-list">
        {filteredPizzas.length > 0 ? (
          filteredPizzas.map((pizza, index) => {
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
          })
        ) : (
          <p>No pizzas found</p>
        )}
      </div>
    </section>
  );
};

export default Pizza;
