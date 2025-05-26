// Chicken.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Chicken.css';

const chickenItems = [
  { name: 'Grilled Chicken', image: '/images/chicken1.jpg', description: 'Juicy grilled chicken with herbs', rating: 5, price: 249 },
  { name: 'Chicken Curry', image: '/images/chicken2.jpg', description: 'Traditional spicy Indian chicken curry', rating: 4, price: 229 },
  { name: 'Fried Chicken', image: '/images/chicken3.jpg', description: 'Crispy fried chicken with spices', rating: 4, price: 199 },
  { name: 'Butter Chicken', image: '/images/chicken4.jpg', description: 'Creamy butter chicken with naan', rating: 5, price: 259 },
  { name: 'Chicken Biryani', image: '/images/chicken5.jpg', description: 'Aromatic rice with marinated chicken', rating: 5, price: 239 },
  { name: 'Chicken Wrap', image: '/images/chicken6.jpg', description: 'Grilled chicken in a soft tortilla wrap', rating: 3, price: 179 },
];

const Chicken = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  const getQuantity = (name) => {
    const item = cartItems.find(item => item.name === name);
    return item ? item.quantity : 0;
  };

  const filteredItems = chickenItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === 'all' ||
      (ratingFilter === 'low' && item.rating < 4) ||
      (ratingFilter === 'mid' && item.rating >= 4 && item.rating < 5) ||
      (ratingFilter === 'high' && item.rating === 5);
    return matchesSearch && matchesRating;
  });

  return (
    <section className="chicken-section">
      <button className="back-button" onClick={() => navigate('/')}>← Back to Menu</button>
      <h2 className="chicken-title">🍗 Chicken Delights</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search chicken items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="chicken-search"
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

      <div className="chicken-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const quantity = getQuantity(item.name);
            return (
              <div className="chicken-card" key={index}>
                <div className="chicken-left">
                  <div className="chicken-title-row">
                    <h3 className="chicken-name">{item.name}</h3>
                    <span className="chicken-price">₹{item.price}</span>
                  </div>
                  <div className="chicken-rating">⭐ {item.rating}.0 ({item.rating + 4})</div>
                  <p className="chicken-description">{item.description}</p>
                </div>

                <div className="chicken-right">
                  <img src={item.image} alt={item.name} className="chicken-image" />
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
          <p>No chicken dishes found</p>
        )}
      </div>
    </section>
  );
};

export default Chicken;
