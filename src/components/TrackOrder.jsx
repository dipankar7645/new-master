import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './TrackOrder.css';

const TrackOrder = () => {
  const location = useLocation();
  const orderIdFromState = location.state?.orderId || '';
  const [orderId, setOrderId] = useState('');
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    if (orderIdFromState) {
      const generatedOrder = {
        status: 'Packed',
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      };
      setOrderId(orderIdFromState);
      setOrderInfo(generatedOrder);
    }
  }, [orderIdFromState]);

  return (
    <div className="track-order">
      <h2>📦 Track Your Order</h2>
      {orderInfo ? (
        <div className="order-details">
          <p><strong>Order ID:</strong> {orderId}</p>
          <p><strong>Status:</strong> {orderInfo.status}</p>
          <p><strong>Estimated Delivery:</strong> {orderInfo.estimatedDelivery}</p>
        </div>
      ) : (
        <p>No order information available. Please check again.</p>
      )}
    </div>
  );
};

export default TrackOrder;
