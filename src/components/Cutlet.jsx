import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Cutlet.css';

const cutletItems = [
  {
    name: 'Veg Cutlet',
    image: '/images/cutlet1.jpg',
    description: 'Crispy and spicy mixed vegetable cutlets, perfect as snacks.',
    rating: 4,
    price: 70,
  },
  {
    name: 'Chicken Cutlet',
    image: '/images/cutlet2.jpg',
    description: 'Juicy chicken mince flavored with herbs and spices, fried to perfection.',
    rating: 5,
    price: 90,
  },
  {
    name: 'Paneer Cutlet',
    image: '/images/cutlet3.jpg',
    description: 'Soft paneer mixed with peas and spices, lightly fried.',
    rating: 4,
    price: 85,
  },
  {
    name: 'Fish Cutlet',
    image: '/images/cutlet4.jpg',
    description: 'Delicious fish mince combined with aromatic spices, crispy outside.',
    rating: 5,
    price: 95,
  },
  {
    name: 'Aloo Cutlet',
    image: '/images/cutlet5.jpg',
    description: 'Mashed potatoes mixed with herbs and fried golden brown.',
    rating: 3,
    price: 60,
  },
];

const Cutlet = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  const getQuantity = (name) => {
    const item = cartItems.find((item) => item.name === name);
    return item ? item.quantity : 0;
  };

  const filteredItems = cutletItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === 'all' ||
      (ratingFilter === 'low' && item.rating < 4) ||
      (ratingFilter === 'mid' && item.rating >= 4 && item.rating < 5) ||
      (ratingFilter === 'high' && item.rating === 5);
    return matchesSearch && matchesRating;
  });

  return (
    <section className="cutlet-section">
      <button className="back-button" onClick={() => navigate('/')}>← Back to Menu</button>
      <h2 className="cutlet-title">🍽️ Cutlets & Snacks</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search Cutlets..."
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

      <div className="cutlet-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const quantity = getQuantity(item.name);
            return (
              <div className="cutlet-card" key={index}>
                <div className="cutlet-left">
                  <div className="cutlet-title-row">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Vegetarian_symbol.svg/1024px-Vegetarian_symbol.svg.png"
                      alt="veg"
                      className="veg-icon"
                    />
                    <h3 className="cutlet-name">{item.name}</h3>
                    <span className="cutlet-price">₹{item.price}</span>
                  </div>
                  <div className="cutlet-rating">⭐ {item.rating}.0 ({item.rating + 3})</div>
                  <p className="cutlet-description">{item.description}</p>
                </div>

                <div className="cutlet-right">
                  <img src={item.image} alt={item.name} className="cutlet-image" />
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
          <p>No Cutlets found</p>
        )}
      </div>
    </section>
  );
};

export default Cutlet;
