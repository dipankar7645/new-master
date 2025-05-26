import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Rasmalai.css';

const rasmalaiItems = [
  { name: 'Classic Rasmalai', image: '/images/rasmalai1.jpg', description: 'Soft cheese patties soaked in sweetened milk', rating: 5, price: 90 },
  { name: 'Kesar Rasmalai', image: '/images/rasmalai2.jpg', description: 'Rasmalai infused with saffron strands', rating: 5, price: 120 },
  { name: 'Pistachio Rasmalai', image: '/images/rasmalai3.jpg', description: 'Rasmalai garnished with crunchy pistachios', rating: 4, price: 110 },
  { name: 'Rose Rasmalai', image: '/images/rasmalai4.jpg', description: 'Delightful rose flavored rasmalai', rating: 4, price: 100 },
  { name: 'Chocolate Rasmalai', image: '/images/rasmalai5.jpg', description: 'Rasmalai with a rich chocolate twist', rating: 3, price: 130 },
];

const Rasmalai = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  const getQuantity = (name) => {
    const item = cartItems.find(item => item.name === name);
    return item ? item.quantity : 0;
  };

  const filteredItems = rasmalaiItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === 'all' ||
      (ratingFilter === 'low' && item.rating < 4) ||
      (ratingFilter === 'mid' && item.rating >= 4 && item.rating < 5) ||
      (ratingFilter === 'high' && item.rating === 5);
    return matchesSearch && matchesRating;
  });

  return (
    <section className="rasmalai-section">
      <button className="back-button" onClick={() => navigate('/')}>← Back to Menu</button>
      <h2 className="rasmalai-title">🍮 Rasmalai Varieties</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search Rasmalai..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
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

      <div className="rasmalai-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const quantity = getQuantity(item.name);
            return (
              <div className="rasmalai-card" key={index}>
                <div className="rasmalai-left">
                  <div className="rasmalai-title-row">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Vegetarian_symbol.svg/1024px-Vegetarian_symbol.svg.png"
                      alt="veg"
                      className="veg-icon"
                    />
                    <h3 className="rasmalai-name">{item.name}</h3>
                    <span className="rasmalai-price">₹{item.price}</span>
                  </div>
                  <div className="rasmalai-rating">⭐ {item.rating}.0 ({item.rating + 2})</div>
                  <p className="rasmalai-description">{item.description}</p>
                </div>

                <div className="rasmalai-right">
                  <img src={item.image} alt={item.name} className="rasmalai-image" />
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
          <p>No Rasmalai found</p>
        )}
      </div>
    </section>
  );
};

export default Rasmalai;
