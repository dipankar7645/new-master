import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Nav from './components/Nav';
import Herosection from './components/Herosection';
import Categories from './components/Categories';
import AllCategories from './components/AllCategories';
import Footer from './components/Footer';
import SignIn from './components/Signin';
import Pizza from './components/Pizza';
import Burger from './components/Burger';
import IceCream from './components/IceCream';
import Cart from './components/Cart';
import Checkout from './components/CheckOut';
import ThankYou from './components/ThankYou';
import OrderSuccess from './components/OrderSuccess';
import Payment from './components/Payment';
import { CartProvider } from './components/CartContext';
import User from './components/User';
import { AuthProvider, useAuth } from './UserAuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" />;
};

function AppContent() {
  const location = useLocation();
  const showFooter = location.pathname === '/';

  return (
    <>
      <Header />
      <Nav />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Herosection />
              <Categories />
              <AllCategories />
            </ProtectedRoute>
          }
        />
        <Route path="/pizza" element={<ProtectedRoute><Pizza /></ProtectedRoute>} />
        <Route path="/burger" element={<ProtectedRoute><Burger /></ProtectedRoute>} />
        <Route path="/icecream" element={<ProtectedRoute><IceCream /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/order-success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
        <Route path="/thankyou" element={<ProtectedRoute><ThankYou /></ProtectedRoute>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<User />} />
      </Routes>

      {showFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
