import React, { useState } from 'react';
import axios from 'axios';
import "./Register.css";
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, setUser } from 'react';
import { Link, Navigate,Route, Routes } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LandingPageUser from '../landingPage/LandingPageUser';

const cookies = new Cookies();


function RegistrationPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber,setPhoneNumber]= useState('')
  const [hospitalName, sethospitalname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginUsername, setLoginusername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);  
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);



  
  
  window.onload = function() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container-r');
      
    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active-r");
    });
      
    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active-r");
    });
  };

  
  // const toggleShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };
  

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    const phoneNumberRegex = /^01\d{9}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      toast.error('Please enter a valid 11-digit phone number starting with 01.');
      return;
    }
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[@$!%*?&]/.test(password) || !/\d/.test(password)) {
      toast.error('Password must be at least 8 characters long and include one uppercase letter, one special character, and one number.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address!');
      return;
    }
    const userData = {
      first_name: firstName,
      last_name: lastName,
      username: userName,
      // Address: address, 
      email: email,
      PhoneNumber: phoneNumber,
      hospital_name: hospitalName,
      password: password
    };
    if (navigator.connection && navigator.connection.type !== 'none'){
      try {
        const response = await axios.post('http://localhost:8000/Authentication/register/', userData);
        console.log(response.data);
        toast.success('Registration Successful. Please Verify Your Email');
      } catch (error) {
        console.error(error);
        if (error.response.status === 400) {
          if (error.response.data.username) {
            toast.error('A User with that Username Already Exists');
          }
          if (error.response.data.email) {
            toast.error('A User With That Email Already Exists');
          }
        }
        toast.error(error.response.data.message);
      }
    } else {
      toast.error('Please check your internet connection');
    }
    };
    
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const userDataLogin={
      username: loginUsername,
      password: loginPassword
    }
    try {
      const responseLogin = await axios.post('http://localhost:8000/Authentication/login/', userDataLogin);
      console.log(responseLogin.data);
      // console.log(responseLogin.data.profile);
      console.log(responseLogin.data.token);
      // const users = responseLogin.data.user
      // localStorage.setItem('user', JSON.stringify(responseLogin.data.profile))

      // let user_id = jwt_decode(responseLogin.data.access).user_id;
         
      
      // console.log(responseLogin.PhoneNumber);
      localStorage.setItem('token', responseLogin.data.token);
      // console.log(userDetails.first_name);  
      toast.success('login successful!');
      if (responseLogin.status === 200) {
        setLoggedIn(true);
        let userDetails = JSON.parse(localStorage.getItem('user'));
         console.log('Successfully logged in')
      }
    } catch (error) {
      if(error.response.status === 404){
        toast.error("Invalid credentials.")
      }
      else{
       console.error(error); 
       toast.error(error.response.data.detail); 
    }

    }   
  };
 

  


  return (
    <body className='contact-page'>
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />

    <div class="container-r" id="container-r">
      <div class="form-container-r sign-up-container-r">
        <form action="#">
          <h1
          style={{ fontWeight: 'bold',
                 fontSize:'35px'
        }}
          >Create Account</h1>
          <div class="social-container">
            <a 
            style={{

            }}
            
            href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
       

          <input type="Username" placeholder="UserName" value={userName} 
             style={{
              backgroundColor: 'eee',
              border: 'none',
              padding: '12px 15px',
              margin: '3px 0',
              width: '100%',
              height: '30px',
              fontSize:'14px',
              fontWeight:'640',
             }}
          onChange={(e) => setUserName(e.target.value)}  />
          <input type="text" placeholder="First Name" value={firstName} 
           style={{
            backgroundColor: 'eee',
            border: 'none',
            padding: '12px 15px',
            margin: '3px 0',
            width: '100%',
            height: '30px',
            fontSize:'14px',
            fontWeight:'640',
          }}
          onChange={(e) =>setFirstName(e.target.value)}  />
          <input type="text" placeholder="Last Name" value={lastName}
           style={{
            backgroundColor: 'eee',
            border: 'none',
            padding: '12px 15px',
            margin: '3px 0',
            width: '100%',
            height: '30px',
            fontSize:'14px',
            fontWeight:'640',
          }} 
          onChange={(e) => setLastName(e.target.value)} />
          <input type="email" placeholder="Email" value={email}
           style={{
            backgroundColor: 'eee',
            border: 'none',
            padding: '12px 15px',
            margin: '3px 0',
            width: '100%',
            height: '30px',
            fontSize:'14px',
            fontWeight:'640',
          }}
          onChange={(e) => setEmail(e.target.value)} />
          {/* <input type="Address" placeholder="Address" value={address}
           style={{
            backgroundColor: 'eee',
            border: 'none',
            padding: '12px 15px',
            margin: '3px 0',
            width: '100%',
            height: '30px',
            fontSize:'14px',
            fontWeight:'640',
          }}
          onChange={(e) => setAddress(e.target.value)} /> */}
          <input type="Phone Number" placeholder="Phone number" value={phoneNumber}
          style={{
            backgroundColor: 'eee',
            border: 'none',
            padding: '12px 15px',
            margin: '3px 0',
            width: '100%',
            height: '30px',
            fontSize:'14px',
            fontWeight:'640',
            // fontFamily: 'Montserrat',
           }}onChange={(e) => setPhoneNumber(e.target.value)} />
          <div className="password-input-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Password"
          value={password}
          style={{
            backgroundColor: 'eee',
            border: 'none',
            padding: '12px 15px',
            margin: '3px 0',
            width: '100%',
            height: '30px',
            fontSize:'14px',
            fontWeight:'640',
          }}
          onChange={(e) => setPassword(e.target.value)}
        />

      </div>
          <span>at least 8 characters, one uppercase, one special character, and one number</span>
          <input type="password" placeholder="Confirm Password" value={confirmPassword} 
           style={{
            backgroundColor: 'eee',
            border: 'none',
            padding: '12px 15px',
            margin: '3px 0',
            width: '100%',
            height: '30px',
            fontSize:'14px',
            fontWeight:'640',
          }}
          onChange={(e) => setConfirmPassword(e.target.value)} />
          <input
           style={{
            backgroundColor: 'eee',
            border: 'none',
            padding: '12px 15px',
            margin: '3px 0',
            width: '100%',
            height: '30px',
            fontSize:'14px',
            fontWeight:'640',
          }}
          
          className='fadeInDisplayName' type="text" placeholder="Hospital Name" value={hospitalName} onChange={(e) => sethospitalname(e.target.value)} />

          <div
           style={{
            paddingTop:"10px",
   
            }}
          >

          </div>
          <button className='button-Reg' onClick={handleSubmitRegister}>Sign Up</button>
        </form>
      </div>
      <div class="form-container-r sign-in-container-r">
        <form action="#">
          <h1
                    style={{ fontWeight: 'bold',
                    margin: 0,

                  }}

          >Sign in</h1>
          <div class="social-container">
            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your account</span>
          <input type="Username" placeholder="UserName" value={loginUsername} 
           style={{
            backgroundColor: 'eee',
            border: 'none',
            padding: '12px 15px',
            margin: '3px 0',
            width: '100%',
            height: '30px',
            fontSize:'15px',
            fontWeight:'640',
          }}
          onChange={(e) => setLoginusername(e.target.value)}  />
          <input 
           style={{
            fontColor: '080808',
            border: 'none',
            padding: '12px 15px',
            margin: '3px 0',
            width: '100%',
            height: '30px',
            fontSize:'15px',
            fontWeight:'640',
          }}
          
          type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
          <a href="/forgotpassword">Forgot your password?</a>
          <div>
      <button
        
      className='button-Reg' onClick={handleSubmitLogin}>Sign In</button>
      {loggedIn && <Navigate to="/Userpage" />}
    </div>
        </form>
      </div>
      <div class="overlay-container-r">
        <div class="overlay-r">
          <div class="overlay-panel-r overlay-left-r">
            <h1
             style={{ fontWeight: 'bold',
             margin: 0,

            }}

            
            >Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button class="ghost" id="signIn">Sign In</button>
          </div>
          <div class="overlay-panel-r overlay-right-r">
            <h1
                style={{ fontWeight: 'bold',

              }}

            >Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button class="ghost" id="signUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    

    </div>
    </body>
  );
}

export default RegistrationPage;