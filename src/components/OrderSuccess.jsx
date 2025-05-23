import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const generatedId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    clearCart();

    const timer = setTimeout(() => {
      navigate('/');
    }, 10000); // changed to 10 seconds to give user time to click Track Order

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleDownloadReceipt = () => {
    const receiptContent = `Order Receipt\n\nOrder ID: ${orderId}\n\nThank you for your order!`;
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `Order-${orderId}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleTrackOrder = () => {
    navigate('/track-order', { state: { orderId } });
  };

  return (
    <div className="order-success">
      <h2>🎉 Order Successful!</h2>
      <p>Your food is being prepared.</p>
      <p><strong>Order ID:</strong> {orderId}</p>

      <button onClick={handleDownloadReceipt}>Download Receipt</button>
      <button onClick={handleTrackOrder}>Track Order</button>

      <p>Redirecting to home in 10 seconds...</p>
    </div>
  );
};

export default OrderSuccess;
