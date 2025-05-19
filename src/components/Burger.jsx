import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Burger.css';

const allBurgers = [
  {
    name: 'Classic Burger',
    price: 120,
    image: '/images/classic-burger.jpg',
    rating: 4.5,
    reviews: 10,
    description: 'Juicy patty with classic toppings and soft buns.',
  },
  {
    name: 'Cheese Burger',
    price: 150,
    image: '/images/cheese-burger.jpg',
    rating: 5.0,
    reviews: 8,
    description: 'Loaded with cheese and fresh lettuce.',
  },
  {
    name: 'Veggie Burger',
    price: 100,
    image: '/images/veggie-burger.jpg',
    rating: 4.2,
    reviews: 12,
    description: 'Crispy veggie patty with special sauce.',
  },
  {
    name: 'Deluxe Burger',
    price: 180,
    image: '/images/deluxe-burger.jpg',
    rating: 4.8,
    reviews: 15,
    description: 'Double patty, cheese, and extra toppings.',
  },
];

const Burger = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');

  const filteredBurgers = allBurgers.filter((burger) => {
    const matchesSearch = burger.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice =
      priceFilter === 'all' ||
      (priceFilter === 'low' && burger.price < 120) ||
      (priceFilter === 'mid' && burger.price >= 120 && burger.price <= 150) ||
      (priceFilter === 'high' && burger.price > 150);
    return matchesSearch && matchesPrice;
  });

  const increaseQuantity = (burger) => {
    const current = quantities[burger.name] || 0;
    const newQty = current + 1;
    setQuantities((prev) => ({ ...prev, [burger.name]: newQty }));
    addToCart({ ...burger, quantity: newQty });
  };

  const decreaseQuantity = (burger) => {
    const current = quantities[burger.name] || 0;
    const newQty = Math.max(0, current - 1);
    setQuantities((prev) => ({ ...prev, [burger.name]: newQty }));
    if (newQty > 0) {
      addToCart({ ...burger, quantity: newQty });
    }
  };

  return (
    <section className="burger-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Menu
      </button>

      {/* <img src="/images/burger-banner.jpg" alt="Burger Banner" className="burger-banner" /> */}

     <h2 className="burger-title">🍔 Burger Varieties</h2>

      <div className="burger-filters">
        <input
          type="text"
          placeholder="Search burgers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="price-buttons">
          {['all', 'low', 'mid', 'high'].map((type) => (
            <button
              key={type}
              className={priceFilter === type ? 'active' : ''}
              onClick={() => setPriceFilter(type)}
            >
              {type === 'all'
                ? 'All'
                : type === 'low'
                ? '< ₹120'
                : type === 'mid'
                ? '₹120 - ₹150'
                : '> ₹150'}
            </button>
          ))}
        </div>
      </div>

      <div className="burger-list">
        {filteredBurgers.length > 0 ? (
          filteredBurgers.map((burger) => (
            <div className="burger-card" key={burger.name}>
              <div className="burger-left">
                <div className="burger-header">
                  <h3 className="burger-name">{burger.name}</h3>
                  <span className="burger-price">₹{burger.price}</span>
                </div>

                <div className="burger-rating">
                  <span className="star">⭐</span>
                  {burger.rating.toFixed(1)} ({burger.reviews})
                </div>

                <p className="burger-description">{burger.description}</p>
              </div>

              <div className="burger-right">
                <div className="burger-image-container">
                  <img src={burger.image} alt={burger.name} className="burger-image" />
                  {(quantities[burger.name] || 0) === 0 ? (
                    <button className="add-button" onClick={() => increaseQuantity(burger)}>
                      ADD
                    </button>
                  ) : (
                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(burger)} className="quantity-button">−</button>
                      <span className="quantity-count">{quantities[burger.name]}</span>
                      <button onClick={() => increaseQuantity(burger)} className="quantity-button">+</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No burgers found</p>
        )}
      </div>
    </section>
  );
};

export default Burger;
