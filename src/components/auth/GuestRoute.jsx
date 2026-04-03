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

    const storedUserType = localStorage.getItem('artifinda_signup_type');

    if (token) {
        // If an artisan has incomplete onboarding, force them to the signup flow
        if (storedUserType === 'artisan' && signupStep && parseInt(signupStep, 10) < 21) {
            // Only redirect if they aren't already on the signup route to prevent infinite loops
            if (window.location.pathname.startsWith('/signup')) {
                return children;
            }
            console.log('[GuestRoute] Authenticated artisan with incomplete onboarding, redirecting to signup');
            return <Navigate to="/signup" replace />;
        }

        console.log('[GuestRoute] Authenticated user detected, redirecting to dashboard');
        
        // Redirect to the appropriate dashboard based on role
        const destination = role === 'ARTISAN' ? '/artisan/dashboard' : '/dashboard';
        return <Navigate to={destination} replace />;
    }

    // If not authenticated, allow access to the public page (children)
    return children;
};

export default GuestRoute;
