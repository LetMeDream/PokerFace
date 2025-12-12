import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { logUserOut } from '../utils/actions';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

const minutes = 10;
const AUTO_LOGOUT_TIME = minutes * 60 * 1000; // 10 minutes in milliseconds

function AutoLogoutWrapper({ children }: { children: React.ReactNode }) {
  const logoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const keepLoggedIn = useSelector((state: RootState) => state.auth.keepLoggedIn);

  const logoutUser = useCallback(() => {
    // Clear user session data (e.g., localStorage.removeItem('authToken'))
    // Redirect to login page
    logUserOut()
    navigate('/login');
  }, [navigate]);

  const resetLogoutTimer = useCallback(() => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }
    logoutTimer.current = setTimeout(logoutUser, AUTO_LOGOUT_TIME);
  }, [logoutUser]);

  useEffect(() => {
    // Initial setup of the timer
    if (!keepLoggedIn) resetLogoutTimer();

    // Add event listeners for user activity
    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    activityEvents.forEach(event => {
      window.addEventListener(event, resetLogoutTimer);
    });

    // Cleanup function to remove event listeners and clear timer on unmount
    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, resetLogoutTimer);
      });
      if (logoutTimer.current) {
        clearTimeout(logoutTimer.current);
      }
    };
  }, [resetLogoutTimer]);

  return <>{children}</>;
}

export default AutoLogoutWrapper;