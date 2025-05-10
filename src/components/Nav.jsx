// src/components/Nav.jsx
import React, { useState } from 'react';
import './Nav.css';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const [cartCount] = useState(0);
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/signin');  // client-side navigation
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">CraveCart</div>

      <ul className="navbar__links">
        <li><a href="#menu">Menu</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#features">Category</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#docs">Docs</a></li>
        <li><a href="#blog">Blog</a></li>
      </ul>

      <div className="navbar__auth">
        <button className="btn btn--outline" onClick={handleSignIn}>
          Sign In
        </button>
        <div className="navbar__cart">
          <FaShoppingCart size={20} />
          <span className="cart-count">{cartCount}</span>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
