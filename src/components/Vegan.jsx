// Vegan.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Vegan.css';

const veganItems = [
  { name: 'Vegan Burger', image: '/images/vegan1.jpg', description: 'Plant-based patty with lettuce and tomato', rating: 5, price: 199 },
  { name: 'Tofu Salad', image: '/images/vegan2.jpg', description: 'Fresh greens with grilled tofu cubes', rating: 4, price: 179 },
  { name: 'Vegan Wrap', image: '/images/vegan3.jpg', description: 'Tortilla filled with veggies and hummus', rating: 4, price: 159 },
  { name: 'Chickpea Bowl', image: '/images/vegan4.jpg', description: 'Chickpeas, quinoa, and greens bowl', rating: 5, price: 189 },
  { name: 'Grilled Veggies', image: '/images/vegan5.jpg', description: 'Seasonal vegetables grilled to perfection', rating: 3, price: 169 },
  { name: 'Vegan Pizza', image: '/images/vegan6.jpg', description: 'Cheese-less pizza with fresh veggies', rating: 4, price: 199 },
];

const Vegan = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  const getQuantity = (name) => {
    const item = cartItems.find(item => item.name === name);
    return item ? item.quantity : 0;
  };

  const filteredItems = veganItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === 'all' ||
      (ratingFilter === 'low' && item.rating < 4) ||
      (ratingFilter === 'mid' && item.rating >= 4 && item.rating < 5) ||
      (ratingFilter === 'high' && item.rating === 5);
    return matchesSearch && matchesRating;
  });

  return (
    <section className="vegan-section">
      <button className="back-button" onClick={() => navigate('/')}>← Back to Menu</button>
      <h2 className="vegan-title">🥦 Vegan Specials</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search vegan dishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="vegan-search"
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

      <div className="vegan-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const quantity = getQuantity(item.name);
            return (
              <div className="vegan-card" key={index}>
                <div className="vegan-left">
                  <div className="vegan-title-row">
                    <h3 className="vegan-name">{item.name}</h3>
                    <span className="vegan-price">₹{item.price}</span>
                  </div>
                  <div className="vegan-rating">⭐ {item.rating}.0 ({item.rating + 4})</div>
                  <p className="vegan-description">{item.description}</p>
                </div>

                <div className="vegan-right">
                  <img src={item.image} alt={item.name} className="vegan-image" />
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
          <p>No vegan dishes found</p>
        )}
      </div>
    </section>
  );
};

export default Vegan;
