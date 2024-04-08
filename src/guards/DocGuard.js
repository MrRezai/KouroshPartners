import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// pages
import LoginConnectWallet from '../pages/auth/ConnectWallet';
import Login from '../pages/auth/Login';
import DocVerify from '../pages/auth/DocVerify';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

DocGuard.propTypes = {
  children: PropTypes.node,
};

export default function DocGuard({ children }) {
  const { isAuthenticated, isInitialized, user } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (!user.Authentication) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <DocVerify />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
