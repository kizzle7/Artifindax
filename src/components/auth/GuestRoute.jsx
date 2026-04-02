import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../../services/authService';

/**
 * GuestRoute ensures that authenticated users are redirected away from
 * public pages (like Landing, Login, and Signup) and back to their dashboard.
 */
const GuestRoute = ({ children }) => {
    const token = authService.getToken();
    const role = authService.getRole()?.toUpperCase();
    const signupStep = localStorage.getItem('artifinda_signup_step');

    // If there's a token AND an onboarding process is active, allow them to see the signup page
    if (token && signupStep) {
        console.log('[GuestRoute] Authenticated user in onboarding, allowing access');
        return children;
    }

    if (token) {
        console.log('[GuestRoute] Authenticated user detected, redirecting to dashboard');
        
        // Redirect to the appropriate dashboard based on role
        const destination = role === 'ARTISAN' ? '/artisan/dashboard' : '/dashboard';
        return <Navigate to={destination} replace />;
    }

    // If not authenticated, allow access to the public page (children)
    return children;
};

export default GuestRoute;
