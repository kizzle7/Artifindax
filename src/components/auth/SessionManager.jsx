import React, { useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../../services/authService';
import toast from 'react-hot-toast';

const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds

const SessionManager = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const timeoutRef = useRef(null);
    const lastActivityRef = useRef(Date.now());

    const logout = useCallback(() => {
        const token = authService.getToken();
        if (!token) return;

        console.warn('[SessionManager] Session expired due to inactivity');
        authService.clearToken();
        
        // Use a slight delay to ensure toast is seen or state is cleared
        toast.error('Session expired due to inactivity. Please login again.');
        
        // Prevent infinite loops if already on login
        if (window.location.pathname !== '/login') {
            console.log('[SessionManager] Redirecting to login...');
            window.location.href = window.location.origin + '/login';
        }
    }, [navigate, location]);

    const resetTimer = useCallback(() => {
        const now = Date.now();
        lastActivityRef.current = now;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            const idleTime = Date.now() - lastActivityRef.current;
            if (idleTime >= SESSION_TIMEOUT) {
                logout();
            }
        }, SESSION_TIMEOUT);
    }, [logout]);

    useEffect(() => {
        const events = ['mousedown', 'keydown', 'touchstart', 'scroll', 'mousemove'];
        
        const handleActivity = () => {
             resetTimer();
        };

        // Only start monitoring if the user is logged in
        const token = authService.getToken();
        if (token) {
            resetTimer();
            events.forEach(event => window.addEventListener(event, handleActivity));
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            events.forEach(event => window.removeEventListener(event, handleActivity));
        };
    }, [resetTimer, location.pathname]); // Re-run when route changes to check token

    return <>{children}</>;
};

export default SessionManager;
