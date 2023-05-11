import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './change.css';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const token = localStorage.getItem('token');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newPassword1.length < 8 || !/[A-Z]/.test(newPassword1) || !/[@$!%*?&]/.test(newPassword1) || !/\d/.test(newPassword1)) {
        toast.error('Password must be at least 8 characters long and include one uppercase letter, one special character, and one number.');
        return;
    }

    axios.post('http://localhost:8000/Authentication/change-password/', {
        old_password: oldPassword,
        new_password1: newPassword1,
        new_password2: newPassword2,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    .then(response => {
      console.log(response.data.success);
      // Do something on success, such as redirecting to a success page
    })
    .catch(error => {
      const errors = error.response.data.errors;
      Object.keys(errors).forEach(field => {
        errors[field].forEach(error => {
          toast.error(error);
        });
      });
    });
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2 className="form-title">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="old_password">Old Password</label>
            <input type="password" id="old_password" name="old_password" className="form-control" onChange={(event) => setOldPassword(event.target.value)} required />
          </div>
          <div className="form-group">
  <label htmlFor="new_password1">New Password</label>
  <div className="password-input">
    <input
      type={showNewPassword ? "text" : "password"}
      id="new_password1"
      name="new_password1"
      className="form-control2"
      onChange={(event) => setNewPassword1(event.target.value)}
      required
    />
    <span className="password-toggle" onClick={() => setShowNewPassword(!showNewPassword)}>
      {showNewPassword ? <VisibilityOff /> : <Visibility />}
    </span>
  </div>
  <p className="password-hint">Password must be at least 8 characters long and include one uppercase letter, one special character, and one number.</p>
</div>

<div className="form-group">
  <label htmlFor="new_password2">Confirm New Password</label>
  <div className="password-input">
    <input
      type={showConfirmNewPassword ? "text" : "password"}
      id="new_password2"
      name="new_password2"
      className="form-control"
      onChange={(event) => setNewPassword2(event.target.value)}
      required
    />
    <span className="password-toggle" onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
      {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
    </span>
  </div>
</div>
          <button type="submit" className="change-button">Change Password</button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;