import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './TestShipping.css'; 
import axios from 'axios';
import React, { useState, useEffect } from 'react';


function TestShipping() {

    const token = localStorage.getItem('token');
    const [user, setUser] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
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
      <div className='checkout-form-container'>
        <form className='checkout-form'>
        <nav style={{
            textAlign:"center",
        }}>
          
              <Link style={{
                  color:"black"

              }} to="/Checkout/*">Cart &nbsp; &#x276F;  &nbsp; </Link>
              <Link style={{
                  color:"black"

              }}  to="/Checkout/information">Information &nbsp; &#x276F;  &nbsp;</Link>
            
              <Link style={{
                  color:"black"

              }}  to="/Checkout/shipping">Shipping&nbsp; &#x276F;  &nbsp;</Link>
            
              <Link style={{
                  color:"black"

              }} to="/Checkout/payment">Payment</Link>
          
        </nav>
<br></br>
        <div> 
           <h4
             style={{
                fontSize:"20px",
                color:"#16558F"
            }}>Contact Information</h4> 
            <div style={{
                fontSize:"18px"

            }}> <h5
               style={{
                fontSize:"17px"

               }}
            >{email}</h5> </div> 
            <Link style={{
                  color:"black",

              }} to="/information">change </Link>

<h4
             style={{
                fontSize:"20px",
                color:"#16558F",
                marginTop:"10px",
            }}>Shipping Method</h4> 

<div style={{
                fontSize:"18px"

            }}> <h5
               style={{
                fontSize:"17px"

               }}
            >{address}</h5>
            
            
            <Link style={{
                  color:"black",

              }} to="/information">change </Link> </div> 

       
        
        
  <div>


         {naddress==2  ?  
         <div className='fadeInDisplayName'>
             {/* <h3   style={{
                fontSize:"18px",
                paddingTop:"10px",
    
            }}>New Address</h3> */}
         
         <input 
            type="text"
            id="productName"
            className="product-request-form-input  fadeInDisplayName"
            placeholder="Use a new address"
            onChange={(event) => setAddress(event.target.value)}

          /> 
          </div>
        :null }
          {/* <h4
        style={{
            fontSize:"20px",
            padding:"15px",

        }}
        >Phone number</h4>

<input 
            type="text"
            id="productName"
            className="product-request-form-input  fadeInDisplayName"
            placeholder="Phone Number"
            // onChange={(event) => setAddress(event.target.value)}
/> */}
    
        </div>
        </div>
       
        <div>
          <button
          style={{
            'width':'200px',
            'borderRadius':'5px'
          }} type="submit" className="product-request-form-button"
                        //    onClick={handleSubmit}

          >
Continue to Payment          </button>
          </div>
        </form>
        <Routes>
  <Route path="/Checkout/*">
    <Route path="information" />
    <Route path="shipping" element={<Shipping />} />
    <Route path="payment" />
  </Route>
</Routes>
      </div>
      </div>
  );
}

function Shipping() {
    return <h2>Shipping</h2>;
  }

export default TestShipping;
