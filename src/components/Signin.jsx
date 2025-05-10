// src/components/Auth.jsx
import React, { useState } from 'react';
import './SignIn.css';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordPattern.test(password)) {
      alert(
        'Password must be at least 8 characters, with upper & lower case, a number, and a special character.'
      );
      return;
    }

    if (isSignIn) {
      console.log('Sign In with:', email, password);
    } else {
      console.log('Sign Up with:', name, email, password);
    }
  };

  return (
    <div className="auth">
      <h2>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        {!isSignIn && (
          <div className="auth__field">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
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
      <p onClick={toggleMode} className="auth__toggle">
        {isSignIn
          ? "Don't have an account? Sign Up"
          : 'Already have an account? Sign In'}
      </p>
    </div>
  );
};

export default Auth;
