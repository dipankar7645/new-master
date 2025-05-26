import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './VadaPav.css';

const vadaPavItems = [
  {
    name: 'Classic Vada Pav',
    image: '/images/vadapav1.jpg',
    description: 'Spicy potato fritter sandwiched between soft pav with chutneys.',
    rating: 5,
    price: 40,
  },
  {
    name: 'Cheese Vada Pav',
    image: '/images/vadapav2.jpg',
    description: 'Classic vada pav topped with melted cheese and green chutney.',
    rating: 4,
    price: 60,
  },
  {
    name: 'Paneer Vada Pav',
    image: '/images/vadapav3.jpg',
    description: 'Paneer stuffed vada pav with tangy and spicy masala.',
    rating: 4,
    price: 65,
  },
  {
    name: 'Jain Vada Pav',
    image: '/images/vadapav4.jpg',
    description: 'No garlic and onion, traditional Jain-style vada pav.',
    rating: 3,
    price: 50,
  },
  {
    name: 'Chili Vada Pav',
    image: '/images/vadapav5.jpg',
    description: 'Spicy chili chutney layered with vada pav for heat lovers.',
    rating: 5,
    price: 55,
  },
];

const VadaPav = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  const getQuantity = (name) => {
    const item = cartItems.find((item) => item.name === name);
    return item ? item.quantity : 0;
  };

  const filteredItems = vadaPavItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === 'all' ||
      (ratingFilter === 'low' && item.rating < 4) ||
      (ratingFilter === 'mid' && item.rating >= 4 && item.rating < 5) ||
      (ratingFilter === 'high' && item.rating === 5);
    return matchesSearch && matchesRating;
  });

  return (
    <section className="vadapav-section">
      <button className="back-button" onClick={() => navigate('/')}>← Back to Menu</button>
      <h2 className="vadapav-title">🥔 Vada Pav Delights</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search Vada Pav..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="rating-filter">
          {['all', 'low', 'mid', 'high'].map((level) => (
            <button
              key={level}
              onClick={() => setRatingFilter(level)}
              className={ratingFilter === level ? 'active' : ''}
            >
              {level === 'all'
                ? 'All Ratings'
                : level === 'low'
                ? '< 4 Stars'
                : level === 'mid'
                ? '4 to <5 Stars'
                : '5 Stars'}
            </button>
          ))}
        </div>
      </div>

      <div className="vadapav-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const quantity = getQuantity(item.name);
            return (
              <div className="vadapav-card" key={index}>
                <div className="vadapav-left">
                  <div className="vadapav-title-row">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Vegetarian_symbol.svg/1024px-Vegetarian_symbol.svg.png"
                      alt="veg"
                      className="veg-icon"
                    />
                    <h3 className="vadapav-name">{item.name}</h3>
                    <span className="vadapav-price">₹{item.price}</span>
                  </div>
                  <div className="vadapav-rating">⭐ {item.rating}.0 ({item.rating + 2})</div>
                  <p className="vadapav-description">{item.description}</p>
                </div>

                <div className="vadapav-right">
                  <img src={item.image} alt={item.name} className="vadapav-image" />
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
          <p>No Vada Pavs found</p>
        )}
      </div>
    </section>
  );
};

export default VadaPav;
