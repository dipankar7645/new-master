import React from 'react';
import { useCart } from '../components/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    alert('Order placed successfully!');
    clearCart();
  };

  return (
    <section className="checkout">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="checkout-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{item.price * item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total Amount: ₹{totalPrice}</h3>
          <button className="place-order" onClick={handleCheckout}>
            Place Order
          </button>
        </>
      )}
    </section>
  );
};

export default Checkout;
