// Thali.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Thali.css';

const thaliItems = [
  { name: 'North Indian Thali', image: '/Thali/thali1.jpg', description: 'Includes dal, roti, rice, sabzi, and sweets', rating: 5, price: 199 },
  { name: 'South Indian Thali', image: '/Thali/thali2.jpg', description: 'Includes rice, sambhar, rasam, papad, and pickle', rating: 4, price: 189 },
  { name: 'Gujarati Thali', image: '/Thali/thali3.jpg', description: 'Sweet and savory dishes like dhokla, kadhi, thepla', rating: 4, price: 179 },
  { name: 'Rajasthani Thali', image: '/Thali/thali4.jpg', description: 'Gatte ki sabzi, dal baati, churma and more', rating: 5, price: 209 },
  { name: 'Bengali Thali', image: '/Thali/thali5.jpg', description: 'Fish curry, rice, shukto, chutney and sweet', rating: 3, price: 199 },
  { name: 'Mini Thali', image: '/Thali/thali6.jpg', description: 'Compact thali with essentials - dal, rice, roti', rating: 3, price: 129 },
];

const Thali = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  const getQuantity = (name) => {
    const item = cartItems.find(item => item.name === name);
    return item ? item.quantity : 0;
  };

  const filteredItems = thaliItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === 'all' ||
      (ratingFilter === 'low' && item.rating < 4) ||
      (ratingFilter === 'mid' && item.rating >= 4 && item.rating < 5) ||
      (ratingFilter === 'high' && item.rating === 5);
    return matchesSearch && matchesRating;
  });

  return (
    <section className="thali-section">
      <button className="back-button" onClick={() => navigate('/')}>← Back to Menu</button>
      <h2 className="thali-title">🍱 Indian Thali Varieties</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search thali..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="thali-search"
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

      <div className="thali-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const quantity = getQuantity(item.name);
            return (
              <div className="thali-card" key={index}>
                <div className="thali-left">
                  <div className="thali-title-row">
                    <h3 className="thali-name">{item.name}</h3>
                    <span className="thali-price">₹{item.price}</span>
                  </div>
                  <div className="thali-rating">⭐ {item.rating}.0 ({item.rating + 4})</div>
                  <p className="thali-description">{item.description}</p>
                </div>

                <div className="thali-right">
                  <img src={item.image} alt={item.name} className="thali-image" />
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
          <p>No thali items found</p>
        )}
      </div>
    </section>
  );
};

export default Thali;
