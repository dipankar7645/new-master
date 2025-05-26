import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Tea.css';

const teaTypes = [
  { name: 'Masala Tea', image: '/images/tea1.jpg', description: 'Spiced Indian tea with milk and spices', rating: 5, price: 40 },
  { name: 'Ginger Tea', image: '/images/tea2.jpg', description: 'Refreshing tea with fresh ginger', rating: 4, price: 35 },
  { name: 'Green Tea', image: '/images/tea3.jpg', description: 'Healthy green tea with antioxidants', rating: 4, price: 50 },
  { name: 'Lemon Tea', image: '/images/tea4.jpg', description: 'Tangy tea with lemon zest', rating: 3, price: 30 },
  { name: 'Cardamom Tea', image: '/images/tea5.jpg', description: 'Aromatic tea infused with cardamom pods', rating: 5, price: 45 },
];

const Tea = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  const getTeaQuantity = (name) => {
    const item = cartItems.find(item => item.name === name);
    return item ? item.quantity : 0;
  };

  const filteredTeas = teaTypes.filter(tea => {
    const matchesSearch = tea.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === 'all' ||
      (ratingFilter === 'low' && tea.rating < 4) ||
      (ratingFilter === 'mid' && tea.rating >= 4 && tea.rating < 5) ||
      (ratingFilter === 'high' && tea.rating === 5);
    return matchesSearch && matchesRating;
  });

  return (
    <section className="tea-section">
      <button className="back-button" onClick={() => navigate('/')}>← Back to Menu</button>
      <h2 className="tea-title">🍵 Tea Varieties</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search tea by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="tea-search"
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

      <div className="tea-list">
        {filteredTeas.length > 0 ? (
          filteredTeas.map((tea, index) => {
            const quantity = getTeaQuantity(tea.name);
            return (
              <div className="tea-card" key={index}>
                <div className="tea-left">
                  <div className="tea-title-row">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/2048px-Veg_symbol.svg.png"
                      alt="veg"
                      className="veg-icon"
                    />
                    <h3 className="tea-name">{tea.name}</h3>
                    <span className="tea-price">₹{tea.price}</span>
                  </div>
                  <div className="tea-rating">⭐ {tea.rating}.0 ({tea.rating + 3})</div>
                  <p className="tea-description">{tea.description}</p>
                </div>

                <div className="tea-right">
                  <img src={tea.image} alt={tea.name} className="tea-image" />
                  {quantity === 0 ? (
                    <button className="add-button" onClick={() => addToCart(tea)}>ADD</button>
                  ) : (
                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(tea.name)} className="quantity-button">−</button>
                      <span className="quantity-count">{quantity}</span>
                      <button onClick={() => increaseQuantity(tea.name)} className="quantity-button">+</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p>No tea found</p>
        )}
      </div>
    </section>
  );
};

export default Tea;
