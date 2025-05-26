// NorthIndian.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './NorthIndian.css';

const northIndianItems = [
  { name: 'Paneer Butter Masala', image: '/images/north1.jpg', description: 'Creamy tomato-based curry with paneer cubes', rating: 5, price: 179 },
  { name: 'Rajma Chawal', image: '/images/north2.jpg', description: 'Kidney beans curry served with steamed rice', rating: 4, price: 129 },
  { name: 'Chole Bhature', image: '/images/north3.jpg', description: 'Spicy chickpeas with fried bhature', rating: 5, price: 149 },
  { name: 'Dal Makhani', image: '/images/north4.jpg', description: 'Slow-cooked black lentils with cream and butter', rating: 4, price: 139 },
  { name: 'Aloo Paratha', image: '/images/north5.jpg', description: 'Stuffed potato paratha served with curd and pickle', rating: 3, price: 99 },
  { name: 'Shahi Paneer', image: '/images/north6.jpg', description: 'Rich and royal paneer gravy with cashew base', rating: 5, price: 189 },
];

const NorthIndian = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  const getQuantity = (name) => {
    const item = cartItems.find(item => item.name === name);
    return item ? item.quantity : 0;
  };

  const filteredItems = northIndianItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === 'all' ||
      (ratingFilter === 'low' && item.rating < 4) ||
      (ratingFilter === 'mid' && item.rating >= 4 && item.rating < 5) ||
      (ratingFilter === 'high' && item.rating === 5);
    return matchesSearch && matchesRating;
  });

  return (
    <section className="north-section">
      <button className="back-button" onClick={() => navigate('/')}>← Back to Menu</button>
      <h2 className="north-title">🍛 North Indian Dishes</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search North Indian food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="north-search"
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

      <div className="north-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const quantity = getQuantity(item.name);
            return (
              <div className="north-card" key={index}>
                <div className="north-left">
                  <div className="north-title-row">
                    <h3 className="north-name">{item.name}</h3>
                    <span className="north-price">₹{item.price}</span>
                  </div>
                  <div className="north-rating">⭐ {item.rating}.0 ({item.rating + 4})</div>
                  <p className="north-description">{item.description}</p>
                </div>

                <div className="north-right">
                  <img src={item.image} alt={item.name} className="north-image" />
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
          <p>No items found</p>
        )}
      </div>
    </section>
  );
};

export default NorthIndian;
