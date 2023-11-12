import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Auth from '../utils/auth';

// prop validation
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function PrivateRoute({ children }) {
  const isLoggedIn = Auth.loggedIn(); // Replace with your actual logic to check if logged in

  return isLoggedIn ? children : <Navigate to="/signin" />;
};

