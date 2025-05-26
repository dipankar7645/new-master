import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Biryani.css';

const biryaniItems = [
  {
    name: 'Hyderabadi Biryani',
    image: '/images/biryani1.jpg',
    description: 'Aromatic basmati rice cooked with tender chicken and spices.',
    rating: 5,
    price: 180,
  },
  {
    name: 'Lucknowi Biryani',
    image: '/images/biryani2.jpg',
    description: 'Delicate and flavorful biryani with subtle saffron aroma.',
    rating: 4,
    price: 170,
  },
  {
    name: 'Kolkata Biryani',
    image: '/images/biryani3.jpg',
    description: 'Lightly spiced biryani with potatoes and boiled eggs.',
    rating: 4,
    price: 160,
  },
  {
    name: 'Chettinad Biryani',
    image: '/images/biryani4.jpg',
    description: 'Spicy South Indian biryani with bold flavors and chicken.',
    rating: 5,
    price: 190,
  },
  {
    name: 'Vegetable Biryani',
    image: '/images/biryani5.jpg',
    description: 'Mixed veggies cooked with fragrant basmati rice and spices.',
    rating: 3,
    price: 140,
  },
];

const Biryani = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  const getQuantity = (name) => {
    const item = cartItems.find((item) => item.name === name);
    return item ? item.quantity : 0;
  };

  const filteredItems = biryaniItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === 'all' ||
      (ratingFilter === 'low' && item.rating < 4) ||
      (ratingFilter === 'mid' && item.rating >= 4 && item.rating < 5) ||
      (ratingFilter === 'high' && item.rating === 5);
    return matchesSearch && matchesRating;
  });

  return (
    <section className="biryani-section">
      <button className="back-button" onClick={() => navigate('/')}>← Back to Menu</button>
      <h2 className="biryani-title">🍛 Biryani Varieties</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search Biryani..."
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

      <div className="biryani-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const quantity = getQuantity(item.name);
            return (
              <div className="biryani-card" key={index}>
                <div className="biryani-left">
                  <div className="biryani-title-row">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Vegetarian_symbol.svg/1024px-Vegetarian_symbol.svg.png"
                      alt="veg"
                      className="veg-icon"
                    />
                    <h3 className="biryani-name">{item.name}</h3>
                    <span className="biryani-price">₹{item.price}</span>
                  </div>
                  <div className="biryani-rating">⭐ {item.rating}.0 ({item.rating + 3})</div>
                  <p className="biryani-description">{item.description}</p>
                </div>

                <div className="biryani-right">
                  <img src={item.image} alt={item.name} className="biryani-image" />
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
          <p>No Biryani found</p>
        )}
      </div>
    </section>
  );
};

export default Biryani;
