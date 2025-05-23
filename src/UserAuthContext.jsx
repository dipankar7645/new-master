// UserAuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Dipankar',
    email: 'dipankar@example.com',
    photoURL: '/images/default-profile.jpg',
  });

  const updateProfilePhoto = (photoURL) => {
    setUser((prev) => ({ ...prev, photoURL }));
  };

  return (
    <AuthContext.Provider value={{ user, setUser, updateProfilePhoto }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
