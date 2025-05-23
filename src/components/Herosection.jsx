import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Herosection.css';

const foodImages = [
  '/images/food1.jpg',
  '/images/food2.jpg',
  '/images/food3.jpg',
  '/images/food4.jpg'
];

const fastFoodRestaurants = [
  { name: "McDonald's", fullName: "McDonald's – Global", image: '/images/McDonalds.jpg', rating: 4.2, location: 'Global' },
  { name: "KFC", fullName: "KFC (Kentucky Fried Chicken) – Global", image: '/images/kfc.jpg', rating: 4.0, location: 'Global' },
  { name: "Burger King", fullName: "Burger King – Global", image: '/images/burgerking.jpg', rating: 4.1, location: 'Global' },
  { name: "Domino's Pizza", fullName: "Domino's Pizza – Global", image: '/images/dominos.jpg', rating: 4.3, location: 'Global' },
  { name: "Pizza Hut", fullName: "Pizza Hut – Global", image: '/images/pizzahut.jpg', rating: 4.0, location: 'Global' }
];

const pizzaRestaurants = [
  { name: "Little Caesars", fullName: "Little Caesars – Global", image: '/images/littlecaesars.jpg', rating: 4.1, location: 'Global' },
  { name: "La Pino'z Pizza", fullName: "La Pino'z Pizza – India", image: '/images/lapinoz.jpg', rating: 4.0, location: 'India' }
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showRestaurants, setShowRestaurants] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % foodImages.length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleRestaurantList = () => {
    setShowRestaurants(prev => !prev);

    if (!showRestaurants) {
      setTimeout(() => {
        document.getElementById('restaurantList')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleRestaurantClick = (name) => {
    if (name === "McDonald's" || name === "Burger King") {
      navigate('/burger');
    } else if (name === "Pizza Hut" || name === "Domino's Pizza" || name === "La Pino'z Pizza") {
      navigate('/pizza');
    }
  };

  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__quote">“Tasty & Mouth-Watering Food Delivered to You”</h1>
          <p className="hero__subtext">Experience flavors that excite your taste buds.</p>
          <button className="hero__button" onClick={toggleRestaurantList}>
            {showRestaurants ? 'Show Less' : 'View Menu'}
          </button>
        </div>

        <div className="hero__image">
          <img
            src={foodImages[currentImageIndex]}
            alt={`Delicious Food ${currentImageIndex + 1}`}
            className="hero__image--animated"
          />
        </div>
      </section>

      {showRestaurants && (
        <section id="restaurantList" className="restaurant__section">
          <h2 className="restaurant__title">🍽️ Featured Restaurant Chains</h2>

          <div className="restaurant__category">
            <h3>🍔 Fast Food Chains</h3>
            <div className="restaurant__list">
              {fastFoodRestaurants.map((res, index) => (
                <div
                  key={index}
                  className="restaurant__card"
                  onClick={() => handleRestaurantClick(res.name)}
                  style={{
                    cursor: ["McDonald's", "Burger King", "Pizza Hut", "Domino's Pizza"].includes(res.name) ? 'pointer' : 'default'
                  }}
                  title={["McDonald's", "Burger King", "Pizza Hut", "Domino's Pizza"].includes(res.name) ? 'Click to navigate' : ''}
                >
                  <img src={res.image} alt={res.fullName} className="restaurant__image" />
                  <div className="restaurant__info">
                    <p className="restaurant__name">{res.fullName}</p>
                    <p className="restaurant__meta">⭐ {res.rating} | 📍 {res.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="restaurant__category">
            <h3>🍕 Pizza & Italian Favorites</h3>
            <div className="restaurant__list">
              {pizzaRestaurants.map((res, index) => (
                <div
                  key={index}
                  className="restaurant__card"
                  onClick={() => handleRestaurantClick(res.name)}
                  style={{
                    cursor: ["La Pino'z Pizza"].includes(res.name) ? 'pointer' : 'default'
                  }}
                  title={["La Pino'z Pizza"].includes(res.name) ? 'Click to navigate' : ''}
                >
                  <img src={res.image} alt={res.fullName} className="restaurant__image" />
                  <div className="restaurant__info">
                    <p className="restaurant__name">{res.fullName}</p>
                    <p className="restaurant__meta">⭐ {res.rating} | 📍 {res.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HeroSection;
