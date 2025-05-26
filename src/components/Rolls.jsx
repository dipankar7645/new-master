// Rolls.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Rolls.css';

const rollItems = [
  { name: 'Paneer Roll', image: '/images/roll1.jpg', description: 'Stuffed with spiced paneer and veggies', rating: 5, price: 99 },
  { name: 'Veggie Delight Roll', image: '/images/roll2.jpg', description: 'Mixed veggies rolled in soft roti', rating: 4, price: 89 },
  { name: 'Egg Roll', image: '/images/roll3.jpg', description: 'Classic egg roll with onions and chutney', rating: 5, price: 79 },
  { name: 'Chicken Roll', image: '/images/roll4.jpg', description: 'Juicy chicken chunks in a spicy wrap', rating: 4, price: 119 },
  { name: 'Cheese Corn Roll', image: '/images/roll5.jpg', description: 'Creamy cheese and sweet corn wrapped in roll', rating: 3, price: 109 },
  { name: 'Spicy Soya Roll', image: '/images/roll6.jpg', description: 'Protein-packed spicy soya stuffing', rating: 4, price: 99 },
];

const Rolls = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  const getQuantity = (name) => {
    const item = cartItems.find(item => item.name === name);
    return item ? item.quantity : 0;
  };

  const filteredItems = rollItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === 'all' ||
      (ratingFilter === 'low' && item.rating < 4) ||
      (ratingFilter === 'mid' && item.rating >= 4 && item.rating < 5) ||
      (ratingFilter === 'high' && item.rating === 5);
    return matchesSearch && matchesRating;
  });

  return (
    <section className="rolls-section">
      <button className="back-button" onClick={() => navigate('/')}>← Back to Menu</button>
      <h2 className="rolls-title">🌯 Rolls & Wraps</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search Rolls..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rolls-search"
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

      <div className="rolls-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const quantity = getQuantity(item.name);
            return (
              <div className="rolls-card" key={index}>
                <div className="rolls-left">
                  <div className="rolls-title-row">
                    <h3 className="rolls-name">{item.name}</h3>
                    <span className="rolls-price">₹{item.price}</span>
                  </div>
                  <div className="rolls-rating">⭐ {item.rating}.0 ({item.rating + 3})</div>
                  <p className="rolls-description">{item.description}</p>
                </div>

                <div className="rolls-right">
                  <img src={item.image} alt={item.name} className="rolls-image" />
                  {quantity === 0 ? (
                    <button className="add-button" onClick={() => addToCart(item)}>ADD</button>
                  ) : (
                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(item.name)} className="quantity-button">−</button>
                      <span className="quantity-count">{quantity}</span>
                      <button onClick={() => increaseQuantity(item.name)} className="quantity-button">+</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p>No roll items found</p>
        )}
      </div>
    </section>
  );
};

export default Rolls;
