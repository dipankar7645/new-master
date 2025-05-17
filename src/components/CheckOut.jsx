import React, { useState } from 'react';
import { useCart } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import './Checkout.css';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_your_publishable_key_here'); // Replace with your Stripe publishable key

const CheckoutForm = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', address: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.address || !formData.phone) {
      setError('Please fill in all delivery information.');
      return;
    }

    if (!stripe || !elements) return;

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: { name: formData.name },
    });

    if (paymentError) {
      setError(paymentError.message);
      setLoading(false);
      return;
    }

    try {
      // Call backend to process order and payment
      const response = await fetch('http://localhost:5000/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems,
          totalPrice,
          customerInfo: formData,
          paymentMethodId: paymentMethod.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        clearCart();
        navigate('/thankyou');
      } else {
        setError(data.message || 'Payment failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h2>Delivery Information</h2>
      <input
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="address"
        placeholder="Delivery Address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <h2>Payment Details</h2>
      <CardElement className="card-element" />

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : `Pay ₹${totalPrice}`}
      </button>
    </form>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
