import React from 'react';
import { Navigate } from 'react-router-dom';

const requireAuth = (Component) => {
  return class extends React.Component {
    render() {
      const isAuthenticated = localStorage.getItem('token') !== null;
      if (!isAuthenticated) {
        return <Navigate to="/access-denied" replace />;
      }
      return <Component {...this.props} />;
    }
  };
};

export default requireAuth;
