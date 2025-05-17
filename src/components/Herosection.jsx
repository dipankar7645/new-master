import React, { useEffect, useState } from 'react';
import './Herosection.css';

const foodImages = [
  '/images/food1.jpg',
  '/images/food2.jpg',
  '/images/food3.jpg',
  '/images/food4.jpg'
];

const hoverImage = '/images/hover.jpg';

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % foodImages.length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__quote">“Tasty & Mouth-Watering Food Delivered to You”</h1>
        <p className="hero__subtext">Experience flavors that excite your taste buds.</p>
        <a href="#menu" className="hero__button">View Menu</a>
      </div>

      <div className="hero__image">
        <img
          src={foodImages[currentImageIndex]}
          alt={`Delicious Food ${currentImageIndex + 1}`}
          className="hero__image--animated"
        />
      </div>
    </section>
  );
};

export default HeroSection;
