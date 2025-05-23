// src/UserAuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Signup stores name & email
  const signup = (name, email, password) => {
    setUser({ name, email });
    return true;
  };

  // Signin uses email to create a name from email prefix
  const signin = (email, password) => {
    if (email && password) {
      const nameFromEmail = email.split('@')[0];
      setUser({ name: nameFromEmail, email });
      return true;
    }
    return false;
  };

  const signout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
