import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../components/CartContext';
import { useAuth } from '../UserAuthContext';
import { useNavigate } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignOut = () => {
    signout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo" onClick={() => navigate('/')}>
        <img src="/images/CraveCart.png" alt="CraveCart Logo" className="navbar__logo-img" />
        CraveCart
      </div>

      {/* Hamburger Toggle Button */}
      <button
        className="navbar__toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        &#9776;
      </button>

      <ul className={`navbar__links ${menuOpen ? 'active' : ''}`}>
        <li><span onClick={() => navigate('/')}>Home</span></li>
        <li><span onClick={() => navigate('/pizza')}>Pizza</span></li>
        <li><span onClick={() => navigate('#about')}>About</span></li>
        <li><span onClick={() => navigate('#contact')}>Help</span></li>
      </ul>

      <div className="navbar__auth">
        {!user ? (
          <button className="btn btn--outline" onClick={handleSignIn}>
            Sign In
          </button>
        ) : (
          <>
            <div
              className="navbar__profile"
              onClick={() => navigate('/profile')}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <img
                src={user.photoURL || '/images/profile.jpg'}
                alt="User"
                style={{ width: '32px', height: '32px', borderRadius: '50%' }}
              />
              <span>{user.name}</span>
            </div>
            <button className="btn btn--outline" onClick={handleSignOut}>
              Sign Out
            </button>
            <div className="navbar__cart" onClick={() => navigate('/cart')}>
              <FaShoppingCart size={24} />
              {totalQuantity > 0 && (
                <span className="cart-count">{totalQuantity}</span>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
