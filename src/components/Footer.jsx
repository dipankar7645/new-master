// src/components/Footer.jsx
import React from 'react';
import './footer.css';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h2 className="footer__logo">FoodieExpress</h2>
          <p>Delivering delicious meals at your doorstep.</p>
        </div>
        <div className="footer__section">
          <h3>Company</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/press">Press</a></li>
          </ul>
        </div>
        <div className="footer__section">
          <h3>Support</h3>
          <ul>
            <li><a href="/help">Help Center</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>
        <div className="footer__section">
          <h3>Follow Us</h3>
          <div className="footer-social-icons">
            <img src={assets.facebook} alt="Facebook" />
            <img src={assets.twitter} alt="Twitter" />
            <img src={assets.instagram} alt="Instagram" />
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} CopyRight-FoodieExpress. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
