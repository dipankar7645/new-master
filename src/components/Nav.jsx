import React from 'react';
import './Nav.css';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../components/CartContext';  // fixed path
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSignIn = () => {
    navigate('/signin');
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
        <div className="navbar__cart" onClick={() => console.log('Open Cart')}>
  <FaShoppingCart size={20} />
  {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
</div>

      </div>
    </nav>
  );
};

export default Nav;
