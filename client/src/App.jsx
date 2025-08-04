import React from 'react'; // This is the crucial addition
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import LandingPage from './pages/LandingPage'; 
import GoatMeatPage from './pages/GoatMeatPage';
import ChickenPage from './pages/ChickenPage';
import SeafoodPage from './pages/SeaFoodPage';
import DairyPage from './pages/DairyProductPage';
import DairySubscriptionPage from './pages/OffersPage';
import AboutUs from './pages/AboutUsPage';
import Contact from './pages/ContactPage';
import LoginPage from './pages/Auth/Login';
import SignupPage from './pages/Auth/SignUp';
import Profile from './pages/ProfilePage'; 
import MultiStepCart from './components/MultiStepCart';
import OtpPage from './pages/Auth/Verification/authotp'; // import OTP page


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/goat" element={<GoatMeatPage />} />
      <Route path="/chicken" element={<ChickenPage />} />
      <Route path="/seafood" element={<SeafoodPage />} />
      <Route path="/dairy" element={<DairyPage />} />
      <Route path="/offers" element={<DairySubscriptionPage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<MultiStepCart />} />
      <Route path="/otp" element={<OtpPage />} />
    </Routes>
  );
}

export default App;