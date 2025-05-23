import React from 'react';
import { useCart } from '../components/CartContext';
import './IceCream.css';

const IceCream = () => {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();

  const iceCreamItems = [
    {
      name: 'Vanilla Delight',
      image: '/images/icecream1.jpg',
      price: 120,
      rating: 4.5,
      description: 'Classic vanilla ice cream with a rich creamy flavor.'
    },
    {
      name: 'Chocolate Heaven',
      image: '/images/icecream2.jpg',
      price: 150,
      rating: 4.8,
      description: 'A chocoholic’s dream with deep cocoa and fudge swirls.'
    },
    {
      name: 'Strawberry Swirl',
      image: '/images/icecream3.jpg',
      price: 130,
      rating: 4.2,
      description: 'Sweet strawberry ice cream with real fruit swirls.'
    },
    {
      name: 'Mango Magic',
      image: '/images/icecream4.jpg',
      price: 140,
      rating: 4.6,
      description: 'Tropical mango ice cream with a tangy twist.'
    },
    {
      name: 'Blueberry Blast',
      image: '/images/icecream5.jpg',
      price: 160,
      rating: 4.7,
      description: 'Bursting with blueberry flavor and creamy texture.'
    }
  ];

  const getQuantity = (name) => {
    const item = cartItems.find(i => i.name === name);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (item) => {
    addToCart({ ...item, quantity: 1 });
  };

  const handleDecrease = (item) => {
    const qty = getQuantity(item.name);
    if (qty === 1) {
      removeFromCart(item.name);
    } else {
      updateQuantity(item.name, qty - 1);
    }
  };

  const handleIncrease = (item) => {
    const qty = getQuantity(item.name);
    updateQuantity(item.name, qty + 1);
  };

  return (
    <div className="icecream-page">
      <h1>Ice Cream Delights 🍨</h1>
      <p>Explore our delicious selection of ice creams, from classic vanilla to exotic flavors!</p>

      <div className="icecream-gallery">
        {iceCreamItems.map(item => {
          const quantity = getQuantity(item.name);
          return (
            <div
              key={item.name}
              className="icecream-card"
              style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                marginBottom: '20px',
                justifyContent: 'space-between'
              }}
            >
              {/* LEFT SIDE: Text */}
              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p style={{ margin: '5px 0', fontStyle: 'italic', color: '#555' }}>{item.description}</p>
                <p style={{ margin: '5px 0', fontWeight: '600' }}>Price: ₹{item.price}</p>
                <p style={{ margin: '5px 0' }}>Rating: ⭐ {item.rating}</p>
              </div>

              {/* RIGHT SIDE: Image + Cart Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="icecream-img"
                  style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '10px' }}
                />
                {quantity === 0 ? (
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="btn btn--add"
                    style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      onClick={() => handleDecrease(item)}
                      className="btn qty-btn"
                      style={{
                        padding: '6px 12px',
                        fontSize: '18px',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        border: '1px solid #007bff',
                        backgroundColor: '#007bff',
                        color: 'white',
                        userSelect: 'none'
                      }}
                    >
                      −
                    </button>
                    <span style={{ fontSize: '16px' }}>{quantity}</span>
                    <button
                      onClick={() => handleIncrease(item)}
                      className="btn qty-btn"
                      style={{
                        padding: '6px 12px',
                        fontSize: '18px',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        border: '1px solid #007bff',
                        backgroundColor: '#007bff',
                        color: 'white',
                        userSelect: 'none'
                      }}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IceCream;
