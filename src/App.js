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
import Coffee from './components/Coffee';
import Vegan from './components/Vegan';
import Chicken from './components/Chicken';
import Thali from './components/Thali';
import FriedRice from './components/FriedRice';
import NorthIndian from './components/NorthIndian';
import Dosa from './components/Dosa';
import Rolls from './components/Rolls';
import Momos from './components/Momos';
import Lassi from './components/Lassi';
import Tea from './components/Tea';
import Rasmalai from './components/Rasmalai';
import Coldcoffee from './components/Coldcoffee';
import Biryani from './components/Biryani';
import Cutlet from './components/Cutlet';
import VadaPav from './components/VadaPav';
import Cake from './components/Cake';
import Cart from './components/Cart';
import Checkout from './components/CheckOut';
import ThankYou from './components/ThankYou';
import OrderSuccess from './components/OrderSuccess';
import TrackOrder from './components/TrackOrder';
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
        <Route path="/Coffee" element={<ProtectedRoute><Coffee /></ProtectedRoute>} />
        <Route path="/vegan" element={<ProtectedRoute><Vegan /></ProtectedRoute>} />
        <Route path="/chicken" element={<ProtectedRoute><Chicken /></ProtectedRoute>} />
        <Route path="/thali" element={<ProtectedRoute><Thali /></ProtectedRoute>} />
        <Route path="/friedrice" element={<ProtectedRoute><FriedRice /></ProtectedRoute>} />
        <Route path="/northindian" element={<ProtectedRoute><NorthIndian /></ProtectedRoute>} />
        <Route path="/dosa" element={<ProtectedRoute><Dosa /></ProtectedRoute>} />
        <Route path="/rolls" element={<ProtectedRoute><Rolls /></ProtectedRoute>} />
        <Route path="/momos" element={<ProtectedRoute><Momos /></ProtectedRoute>} />
        <Route path="/lassi" element={<ProtectedRoute><Lassi /></ProtectedRoute>} />
        <Route path="/tea" element={<ProtectedRoute><Tea /></ProtectedRoute>} />
        <Route path="/rasmalai" element={<ProtectedRoute><Rasmalai /></ProtectedRoute>} />
        <Route path="/coldcoffee" element={<ProtectedRoute><Coldcoffee /></ProtectedRoute>} />
        <Route path="/biryani" element={<ProtectedRoute><Biryani /></ProtectedRoute>} />
        <Route path="/cutlet" element={<ProtectedRoute><Cutlet /></ProtectedRoute>} />
        <Route path="/vadapav" element={<ProtectedRoute><VadaPav /></ProtectedRoute>} />
        <Route path="/cake" element={<ProtectedRoute><Cake /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
         <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/track-order" element={<TrackOrder />} />
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
