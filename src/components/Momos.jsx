// Momos.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Momos.css';

const momoItems = [
  { name: 'Veg Steamed Momos', image: '/images/momo1.jpg', description: 'Steamed dumplings filled with fresh vegetables', rating: 4, price: 80 },
  { name: 'Chicken Fried Momos', image: '/images/momo2.jpg', description: 'Crispy fried momos stuffed with juicy chicken', rating: 5, price: 120 },
  { name: 'Paneer Tandoori Momos', image: '/images/momo3.jpg', description: 'Tandoori grilled momos with paneer filling', rating: 5, price: 130 },
  { name: 'Veg Cheese Momos', image: '/images/momo4.jpg', description: 'Steamed momos with a cheesy vegetable filling', rating: 4, price: 100 },
  { name: 'Spicy Chicken Momos', image: '/images/momo5.jpg', description: 'Hot and spicy chicken momos for the brave', rating: 5, price: 125 },
  { name: 'Corn & Cheese Momos', image: '/images/momo6.jpg', description: 'Delicious combination of corn and cheese in momos', rating: 4, price: 110 },
];

const Momos = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  const getQuantity = (name) => {
    const item = cartItems.find(item => item.name === name);
    return item ? item.quantity : 0;
  };

  const filteredItems = momoItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === 'all' ||
      (ratingFilter === 'low' && item.rating < 4) ||
      (ratingFilter === 'mid' && item.rating >= 4 && item.rating < 5) ||
      (ratingFilter === 'high' && item.rating === 5);
    return matchesSearch && matchesRating;
  });

  return (
    <section className="momo-section">
      <button className="back-button" onClick={() => navigate('/')}>← Back to Menu</button>
      <h2 className="momo-title">🥟 Momos</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search Momos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="momo-search"
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

      <div className="momo-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const quantity = getQuantity(item.name);
            return (
              <div className="momo-card" key={index}>
                <div className="momo-left">
                  <div className="momo-title-row">
                    <h3 className="momo-name">{item.name}</h3>
                    <span className="momo-price">₹{item.price}</span>
                  </div>
                  <div className="momo-rating">⭐ {item.rating}.0 ({item.rating + 3})</div>
                  <p className="momo-description">{item.description}</p>
                </div>

                <div className="momo-right">
                  <img src={item.image} alt={item.name} className="momo-image" />
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
          <p>No momos found</p>
        )}
      </div>
    </section>
  );
};

export default Momos;
