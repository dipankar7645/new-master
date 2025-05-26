// FriedRice.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './FriedRice.css';

const friedRiceItems = [
  { name: 'Veg Fried Rice', image: '/images/friedrice1.jpg', description: 'Classic mixed vegetable fried rice', rating: 4, price: 129 },
  { name: 'Egg Fried Rice', image: '/images/friedrice2.jpg', description: 'Stir-fried rice with scrambled egg and veggies', rating: 5, price: 149 },
  { name: 'Chicken Fried Rice', image: '/images/friedrice3.jpg', description: 'Loaded with chicken chunks and Chinese flavor', rating: 5, price: 159 },
  { name: 'Schezwan Fried Rice', image: '/images/friedrice4.jpg', description: 'Spicy Indo-Chinese rice with schezwan sauce', rating: 4, price: 139 },
  { name: 'Paneer Fried Rice', image: '/images/friedrice5.jpg', description: 'Paneer cubes tossed with rice and veggies', rating: 3, price: 149 },
  { name: 'Triple Fried Rice', image: '/images/friedrice6.jpg', description: 'Rice with gravy, noodles, and toppings combo', rating: 5, price: 179 },
];

const FriedRice = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  const getQuantity = (name) => {
    const item = cartItems.find(item => item.name === name);
    return item ? item.quantity : 0;
  };

  const filteredItems = friedRiceItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === 'all' ||
      (ratingFilter === 'low' && item.rating < 4) ||
      (ratingFilter === 'mid' && item.rating >= 4 && item.rating < 5) ||
      (ratingFilter === 'high' && item.rating === 5);
    return matchesSearch && matchesRating;
  });

  return (
    <section className="friedrice-section">
      <button className="back-button" onClick={() => navigate('/')}>← Back to Menu</button>
      <h2 className="friedrice-title">🍚 Fried Rice Specials</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search rice..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="friedrice-search"
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

      <div className="friedrice-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const quantity = getQuantity(item.name);
            return (
              <div className="friedrice-card" key={index}>
                <div className="friedrice-left">
                  <div className="friedrice-title-row">
                    <h3 className="friedrice-name">{item.name}</h3>
                    <span className="friedrice-price">₹{item.price}</span>
                  </div>
                  <div className="friedrice-rating">⭐ {item.rating}.0 ({item.rating + 4})</div>
                  <p className="friedrice-description">{item.description}</p>
                </div>

                <div className="friedrice-right">
                  <img src={item.image} alt={item.name} className="friedrice-image" />
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
          <p>No fried rice items found</p>
        )}
      </div>
    </section>
  );
};

export default FriedRice;
