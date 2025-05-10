// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Nav from './components/Nav';
import Herosection from './components/Herosection';
import Categories from './components/Categories';
import AllCategories from './components/AllCategories';
import Footer from './components/Footer';
import SignIn from './components/Signin';

function App() {
  return (
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
            </>
          }
        />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
