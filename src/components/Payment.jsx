import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleConfirm = () => {
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }
    navigate('/order-success', {
      state: {
        order: {
          cartItems: state.cartItems,
          totalPrice: state.totalPrice,
          contactInfo: state.formData,
          paymentMethod,
        },
      },
    });
  };

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      <div className="order-summary">
        <p>Total Amount: <strong>₹{state.totalPrice}</strong></p>
      </div>

      <div className="payment-options">
        <h3>Select Payment Method</h3>
        <label>
          <input
            type="radio"
            name="payment"
            value="upi"
            onChange={() => setPaymentMethod('upi')}
          /> UPI Payment
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="qr"
            onChange={() => setPaymentMethod('qr')}
          /> QR Code
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="cod"
            onChange={() => setPaymentMethod('cod')}
          /> Cash on Delivery (COD)
        </label>
      </div>

      {paymentMethod === 'qr' && (
        <div className="qr-code-container">
          <p>Scan this QR code to pay:</p>
          <img src="/images/qr.png" alt="UPI QR Code" className="qr-code" />
        </div>
      )}

      <button className="confirm-btn" onClick={handleConfirm}>Confirm Order</button>
    </div>
  );
};

export default Payment;