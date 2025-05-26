import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './ColdCoffee.css';

const coldCoffeeItems = [
  { name: 'Classic Cold Coffee', image: '/images/coldcoffee1.jpg', description: 'Rich and creamy cold coffee with ice cream', rating: 5, price: 90 },
  { name: 'Mocha Cold Coffee', image: '/images/coldcoffee2.jpg', description: 'Cold coffee blended with chocolate syrup', rating: 4, price: 110 },
  { name: 'Caramel Cold Coffee', image: '/images/coldcoffee3.jpg', description: 'Smooth cold coffee with caramel flavor', rating: 4, price: 100 },
  { name: 'Vanilla Cold Coffee', image: '/images/coldcoffee4.jpg', description: 'Cold coffee infused with vanilla essence', rating: 5, price: 95 },
  { name: 'Hazelnut Cold Coffee', image: '/images/coldcoffee5.jpg', description: 'Delicious cold coffee with hazelnut syrup', rating: 3, price: 120 },
];

const ColdCoffee = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  const getQuantity = (name) => {
    const item = cartItems.find(item => item.name === name);
    return item ? item.quantity : 0;
  };

  const filteredItems = coldCoffeeItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === 'all' ||
      (ratingFilter === 'low' && item.rating < 4) ||
      (ratingFilter === 'mid' && item.rating >= 4 && item.rating < 5) ||
      (ratingFilter === 'high' && item.rating === 5);
    return matchesSearch && matchesRating;
  });

  return (
    <section className="coldcoffee-section">
      <button className="back-button" onClick={() => navigate('/')}>← Back to Menu</button>
      <h2 className="coldcoffee-title">☕ Cold Coffee Varieties</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search Cold Coffee..."
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

      <div className="coldcoffee-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const quantity = getQuantity(item.name);
            return (
              <div className="coldcoffee-card" key={index}>
                <div className="coldcoffee-left">
                  <div className="coldcoffee-title-row">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Vegetarian_symbol.svg/1024px-Vegetarian_symbol.svg.png"
                      alt="veg"
                      className="veg-icon"
                    />
                    <h3 className="coldcoffee-name">{item.name}</h3>
                    <span className="coldcoffee-price">₹{item.price}</span>
                  </div>
                  <div className="coldcoffee-rating">⭐ {item.rating}.0 ({item.rating + 2})</div>
                  <p className="coldcoffee-description">{item.description}</p>
                </div>

                <div className="coldcoffee-right">
                  <img src={item.image} alt={item.name} className="coldcoffee-image" />
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
          <p>No Cold Coffee found</p>
        )}
      </div>
    </section>
  );
};

export default ColdCoffee;
