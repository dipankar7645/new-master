import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Nav from './components/Nav';
import Herosection from './components/Herosection';
import Categories from './components/Categories';
import AllCategories from './components/AllCategories';
import Footer from './components/Footer';
import SignIn from './components/Signin';
import Pizza from './components/Pizza';  // Note: Capital P
import Cart from './components/Cart';    // <-- Import Cart here

import { CartProvider } from './components/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
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
                <Pizza />
                <Cart />   {/* Now Cart is defined and imported */}
              </>
            }
          />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
