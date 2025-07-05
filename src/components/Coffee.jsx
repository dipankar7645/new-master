// Coffee.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Coffee.css';

const coffeeTypes = [
  { name: 'Espresso', image: '/Coffee/coffee1.jpg', description: 'Strong and bold shot', rating: 5, price: 149 },
  { name: 'Cappuccino', image: '/Coffee/coffee2.jpg', description: 'Espresso with steamed milk foam', rating: 4, price: 169 },
  { name: 'Latte', image: '/Coffee/coffee3.jpg', description: 'Smooth espresso with milk', rating: 4, price: 179 },
  { name: 'Mocha', image: '/Coffee/coffee4.jpg', description: 'Chocolate-flavored coffee delight', rating: 5, price: 199 },
  { name: 'Cold Brew', image: '/Coffee/coffee5.jpg', description: 'Iced slow brewed coffee', rating: 4, price: 159 },
  { name: 'Americano', image: '/Coffee/coffee6.jpg', description: 'Espresso diluted with hot water', rating: 3, price: 139 },
  { name: 'Macchiato', image: '/Coffee/coffee7.jpg', description: 'Espresso with a dash of milk foam', rating: 4, price: 169 },
];

const Coffee = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  const getCoffeeQuantity = (coffeeName) => {
    const item = cartItems.find(item => item.name === coffeeName);
    return item ? item.quantity : 0;
  };

  const filteredCoffees = coffeeTypes.filter(coffee => {
    const matchesSearch = coffee.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === 'all' ||
      (ratingFilter === 'low' && coffee.rating < 4) ||
      (ratingFilter === 'mid' && coffee.rating >= 4 && coffee.rating < 5) ||
      (ratingFilter === 'high' && coffee.rating === 5);
    return matchesSearch && matchesRating;
  });

  return (
    <section className="coffee-section">
      <button className="back-button" onClick={() => navigate('/')}>← Back to Menu</button>
      <h2 className="coffee-title">☕ Coffee Varieties</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search coffee by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="coffee-search"
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

      <div className="coffee-list">
        {filteredCoffees.length > 0 ? (
          filteredCoffees.map((coffee, index) => {
            const quantity = getCoffeeQuantity(coffee.name);
            return (
              <div className="coffee-card" key={index}>
                <div className="coffee-left">
                  <div className="coffee-title-row">
                    <h3 className="coffee-name">{coffee.name}</h3>
                    <span className="coffee-price">₹{coffee.price}</span>
                  </div>
                  <div className="coffee-rating">⭐ {coffee.rating}.0 ({coffee.rating + 3})</div>
                  <p className="coffee-description">{coffee.description}</p>
                </div>

                <div className="coffee-right">
                  <img src={coffee.image} alt={coffee.name} className="coffee-image" />
                  {quantity === 0 ? (
                    <button className="add-button" onClick={() => addToCart(coffee)}>ADD</button>
                  ) : (
                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(coffee.name)} className="quantity-button">−</button>
                      <span className="quantity-count">{quantity}</span>
                      <button onClick={() => increaseQuantity(coffee.name)} className="quantity-button">+</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p>No coffee found</p>
        )}
      </div>
    </section>
  );
};

export default Coffee;
