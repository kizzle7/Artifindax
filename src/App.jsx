import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/UserDashboard';
import ArtisanDashboard from './pages/ArtisanDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/signup/:role" element={<SignUpPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute requiredRole="CUSTOMER">
            <UserDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/artisan/dashboard" 
        element={
          <ProtectedRoute requiredRole="ARTISAN">
            <ArtisanDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Redirect any unknown routes to landing page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
