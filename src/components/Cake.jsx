import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Cake.css';

const cakeItems = [
  {
    name: 'Chocolate Fudge Cake',
    image: '/images/cake1.jpg',
    description: 'Rich and moist chocolate cake with fudge frosting.',
    rating: 5,
    price: 350,
  },
  {
    name: 'Vanilla Sponge Cake',
    image: '/images/cake2.jpg',
    description: 'Light and fluffy vanilla sponge with cream frosting.',
    rating: 4,
    price: 300,
  },
  {
    name: 'Red Velvet Cake',
    image: '/images/cake3.jpg',
    description: 'Classic red velvet with cream cheese frosting.',
    rating: 5,
    price: 400,
  },
  {
    name: 'Black Forest Cake',
    image: '/images/cake4.jpg',
    description: 'Chocolate cake with cherry and whipped cream layers.',
    rating: 4,
    price: 450,
  },
  {
    name: 'Butterscotch Cake',
    image: '/images/cake5.jpg',
    description: 'Sweet butterscotch cake with caramel drizzle.',
    rating: 3,
    price: 320,
  },
];

const Cake = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  const getQuantity = (name) => {
    const item = cartItems.find((item) => item.name === name);
    return item ? item.quantity : 0;
  };

  const filteredItems = cakeItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === 'all' ||
      (ratingFilter === 'low' && item.rating < 4) ||
      (ratingFilter === 'mid' && item.rating >= 4 && item.rating < 5) ||
      (ratingFilter === 'high' && item.rating === 5);
    return matchesSearch && matchesRating;
  });

  return (
    <section className="cake-section">
      <button className="back-button" onClick={() => navigate('/')}>← Back to Menu</button>
      <h2 className="cake-title">🎂 Cakes</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search Cakes..."
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

      <div className="cake-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const quantity = getQuantity(item.name);
            return (
              <div className="cake-card" key={index}>
                <div className="cake-left">
                  <div className="cake-title-row">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Vegetarian_symbol.svg/1024px-Vegetarian_symbol.svg.png"
                      alt="veg"
                      className="veg-icon"
                    />
                    <h3 className="cake-name">{item.name}</h3>
                    <span className="cake-price">₹{item.price}</span>
                  </div>
                  <div className="cake-rating">⭐ {item.rating}.0 ({item.rating + 2})</div>
                  <p className="cake-description">{item.description}</p>
                </div>

                <div className="cake-right">
                  <img src={item.image} alt={item.name} className="cake-image" />
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
          <p>No Cakes found</p>
        )}
      </div>
    </section>
  );
};

export default Cake;
