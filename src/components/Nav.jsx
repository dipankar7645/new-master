import React from 'react';
import './Nav.css';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../components/CartContext';
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
      <div className="navbar__logo" onClick={() => navigate('/')}>CraveCart</div>

      <ul className="navbar__links">
        <li><span onClick={() => navigate('/')} className="nav-link">Home</span></li>
        <li><span onClick={() => navigate('/pizza')} className="nav-link">Pizza</span></li>
        <li><span onClick={() => navigate('#about')} className="nav-link">About</span></li>
        <li><span onClick={() => navigate('#features')} className="nav-link">Category</span></li>
        <li><span onClick={() => navigate('#pricing')} className="nav-link">Pricing</span></li>
        <li><span onClick={() => navigate('#docs')} className="nav-link">Docs</span></li>
        <li><span onClick={() => navigate('#blog')} className="nav-link">Blog</span></li>
      </ul>

      <div className="navbar__auth">
        <button className="btn btn--outline" onClick={handleSignIn}>
          Sign In
        </button>

        <div className="navbar__cart" onClick={() => navigate('/cart')}>
          <FaShoppingCart size={20} />
          {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
