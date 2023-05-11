import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Profile.css';
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";
import { Link, Navigate,Route, Routes } from 'react-router-dom';
import requireAuth from '../Layout/requireAuth';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";



function ProfileEditForm() {
const token = localStorage.getItem('token');
const [userDetails, setProfileData] = useState([]);
 
  useEffect(() => {
    axios.get('http://localhost:8000/Authentication/get_profile/'
    , {
      headers: {
        Authorization: `Bearer ${token}`
      }})
    .then((response) => {
       setProfileData(response.data);
       setUser(response.data.username);
       setEmail(response.data.email);
       setName(response.data.first_name)
       setNaame(response.data.last_name)
       setPhoneNumber(response.data.PhoneNumber)
       setDisplayname(response.data.DisplayName)
       setAddress(response.data.Address)
       setImg(response.data.Img)
      console.log(response.data.user)})
      .catch((error) => {
        console.error(error);
      }); 
  
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/access-denied";
    }
  }, []);



  

  // console.log(user);
  const role = userDetails.Role;
  const [first_name, setName] = useState(userDetails.first_name);
  const [email, setEmail] = useState(userDetails.email);
  const [last_name, setNaame] = useState(userDetails.last_name);
  const [PhoneNumber, setPhoneNumber] = useState(userDetails.PhoneNumber);
  const [Address, setAddress] = useState(userDetails.Address);
  const [username , setUser] = useState(userDetails.username);
  const [DisplayName , setDisplayname] = useState(userDetails.DisplayName);
  const [Img, setImg] = useState(userDetails.Img);

  console.log(userDetails.Img)
  // setImg(userDetails.Img)
    function handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result); 
        // console.log(Img);
      };
      reader.readAsDataURL(file);
    }
    useEffect(() => {
      setImg(Img);
    }, [Img]);
  console.log(Img)  
  const fileInput = document.getElementById('file-input');
  const handleSubmit= (e) => {
    e.preventDefault();
    const formData = new FormData();
    
 
    let UsernameRegex = /^(?=[a-zA-Z0-9.]{1,20}$)(?!.*[.]{2})[^.].*[^.]$/
    if (!UsernameRegex.test(username)){
      setUser(userDetails.username)
     toast.error('Please enter a valid username.');
     return;
   }

  //  let AddressRegex = /^\w+([\.-]?\w+)$/
  //  if (!Address){
  //    setAddress(userDetails.Address)
  //   toast.error('Please enter a valid Address.');
  //   return;
  // }


    let EmailRegex= /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
    if (!EmailRegex.test(email)){
      setEmail(userDetails.email)
     toast.error('Please enter a valid email.');
     return;
   }
  
   let result = /^[a-zA-Z ]+$/
   if (!result.test(first_name) ){
      setName(userDetails.first_name)
     toast.error('Please enter a valid name.');
     return;
   }

   if (!result.test(last_name)){
     setNaame(userDetails.last_name)
    toast.error('Please enter a valid name.');
    return;
  }

    const phoneNumberRegex = /^01\d{9}$/;
    if (!phoneNumberRegex.test(PhoneNumber)) {
      setPhoneNumber(userDetails.PhoneNumber)
      toast.error('Please enter a valid 11-digit phone number starting with 01.');
      return;
    }
    if (fileInput.files[0] != null){
    formData.append('Img', fileInput.files[0]);
  
  }

    const url = 'http://localhost:8000/Authentication/api/edit_profile/';
    // console.log(Img);
    
    const config = {
      headers: {  
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    // console.log("seif")
    const imgFile = formData.get('Img');
    if (imgFile==null){
      // imgFile=userDetails.Img
      axios({
        method: 'PUT',
        url: url,
        data: {
          first_name: first_name,
          email: email,
          last_name: last_name,
          PhoneNumber: PhoneNumber,
          username: username,
          Address: Address,
          DisplayName: DisplayName,
          // Img: imgFile,
        },
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
  
        }
      })
      
      
      .then(response => {
  
  
        localStorage.setItem('user', JSON.stringify(response.data.user))
  
        toast.success('Your profile was successfully updated')
  
        
      })
      .catch(error => {
        // console.log(error.response.data);
        toast.error(error.response.data.message);
  
        
      });
    }
  
   
    // console.log('Img file name:', imgFile.name);
    // console.log('Img file type:', imgFile.type);
    // console.log('Img file size:', imgFile.size);
   else { axios({
      method: 'PUT',
      url: url,
      data: {
        first_name: first_name,
        email: email,
        last_name: last_name,
        PhoneNumber: PhoneNumber,
        username: username,
        Address: Address,
        DisplayName: DisplayName,
        Img: imgFile,
      },
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`

      }
    })
    
    
    .then(response => {


      localStorage.setItem('user', JSON.stringify(response.data.user))

      toast.success('Your profile was successfully updated')

      
    })
    .catch(error => {
      // console.log(error.response.data);
      toast.error(error.response.data.message);

      
    });
  }

} 
  

  return (
    
    <div class="form-wrapper-profile-unique"
    style={{display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: '110vh',
    backgroundColor:'#f5f5f5'
    // width: '210vh',
    }}>
 <div class="form-profile-unique">
   <div class="container d-flex justify-content-center">
     <div class="p-4 rounded" style={{height: 'fit-content',}}>
     <div className="row">
       <div className="col-md-3 border-right profile-image-section-unique">
         <div className="d-flex flex-column align-items-center text-center p-3 py-5">
           
         <div style={{ position: 'relative' }}>
 <img className="rounded-circle mt-5 profile-image fadeInDisplayName" width="150px" src={Img}alt="Profile" />
 <input
   type="file"
   id="file-input"
   onChange={handleFileUpload}
   style={{
     opacity: 0,
     position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: '100%',
     height: '100%',
     zIndex: 1,
     cursor: 'pointer'
   }}
 />
</div>
<button
 className="upload-btn profile-image-upload-btn-unique fadeInDisplayName"
 type="button"
 style={{
   zIndex: 0,
   position: 'relative',
   backgroundColor: '#C0C0C0',
   color: '#fff',
   border: 'none',
   borderRadius: '20px',
   padding: '8px 16px',
   cursor: 'pointer',
   marginTop: '10px'
 }}
 onClick={() => document.getElementById('file-input').click()}
>
 Upload Image
</button>
           <span className="font-weight-bold"
           style={{
            fontSize: '15px',

           }}
           
           > {first_name}  {last_name}</span>
           {role === "VENDOR" && (
             <span className="font-weight-bold"
             style={{
              fontSize: '15px',
  
             }}
             >{DisplayName}</span>
           )}
           <span className="text-black-50 email-p"
           style={{
            fontSize: '15px',
            // fontWeight: 'bold',


           }}
           
           >{email}</span>
            <button  style={{
   zIndex: 0,
   position: 'relative',
   backgroundColor: '#C0C0C0',
   color: '#fff',
   border: 'none',
   borderRadius: '20px',
   padding: '8px 16px',
   cursor: 'pointer',
   marginTop: '10px'
 }} onClick={() => window.location.href="http://localhost:3000/change"}>
            Change Password
            </button>
         </div>
       </div>
       <div className="col-md-7 border-right profile-form-section-unique fadeInDisplayName">
         <div className="p-3 py-5">
           <div className="d-flex justify-content-between mb-3">
             <h2 className="text-right">Profile Settings</h2>
           </div>
           <div className="row mt-2">
             <div className="col-md-12">
               <label className="labels">Username</label>
               <input type="text" className="form-control" placeholder="enter Username" value={username} 
                 style={{
                  marginBottom: '20px',
                  height: '40px',
                  transition: 'background-color 0.3s ease',
                 
                  
                 }}
               onChange={(e) => setUser(e.target.value)} />
             </div>
             <div className="col-md-6">
               <label className="labels">First Name</label>
               <input type="text" className="form-control" placeholder="first name" value={first_name} 
                 style={{
                  marginBottom: '20px',
                  height: '40px',
                  transition: 'background-color 0.3s ease',

                 }}
               onChange={(e) => setName(e.target.value)} />
             </div>
             <div className="col-md-6">
               <label className="labels">Last Name</label>
               <input type="text" className="form-control" value={last_name} placeholder=""
                 style={{
                  marginBottom: '20px',
                  height: '40px',   
                  transition: 'background-color 0.3s ease',
                }}
               onChange={(e) => setNaame(e.target.value)}/>
             </div>
             <div className="col-md-12">
               <label className="labels">Email</label>
               <input type="text" className="form-control" placeholder="enter email" value={email} 
                 style={{
                  marginBottom: '20px',
                  height: '40px', 
                  transition: 'background-color 0.3s ease',
                }}
               onChange={(e) => setEmail(e.target.value)}/>
             </div>
           </div>
           <div className="row mt-3 unique-class-1">
  <div className="col-md-12">
    <label className="labels">Mobile Number</label>
    <input type="text" className="form-control" placeholder="enter phone number" value={PhoneNumber} 
      style={{
        marginBottom: '20px',
        height: '40px', 
        transition: 'background-color 0.3s ease',
      }}
    onChange={(e) => setPhoneNumber(e.target.value)}/>
  </div>
  
</div>
<div className="row mt-3 unique-class-3">
  <div className="col-md-12 unique-class-4">
    {role === "VENDOR" && (<label className="labels" htmlFor="Displayname-input">Display Name</label>)}
            {role === "VENDOR" && (<input className='form-control' type="text" placeholder="Display Name" value={DisplayName}
             style={{
              height: '40px',
                  transition: 'background-color 0.3s ease',
    
            }}
            onChange={(e) => setDisplayname(e.target.value)} />)}
  </div>
</div>
</div>

<div class="row-mt-5 text-center">
               <button class="btn btn-primary profile-button" type="button"
               
               style={{marginTop: "1px", borderRadius: "20px", 
               border: "1px solid #0a4985", backgroundColor: "#16558F",
                color: "#FFFFFF", fontSize: "15px", fontWeight: "bold", 
                padding: '12px 24px',      letterSpacing: "1px", 
                textTransform: "uppercase", transition: "transform 80ms ease-in",
                 cursor: "pointer",
                 
                
                }}
                 onClick={handleSubmit}
               >Save Profile</button>
             </div>
           
     </div>
   </div>
 </div>
</div>
</div>  
</div>
 );
}
export default requireAuth(ProfileEditForm);