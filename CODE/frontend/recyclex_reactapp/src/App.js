import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserTypeSelection from "./components/UserTypeSelection";
import SupplierLogin from "./components/supplier/SupplierLogin";
import ConsumerLogin from "./components/consumer/ConsumerLogin";
import SupplierRegistration from "./components/supplier/SupplierRegister";
import ConsumerRegister from "./components/consumer/ConsumerRegister";
import OtpVerification from "./components/consumer/OtpVerification";
import SupplierHomePage from "./components/supplier/SupplierHomePage";
import AboutUsPage from "./components/AboutUsPage";
import SupplierProfile from "./components/supplier/SupplierProfile";
import ContactPage from "./components/ContactPage";
import SupplierCart from "./components/supplier/SupplierCart";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserTypeSelection />} />
        <Route path="/supplier/login" element={<SupplierLogin />} />
        <Route path="/supplier/register" element={<SupplierRegistration />} /> {/* Correct component */}
        <Route path="/supplier/dashboard" element={<SupplierHomePage />} />
        <Route path="/supplier/profile" element={<SupplierProfile />} />
        <Route path="/supplier/cart" element={<SupplierCart />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/consumer/login" element={<ConsumerLogin />} />
        <Route path="/consumer/register" element={<ConsumerRegister />} />
        <Route path="/consumer/otp-verification" element={<OtpVerification />} />
      </Routes>
    </Router>
  );
};

export default App;