import React, { useState, useEffect } from 'react';
import { useAuth } from '../UserAuthContext';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signin, signup } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
    setName('');
    setEmail('');
    setPassword('');
    setError('');
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignIn) {
      const success = signin(email.trim(), password.trim());
      if (success) {
        navigate('/');
      } else {
        setError('Email or password is incorrect!');
      }
    } else {
      if (!name.trim()) {
        setError('Please enter your name');
        return;
      }
      const success = signup(name.trim(), email.trim(), password.trim());
      if (success) {
        navigate('/');
      } else {
        setError('Signup failed');
      }
    }
  };

  return (
    <div className="auth">
      <h2>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>

      {error && <div className="auth__error">{error}</div>}

      <form onSubmit={handleSubmit}>
        {!isSignIn && (
          <div className="auth__field">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required={!isSignIn}
            />
          </div>
        )}
        <div className="auth__field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
          />
        </div>
        <div className="auth__field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            required
          />
        </div>
        <button type="submit" className="btn btn--primary">
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      <p
        onClick={toggleMode}
        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
      >
        {isSignIn
          ? "Don't have an account? Sign Up"
          : 'Already have an account? Sign In'}
      </p>
    </div>
  );
};

export default Auth;
