import React from 'react';
import { Link } from 'react-router-dom';

class NoMatchesFound extends React.Component {
  render() {
    const isAuthenticated = localStorage.getItem('token') !== null;
    const linkUrl = isAuthenticated ? '/Userpage' : '/';
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
      No Matching Results Found
    </h1>
    <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '1rem' }}>
      We're sorry, but we couldn't find any results for your search.
    </p>
    <Link
      to={linkUrl}
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

export default NoMatchesFound;
