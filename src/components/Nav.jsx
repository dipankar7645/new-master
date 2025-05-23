import React from 'react';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { useCart } from '../components/CartContext';
import { useAuth } from '../UserAuthContext';
import { useNavigate } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
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

      <ul className="navbar__links">
        <li><span onClick={() => navigate('/')} className="nav-link">Home</span></li>
        <li><span onClick={() => navigate('/pizza')} className="nav-link">Pizza</span></li>
        <li><span onClick={() => navigate('#about')} className="nav-link">About</span></li>
        <li><span onClick={() => navigate('#contact')} className="nav-link">Help</span></li>
      </ul>

      <div className="navbar__auth">
        {!user ? (
          <button className="btn btn--outline" onClick={handleSignIn}>
            Sign In
          </button>
        ) : (
          <>
            <div className="navbar__profile" onClick={() => navigate('/profile')} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <FaUserCircle size={28} />
              <span>Hello, {user.name}</span>
            </div>
            <button className="btn btn--outline" onClick={handleSignOut}>
              Sign Out
            </button>
            <div className="navbar__cart" onClick={() => navigate('/cart')} style={{position: 'relative', cursor: 'pointer'}}>
              <FaShoppingCart size={24} />
              {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
