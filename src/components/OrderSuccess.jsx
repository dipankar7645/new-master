import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Generate a simple random Order ID
    const generatedId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);

    // Redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

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

  return (
    <div className="order-success">
      <h2>🎉 Order Successful!</h2>
      <p>Thank you for your order. Your delicious food will arrive shortly.</p>
      <p><strong>Order ID:</strong> {orderId}</p>

      <button onClick={handleDownloadReceipt}>Download Receipt</button>
      <p>Redirecting to home in 5 seconds...</p>
    </div>
  );
};

export default OrderSuccess;
