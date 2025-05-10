import React from 'react';
import './Herosection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__quote">“Tasty & Mouth-Watering Food Delivered to You”</h1>
        <p className="hero__subtext">Experience flavors that excite your taste buds.</p>
        <a href="#menu" className="hero__button">View Menu</a>
      </div>
      <div className="hero__image">
        <img src="/images/food.jpeg" alt="Delicious Food" />
      </div>
    </section>
  );
};

export default HeroSection;
