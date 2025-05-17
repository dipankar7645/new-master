import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <section className="thank-you">
      <h2>Thank You for Your Order! 🎉</h2>
      <p>Your delicious pizza is on its way.</p>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </section>
  );
};

export default ThankYou;
