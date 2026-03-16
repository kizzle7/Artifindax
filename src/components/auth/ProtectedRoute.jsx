import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import authService from '../../services/authService';

const ProtectedRoute = ({ children, requiredRole }) => {
    const token = authService.getToken();
    const role = authService.getRole()?.toUpperCase();
    const location = useLocation();

    console.log('[ProtectedRoute] Check:', { path: location.pathname, hasToken: !!token, role, requiredRole });

    if (!token) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requiredRole && role !== requiredRole.toUpperCase()) {
        console.warn(`[ProtectedRoute] Role mismatch for ${location.pathname}. Expected: ${requiredRole}, Got: ${role}`);
        
        // Determine destination based on actual role
        const destination = role === 'ARTISAN' ? '/artisan/dashboard' : '/dashboard';
        
        // AVOID INFINITE REDIRECT: If we're already at the destination, don't redirect again
        if (location.pathname === destination) {
            console.log('[ProtectedRoute] Already at destination, preventing infinite loop');
            return children;
        }

        return <Navigate to={destination} replace />;
    }

    return children;
};

export default ProtectedRoute;
