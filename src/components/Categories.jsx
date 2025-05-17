import React, { useState } from 'react';
import './Categories.css';
import Pizza from './Pizza';
import {
  FaPizzaSlice, FaHamburger, FaIceCream, FaCoffee, FaCarrot,
  FaDrumstickBite, FaUtensils, FaFish, FaLeaf, FaCookieBite,
  FaGlassWhiskey, FaMugHot, FaConciergeBell, FaWineGlassAlt,
  FaAppleAlt, FaGlassMartiniAlt, FaBreadSlice, FaCocktail,
  FaPepperHot, FaCheese
} from 'react-icons/fa';

const Categories = () => {
  const [showPizza, setShowPizza] = useState(false);

  const categoryList = [
    { icon: <FaPizzaSlice />, label: 'Pizza', image: '/images/pizza.jpeg' },
    { icon: <FaHamburger />, label: 'Burgers', image: '/images/burger.jpg' },
    { icon: <FaIceCream />, label: 'Ice Cream', image: '/images/icecream.jpg' },
    { icon: <FaCoffee />, label: 'Coffee', image: '/images/coffee.jpg' },
    { icon: <FaCarrot />, label: 'Vegan', image: '/images/vegan.jpeg' },
    { icon: <FaDrumstickBite />, label: 'Chicken', image: '/images/chicken.jpg' },
    { icon: <FaUtensils />, label: 'Thali', image: '/images/thali.webp' },
    { icon: <FaFish />, label: 'Fried Rice', image: '/images/friedrice.webp' },
    { icon: <FaLeaf />, label: 'North Indian', image: '/images/northindian.jpeg' },
    { icon: <FaConciergeBell />, label: 'Dosa', image: '/images/dosa.jpeg' },
    { icon: <FaBreadSlice />, label: 'Rolls', image: '/images/rolls.jpg' },
    { icon: <FaCookieBite />, label: 'Momos', image: '/images/momos.jpg' },
    { icon: <FaGlassWhiskey />, label: 'Lassi', image: '/images/lassi.jpeg' },
    { icon: <FaMugHot />, label: 'Tea', image: '/images/tea.jpg' },
    { icon: <FaWineGlassAlt />, label: 'Rasmalai', image: '/images/rasmalia.jpeg' },
    { icon: <FaGlassMartiniAlt />, label: 'Cold coffee ', image: '/images/coffee.jpg' },
    { icon: <FaAppleAlt />, label: 'Biryani', image: '/images/biryani.jpeg' },
    { icon: <FaCocktail />, label: 'Cutlet', image: '/images/cutlet.jpg' },
    { icon: <FaPepperHot />, label: 'Vada Pav', image: '/images/vadapav.jpeg' },
    { icon: <FaCheese />, label: 'Cake', image: '/images/cake.jpeg' }
  ];

  const handleCategoryClick = (label) => {
    if (label === 'Pizza') {
      setShowPizza(true);
    }
  };

  return (
    <section className="categories">
      <h2 className="categories__title">Explore Our Menu</h2>
      <p>
        Food the extraordinary with our extensive menu, packed with options from savory starters to indulgent desserts.
      </p>

      <div className="categories__list">
        {categoryList.map((cat, index) => (
          <div
            key={index}
            className="category__item"
            onClick={() => handleCategoryClick(cat.label)}
            style={{ cursor: 'pointer' }}
          >
            <div className="category__image-container">
              <img src={cat.image} alt={cat.label} className="category__image" />
            </div>
            <div className="category__label">{cat.label}</div>
          </div>
        ))}
      </div>

      {/* Show pizza details below categories if toggled */}
      {showPizza && <Pizza onClose={() => setShowPizza(false)} />}

      <div className="categories__button">
        <a href="#all-categories" className="btn btn--outline">
          See All Cuisines & Dishes
        </a>
      </div>
    </section>
  );
};

export default Categories;
