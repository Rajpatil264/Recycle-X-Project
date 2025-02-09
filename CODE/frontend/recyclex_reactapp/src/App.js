import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Import routing components
import UserTypeSelection from "./components/UserTypeSelection";
import SupplierLogin from "./components/supplier/SupplierLogin"; // Create this component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserTypeSelection />} />
        <Route path="/supplier/login" element={<SupplierLogin />} />
      </Routes>
    </Router>
  );
};

export default App;