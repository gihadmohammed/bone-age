import React from 'react';
import { Link } from 'react-router-dom';

class AccessDenied extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          background: '#f7f7f7',
        }}
      >
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#222',
            marginBottom: '1rem',
          }}
        >
          Access Denied
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '1rem' }}>
          You must be logged in to access this page.
        </p>
        <Link
          to="/"
          style={{
            padding: '0.8rem 2.2rem',
            background: '#007bff',
            color: '#fff',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            borderRadius: '5px',
            textDecoration: 'none',
          }}
        >
          Back to Home
        </Link>
      </div>
    );
  }
}

export default AccessDenied;
