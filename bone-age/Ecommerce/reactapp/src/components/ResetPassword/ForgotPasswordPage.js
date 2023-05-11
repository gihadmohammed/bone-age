import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaKey, FaLock, FaSpinner } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/Authentication/forgot-password/', { email });
      toast.success(response.data.success);
      setIsSubmitted(true);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-form-container">
      <h2><FaKey style={{ marginTop: "50px" }} /> Forgot Password</h2>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <label>
            <span>Email:</span>
            <input style={{marginBottom:"20px"}}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button type="submit" disabled={isLoading} style={{ cursor: "pointer", marginTop: '10px' }}>
            {isLoading ? (
              <FaSpinner style={{ marginRight: "5px" }} />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      ) : (
        <p>Check your email for instructions on how to reset your password.</p>
      )}
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

export default ForgotPasswordForm;
