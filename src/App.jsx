import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/UserDashboard';
import ArtisanDashboard from './pages/ArtisanDashboard';
import PaymentVerifyPage from './pages/PaymentVerifyPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SessionManager from './components/auth/SessionManager';

function App() {

  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
            fontSize: '13px',
            fontWeight: 'bold',
            borderRadius: '10px',
          },
          success: {
            style: {
              background: '#1E4E82',
            },
          },
        }}
      />
      <SessionManager>
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
          
          {/* Payment verification callback route (Paystack redirect) */}
          <Route path="/verify-payment" element={<PaymentVerifyPage />} />

          {/* Redirect any unknown routes to landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SessionManager>
    </>
  );
}

export default App;
