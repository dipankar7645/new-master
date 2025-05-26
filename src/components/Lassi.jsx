import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Lassi.css';

const lassiTypes = [
  { name: 'Sweet Lassi', image: '/images/lassi1.jpg', description: 'Classic sweetened yogurt drink', rating: 4, price: 60 },
  { name: 'Salted Lassi', image: '/images/lassi2.jpg', description: 'Traditional salty lassi with spices', rating: 3, price: 50 },
  { name: 'Mango Lassi', image: '/images/lassi3.jpg', description: 'Refreshing mango-flavored lassi', rating: 5, price: 80 },
  { name: 'Rose Lassi', image: '/images/lassi4.jpg', description: 'Flavored with rose syrup and creamy yogurt', rating: 4, price: 70 },
  { name: 'Dry Fruit Lassi', image: '/images/lassi5.jpg', description: 'Rich lassi topped with nuts and dry fruits', rating: 5, price: 90 },
];

const Lassi = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  const getLassiQuantity = (name) => {
    const item = cartItems.find(item => item.name === name);
    return item ? item.quantity : 0;
  };

  const filteredLassis = lassiTypes.filter(lassi => {
    const matchesSearch = lassi.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === 'all' ||
      (ratingFilter === 'low' && lassi.rating < 4) ||
      (ratingFilter === 'mid' && lassi.rating >= 4 && lassi.rating < 5) ||
      (ratingFilter === 'high' && lassi.rating === 5);
    return matchesSearch && matchesRating;
  });

  return (
    <section className="lassi-section">
      <button className="back-button" onClick={() => navigate('/')}>← Back to Menu</button>
      <h2 className="lassi-title">🥤 Lassi Varieties</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search lassi by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="lassi-search"
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

      <div className="lassi-list">
        {filteredLassis.length > 0 ? (
          filteredLassis.map((lassi, index) => {
            const quantity = getLassiQuantity(lassi.name);
            return (
              <div className="lassi-card" key={index}>
                <div className="lassi-left">
                  <div className="lassi-title-row">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/2048px-Veg_symbol.svg.png"
                      alt="veg"
                      className="veg-icon"
                    />
                    <h3 className="lassi-name">{lassi.name}</h3>
                    <span className="lassi-price">₹{lassi.price}</span>
                  </div>
                  <div className="lassi-rating">⭐ {lassi.rating}.0 ({lassi.rating + 3})</div>
                  <p className="lassi-description">{lassi.description}</p>
                </div>

                <div className="lassi-right">
                  <img src={lassi.image} alt={lassi.name} className="lassi-image" />
                  {quantity === 0 ? (
                    <button className="add-button" onClick={() => addToCart(lassi)}>ADD</button>
                  ) : (
                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(lassi.name)} className="quantity-button">−</button>
                      <span className="quantity-count">{quantity}</span>
                      <button onClick={() => increaseQuantity(lassi.name)} className="quantity-button">+</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p>No lassi found</p>
        )}
      </div>
    </section>
  );
};

export default Lassi;
