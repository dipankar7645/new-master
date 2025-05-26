// Dosa.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Dosa.css';

const dosaItems = [
  { name: 'Masala Dosa', image: '/images/dosa1.jpg', description: 'Crispy dosa filled with spicy potato masala', rating: 5, price: 99 },
  { name: 'Plain Dosa', image: '/images/dosa2.jpg', description: 'Simple and crispy plain dosa served with chutney', rating: 4, price: 79 },
  { name: 'Cheese Dosa', image: '/images/dosa3.jpg', description: 'Delicious dosa filled with melting cheese', rating: 4, price: 129 },
  { name: 'Onion Rava Dosa', image: '/images/dosa4.jpg', description: 'Rava dosa with chopped onions and spices', rating: 4, price: 119 },
  { name: 'Set Dosa', image: '/images/dosa5.jpg', description: 'Soft fluffy dosas served in a set of 3', rating: 3, price: 89 },
  { name: 'Paneer Dosa', image: '/images/dosa6.jpg', description: 'Dosa stuffed with spiced paneer filling', rating: 5, price: 139 },
];

const Dosa = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  const getQuantity = (name) => {
    const item = cartItems.find(item => item.name === name);
    return item ? item.quantity : 0;
  };

  const filteredItems = dosaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === 'all' ||
      (ratingFilter === 'low' && item.rating < 4) ||
      (ratingFilter === 'mid' && item.rating >= 4 && item.rating < 5) ||
      (ratingFilter === 'high' && item.rating === 5);
    return matchesSearch && matchesRating;
  });

  return (
    <section className="dosa-section">
      <button className="back-button" onClick={() => navigate('/')}>← Back to Menu</button>
      <h2 className="dosa-title">🧇 Dosa Varieties</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search Dosa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="dosa-search"
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

      <div className="dosa-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const quantity = getQuantity(item.name);
            return (
              <div className="dosa-card" key={index}>
                <div className="dosa-left">
                  <div className="dosa-title-row">
                    <h3 className="dosa-name">{item.name}</h3>
                    <span className="dosa-price">₹{item.price}</span>
                  </div>
                  <div className="dosa-rating">⭐ {item.rating}.0 ({item.rating + 3})</div>
                  <p className="dosa-description">{item.description}</p>
                </div>

                <div className="dosa-right">
                  <img src={item.image} alt={item.name} className="dosa-image" />
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
          <p>No dosa items found</p>
        )}
      </div>
    </section>
  );
};

export default Dosa;
