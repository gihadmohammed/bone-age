import React, { useState } from 'react';
import axios from 'axios';
import { useParams, } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaLockOpen, FaSpinner } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import './forgot.css'
function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { uidb64, token } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (password.length < 8 || !/[A-Z]/.test(password) || !/[@$!%*?&]/.test(password) || !/\d/.test(password)) {
      toast.error('Password must be at least 8 characters long and include one uppercase letter, one special character, and one number.');
      return;
    }  

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      setIsLoading(false);
      return;
    }

    axios.post(`http://localhost:8000/Authentication/reset-password/${uidb64}/${token}/`, {
      password: password
    })
    .then(response => {
      setSuccess(response.data.success);
      toast.success(response.data.success);
      setIsLoading(false);
      window.location.replace('/register');
    })
    .catch(error => {
      toast.error(error.response.data.error);
      setPassword('');
      setConfirmPassword('');
      setIsLoading(false);
    });
  }

  if (!uidb64 || !token) {
    return <div>Loading...</div>;
  }

  return (
    <div className="forgot-password-form-container">
      <ToastContainer />
      <h2><FaLockOpen style={{ marginTop: "50px" }} /> Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input type="password" value={password} onChange={event => setPassword(event.target.value)} className="password-input" />
        </label>
        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} className="password-input" />
        </label>
        <button type="submit" disabled={isLoading} style={{ cursor: "pointer",marginTop:'15px' }}>
          {isLoading ? <FaSpinner className="fa-spin"/> : 'Reset Password'}
        </button>
        <span>at least 8 characters, one uppercase, one special character, and one number</span>
      </form>
      <style>
        {`
          button[type="submit"]:disabled svg {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .forgot-password-form-container {
            border: 1px solid #ccc;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            padding: 20px;
            margin-top: 200px;
            margin-left: 500px;
            max-width: 500px;
          } 
        `}
      </style>
    </div>
  );
  
}

export default ResetPassword;
