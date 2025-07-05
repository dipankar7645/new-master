// src/UserAuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Dummy signin function
  const signin = (email, password) => {
    // You can replace this with real auth logic
    if (email === 'test@example.com' && password === 'password') {
      setUser({ name: 'Test User', email, photoURL: '/images/profile.jpg' });
      return true;
    }
    return false;
  };

  // ✅ Dummy signup function
  const signup = (name, email, password) => {
    if (name && email && password) {
      setUser({ name, email, photoURL: '/images/profile.jpg' });
      return true;
    }
    return false;
  };

  // ✅ Signout function
  const signout = () => {
    setUser(null);
  };

  // ✅ Optional: update profile photo
  const updateProfilePhoto = (photoURL) => {
    setUser((prev) => ({ ...prev, photoURL }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signin,
        signup,
        signout,
        setUser,
        updateProfilePhoto,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth context
export const useAuth = () => useContext(AuthContext);
