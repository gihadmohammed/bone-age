import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './NewAdd.css'; 
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { fontWeight } from '@mui/system';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function NewAdd() {

  const [first_name, setName] = useState();
  const [city, setCity] = useState();
  const [last_name, setNaame] = useState();
  const [PhoneNumber, setPhoneNumber] = useState();
  const [Address, setAddress] = useState();
  const [PostalCode , setPostalCode] = useState();
  const [Governorate, setGovernorate] = useState();  
  const [Apartment, setApartment] = useState();  
  const navigate = useNavigate();

   
    
      const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/Authentication/add_add/',
      {  Add: {
          first_name: first_name,
          email: email,
          last_name: last_name,
          PhoneNumber: PhoneNumber,
          Apartment:Apartment,
          Governorate:Governorate,
          PostalCode:PostalCode,
          city:city,
          PhoneNumber:PhoneNumber,
          // username: username,
          Address: Address,
        }},
       { headers: {
          'content-type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
  
        }})
          .then((response) => {
            console.log(response.data);
            toast.success('Address added Successfully')
            navigate(`/Addresses`)

     
          })
          .catch((error) => {
            console.log(error);
            toast.error('Please, fill all fields correctly')

          });
      };
    
      // const handleChange = (event) => {
      //   const { name, value } = event.target;
      //   setAddress({ ...address, [name]: value });
      // };



    const token = localStorage.getItem('token');
    const [user, setUser] = useState();
    const [email, setEmail] = useState();
    // const [address, setAddress] = useState();
    const [naddress, setnAddress] = useState();
      useEffect(() => {
        axios.get('http://localhost:8000/Authentication/get_profile/'
        , {
          headers: {
            Authorization: `Bearer ${token}`
          }})
        .then((response) => {
           setUser(response.data.username);
           setEmail(response.data.email);
           setAddress(response.data.Address);
         
          console.log(response.data.user)})
          .catch((error) => {
            console.error(error);
          }); 
      
      }, []);
  return (
    <div>
    <div className='fadeInDisplayName nAdd-form-container'>

      <form className='nAdd-form'
      
    >
                <div style={{
                    'height':'70px' 
                }}>
<h4>
Add a new address

</h4>

        </div>
        <div  className='names'  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <label htmlFor="firstName" className="" style={{ gridArea: '1 / 1' }}>
          First Name
        </label>
        <div           style={{  marginRight:'20px'}}
>
        <input 
          type="text"
          id="firstName"
          className="product-request-form-input"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setName(e.target.value)} 
          style={{ gridArea: '2 / 1', width: '100%' , marginRight:'20px'}}
          // onChange={(event) => setProductName(event.target.value)}
        />
        </div>
        <label htmlFor="lastName" className="" style={{ gridArea: '1 / 2' }}>
          Last Name
        </label>
        <input 
          type="text"
          id="lastName"
          className="product-request-form-input"
          placeholder="Last Name"
          value={last_name} 
          onChange={(e) => setNaame(e.target.value)} 
          style={{ gridArea: '2 / 2', width: '100%' }}
          // onChange={(event) => setProductName(event.target.value)}
        />
        </div>
        <label htmlFor="StreetAddress  " className="" >
         Address        </label>
         <div           style={{  marginBottom:'10px'}} ></div>

        <input 
          type="text"
          id="Add1"
          className="product-request-form-input"
          placeholder="Street address,P.O. box, comoany name, c/o"
          style={{
            width:'250px'
          }}
          value={Address} 
          onChange={(e) => setAddress(e.target.value)} 

          // onChange={(event) => setProductName(event.target.value)}
        />
         <input 
          type="text"
          id="Add2"
          className="product-request-form-input"
          placeholder="Apartment,suite,unit,floor,etc."
          style={{
            width:'250px'
          }}
          value={Apartment} 
          onChange={(e) => setApartment(e.target.value)} 
          // onChange={(event) => setProductName(event.target.value)}
        />

<label htmlFor="city  " className="" >
         City        </label>
         <div           style={{  marginBottom:'10px'}} ></div>

        <input 
          type="text"
          id="city"
          className="product-request-form-input"
          placeholder="City"
          style={{
            width:'250px'
          }}
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          // onChange={(event) => setProductName(event.target.value)}
        />

<label htmlFor="Governorate  " className="" >
Governorate        </label>
         <div           style={{  marginBottom:'10px'}} ></div>

         <select id="governorate" className="product-request-form-input" 
          value={Governorate} 
          onChange={(e) => setGovernorate(e.target.value)} 
          style={{ width: '250px' }}>
  <option value="">Select Governorate</option>
  <option value="Alexandria">Alexandria</option>
  <option value="Aswan">Aswan</option>
  <option value="Asyut">Asyut</option>
  <option value="Beheira">Beheira</option>
  <option value="Beni Suef">Beni Suef</option>
  <option value="Cairo">Cairo</option>
  <option value="Dakahlia">Dakahlia</option>
  <option value="Damietta">Damietta</option>
  <option value="Faiyum">Faiyum</option>
  <option value="Gharbia">Gharbia</option>
  <option value="Giza">Giza</option>
  <option value="Ismailia">Ismailia</option>
  <option value="Kafr El Sheikh">Kafr El Sheikh</option>
  <option value="Luxor">Luxor</option>
  <option value="Matruh">Matruh</option>
  <option value="Minya">Minya</option>
  <option value="Monufia">Monufia</option>
  <option value="New Valley">New Valley</option>
  <option value="North Sinai">North Sinai</option>
  <option value="Port Said">Port Said</option>
  <option value="Qalyubia">Qalyubia</option>
  <option value="Qena">Qena</option>
  <option value="Red Sea">Red Sea</option>
  <option value="Sharqia">Sharqia</option>
  <option value="Sohag">Sohag</option>
  <option value="South Sinai">South Sinai</option>
  <option value="Suez">Suez</option>
</select>

<label htmlFor="PostalCode  " className="" >
Postal Code        </label>
         <div           style={{  marginBottom:'10px'}} ></div>

        <input 
          type="number"
          id="PostalCode"
          className="product-request-form-input"
          placeholder="Postal Code "
          style={{
            width:'250px'
          }}
          // onChange={(event) => setProductName(event.target.value)}

          value={PostalCode} 
          onChange={(e) => setPostalCode(e.target.value)} 
        />

<label htmlFor="PhoneNumber  " className="" >
Phone Number        </label>
         <div           style={{  marginBottom:'10px'}} ></div>

        <input 
          type="number"
          id="PhoneNumber"
          className="product-request-form-input"
          placeholder="Phone Number"
          style={{
            width:'250px'
          }}
          value={PhoneNumber} 
          onChange={(e) => setPhoneNumber(e.target.value)} 
          // onChange={(event) => setProductName(event.target.value)}
        />
              <div>
          <button
          style={{
            'width':'200px',
            'borderRadius':'20px'
          }} type="submit" className="product-request-form-button"
             onClick={handleSubmit}


          >
Add Address       </button>
          </div>


      </form>
    </div>
  </div>
  
  
  );
}



export default NewAdd;
