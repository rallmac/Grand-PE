import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landing";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import PlantsPage from "./pages/plants";
import SolarPage from "./pages/solar";
import TechPage from "./pages/tech";
import TranslatePage from "./pages/translate";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import SetPassword from "./pages/SetPassword";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AdminPublicRoute from "./components/AdminPublicRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Cart from "./pages/Cart";
import NewSignup from "./pages/NewSignup";
import IdePage from "./pages/IdePage";
import AdminSignIn from "./pages/AdminSignIn";
import AdminRegister from "./pages/AdminRegister";
import AdminSetPassword from "./pages/AdminSetPassword";
import AdminResetPassword from "./pages/AdminResetPassword";
import AdminDashboard from "./pages/AdminDashboard";
import AdminForgotPassword from "./pages/AdminForgotPassword";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import SuperAdminSignIn from "./pages/SuperAdminSignIn";
import SuperAdminProtectedRoute from "./components/SuperAdminProtectedRoute";
import CreateProduct from "./pages/CreateProduct";
import Settings from "./pages/Settings";


//This file connects all the pages in the application
//The connection is done by importing the pages and
//routing them into a clearly defined link. 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/plants" element={<PlantsPage />} />
        <Route path="/solar" element={<SolarPage />} />
        <Route path="/tech" element={<TechPage />} />
        <Route path="/translate" element={<TranslatePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/new-signup" element={<NewSignup />} />
        <Route path="/ide-page" element={<IdePage />} />
        <Route path="/admin-signin" element={<AdminPublicRoute><AdminSignIn /></AdminPublicRoute>} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/admin-set-password" element={<AdminSetPassword />} />
        <Route path="/admin-reset-password" element={<AdminResetPassword />} />
        <Route path="/admin-dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
        <Route path="/admin-forgot-password" element={<AdminForgotPassword />} />
        <Route path="/super-admin-signin" element={<SuperAdminSignIn />} />
        <Route path="/super-admin-dashboard" element={<SuperAdminProtectedRoute><SuperAdminDashboard /></SuperAdminProtectedRoute>} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/create-product" element={<AdminProtectedRoute><CreateProduct /></AdminProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;