import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Nav from './components/Nav';
import Herosection from './components/Herosection';
import Categories from './components/Categories';
import AllCategories from './components/AllCategories';
import Footer from './components/Footer';
import SignIn from './components/Signin';
import Pizza from './components/Pizza';
import Burger from './components/Burger';
import Cart from './components/Cart';
import Checkout from './components/CheckOut';
import ThankYou from './components/ThankYou';
import OrderSuccess from './components/OrderSuccess';
import Payment from './components/Payment';
import { CartProvider } from './components/CartContext';

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
            <>
              <Herosection />
              <Categories />
              <AllCategories />
            </>
          }
        />
        <Route path="/pizza" element={<Pizza />} />
         <Route path="/burger" element={<Burger />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>

      {showFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}



export default App;
