// src/components/Header.jsx
import React from 'react';
import { useAuth } from '../UserAuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signout();
    navigate('/signin');
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link> |{' '}
        {user ? (
          <>
            <span>Welcome, {user.name || user.email}</span> |{' '}
            <Link to="/profile">Profile</Link> |{' '}
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <Link to="/signin">Sign In</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
