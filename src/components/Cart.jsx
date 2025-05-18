import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalPrice, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  const handleDecrease = (item) => {
    if (item.quantity === 1) {
      removeFromCart(item.name);
    } else {
      updateQuantity(item.name, item.quantity - 1);
    }
  };

  const handleIncrease = (item) => {
    updateQuantity(item.name, item.quantity + 1);
  };

  return (
    <section className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.name} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    Quantity:
                    <button className="qty-btn" onClick={() => handleDecrease(item)}>−</button>
                    <span className="qty-number">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => handleIncrease(item)}>+</button>
                  </p>
                  <p>Price: ₹{item.price * item.quantity}</p>
                  <button onClick={() => removeFromCart(item.name)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{totalPrice}</h3>
          <button className="clear-cart" onClick={handleCheckout}>Buy Now</button>
        </>
      )}
    </section>
  );
};

export default Cart;