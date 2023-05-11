import React, { useState, useEffect } from 'react';
import './CheckoutT.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import { FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';



import { useNavigate } from 'react-router-dom';

function CheckoutT() {

  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [CartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [sum, setSum] = useState(0); 
  const [similarProducts, setSimilarProducts] = useState([]);
  const [productId, setproductId] = useState([]);
 
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [addd, setaddd] = useState();
  const [adds, setadds] = useState([]);
  const [showModalE, setShowModalE] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});


const [first_name, setName] = useState();
const [city, setCity] = useState();
const [last_name, setNaame] = useState();
const [PhoneNumber, setPhoneNumber] = useState();
const [Address, setAddress] = useState();
const [PostalCode , setPostalCode] = useState();
const [Governorate, setGovernorate] = useState();  
const [Apartment, setApartment] = useState();  
const [id, setID] = useState();
const [Address2, setAddress2] = useState();


const handleEdit = (event) => {
  event.preventDefault();
  setShowModalE(false);
   console.log();

  axios.post('http://localhost:8000/Authentication/edit_add/',
{  Add: {
    add_id : id,
    first_name: first_name,
    email: email,
    last_name: last_name,
    PhoneNumber: PhoneNumber,
    Apartment:Apartment,
    Governorate:Governorate,
    PostalCode:PostalCode,
    city:city,
    PhoneNumber:PhoneNumber,
    Address: Address2,
  }},
 { headers: {
    'content-type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`

  }})
    .then((response) => {
      console.log(response.data);
      setaddd(response.data.id);



    })
    .catch((error) => {
      console.log(error);

    });


};





const handleSeeMore = (address) => {
    // const selectedValue = event.target.value;
    if (address.id){
    setPhoneNumber('');
    setID(address.id)
    setName(address.first_name);
    setNaame(address.last_name);
    setCity(address.city);
    setPhoneNumber(address.phone_number);
    setPostalCode(address.postal_code);
    setGovernorate(address.governorate);
    setApartment(address.apartment);
    setAddress2(address.address)
    setShowModalE(true);
    setaddd(address.id);

    }
  
  else  {
    setID("")
    setName("");
    setNaame("");
    setCity("");
    setPhoneNumber("");
    setPostalCode("");
    setGovernorate("");
    setApartment('');
    setAddress2("")
    setaddd("");
      setaddd("");
      setShowModal(true);
    } 
      console.log(address.id)  

    console.log(addd)  

      // Update the checked prop of the selected radio button
    
  };
  

const handleShClick =()=>{
  console.log("eman")

  navigate(`/TestShipping`);

}


 
const handleSubmit2 = (event) => {
  event.preventDefault();
  axios.post('http://localhost:8000/ShoppingCart/checkout/',
{
cart:{
  c_id:1,
  a_id:addd,
}
},
{ headers: {
'content-type': 'multipart/form-data',
'Authorization': `Bearer ${token}`

}}


).then((response) => {
console.log(response.data);
navigate(`/Order`);




})
.catch((error) => {
console.log(error);

});

}
  

    const handleSubmit = (event) => {
      event.preventDefault();
      setShowModal(false);


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
          setaddd(response.data.id);


   
        })
        .catch((error) => {
          console.log(error);

        });


    };
  
    // const handleChange = (event) => {
    //   const { name, value } = event.target;
    //   setAddress({ ...address, [name]: value });
    // };



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
    
     },
    
    
    
    []);


    useEffect(() => {
      console.log(adds);

    }, [adds]);
    
    useEffect(() => {
      axios.get('http://localhost:8000/Authentication/get_add/'
      , {
        headers: {
          Authorization: `Bearer ${token}`
        }})
      .then((response) => {
        // const addsWithPhones = response.data.map(add => ({ ...add, phoneNumber: '1234567890' }));
        // setadds(addsWithPhones)
        setadds(response.data)
        console.log(response.data)
        console.log(response.data[1].address)
        console.log(adds)

      })
     
        .catch((error) => {
          console.error(error);
        }); 
    
    }, []);
  useEffect(() => {
    axios
      .get('http://localhost:8000/ShoppingCart/viewcart/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        if (typeof data === 'object' && Array.isArray(data.products)) {
          const itemsWithQuantity = data.products.map((item) => ({
            ...item,
            quantity: item.quantity, // set default quantity to 1
          }));
          setItems(itemsWithQuantity);
          updateSum(itemsWithQuantity);
        }
      })
      .catch((error) => {
        console.log('Error fetching products:', error);
      });
  }, []);
      




  function updateSum(newItems) {
    let sum = 0;
    for (let i = 0; i < newItems.length; i++) {
      sum += (newItems[i].quantity *  newItems[i].price);
    }
    setSum(sum);
  }


  return (
    <>
    <div>
      <div className="text-center">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="ibox">
             
                <div className="ibox-title">
                    
                  {/* <span className="pull-right">(<strong>{items.length}</strong>) items</span> */}
                  <h2
                        style={{
                            fontSize:"30px"
                            ,
                            fontWeight:"bold",
                            color:"#16558F"
                    
                          }}
                    
                  >Checkout</h2>
                </div>
                <div className="ibox-content">
                  <div className="table-responsive">
                  <div>
      <div className='checkoutt-form-container'>
        <form className='checkoutt-form' onSubmit={handleSubmit2}>
        <nav style={{
            textAlign:"center",
        }}>
          
              <Link style={{
                  color:"black",
                 textDecoration: 'none'
              }} to="/Cart">Cart </Link>
                              &nbsp; &#x276F;  &nbsp;   


              <Link style={{
 color:"black",
 fontWeight:"bold",
 textDecoration: 'none'
              }}  to="/Checkout/information">
                
                Information </Link>
                &nbsp; &#x276F;  &nbsp;   
            
              <Link style={{
 color:"black",
 textDecoration: 'none'
              }}  to="/Checkout/shipping">Shipping</Link>
                              &nbsp; &#x276F;  &nbsp;   

            
              <Link style={{
 color:"black",
 textDecoration: 'none'
              }} to="/Checkout/payment">Payment</Link>
          
        </nav>
<br></br>
        <div> 
           <h4
             style={{
                fontSize:"25px",
                color:"#16558F"
            }}>Contact Information</h4> 
            <div style={{
                fontSize:"18px"

            }}> <h5
               style={{
                fontSize:"17px"

               }}
            >{email}</h5> 
             <h5
               style={{
                fontSize:"17px"

               }}
            >{PhoneNumber}</h5> 
            
            </div> 
            <Link style={{
                  color:"black",

              }} to="/Logout">Logout </Link>

        <h4
        style={{
            fontSize:"25px",
            padding:"15px",
            color:"#16558F",

        }}
        >Shipping Address</h4>
  
  <div className='checkout-radio' style={{ border: '1px solid #ccc', padding: '20px', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
  {adds.map((add, index) => (
    <div key={index}>
      <label className='checkout-radio' htmlFor={`address${index}`} style={{paddingLeft:'20px'}}>
        <input type="radio" id={`address${index}`} name="address" value={add.id} onClick={() => handleSeeMore(add)} className="radio-button" />
        {add.address} {add.city} {add.apartment}  
      </label>
    </div>
  ))}
  <div>
    <label className='checkout-radio' htmlFor="new-address" style={{paddingLeft:'20px'}}>
      <input type="radio" id="new-address" name="address" value="new" onClick={() => handleSeeMore("")}className="radio-button" />
      Add a new address
    </label>
  </div>
</div>

  <div>


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
            'borderRadius':'5px',
            'marginTop' : '25px'     

          }} type="submit" className="product-request-form-button"
                          onClick={handleSubmit2}

          >
Continue to shipping          </button>
          </div>
        </form>
        {/* <Routes>
  <Route path="/Checkout/*">
    <Route path="information" />
    <Route path="shipping" element={<Shipping />} />
    <Route path="payment" />
  </Route>
</Routes> */}
      </div>
      </div>

                    </div>
                   
                </div>
              

                <div class="ibox-content">
                    
                    <div style={{ marginRight: '630px' }}>
                    <Link to="/Cart">
                      <button className="btn btn-white">
                        <i className="fa fa-arrow-left"></i> go back to cart
                        
                      </button>
                    </Link>
                    </div>
                    {/* <button class="btn btn-white" onclick="redirectToUserPage()"><i class="fa fa-arrow-left"></i> Continue shopping</button>

<script>
function redirectToUserPage() {
    {window.location.href = "/Userpage"}
}
</script> */}

                </div>
                
            </div>

        </div>
        <div class="col-md-4">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>Cart Summary</h5>
                </div>
                <div class="ibox-content">
                  
                    <div style={{ marginRight: '50px' }}> 
                    {
        items.map(product => (
                    <table className="table shoping-cart-table">
                      <tbody>
                        <tr>
                          <td width="90">
                            <div className="cart-product-imitation" style={{ marginBottom:'20px'}}>
                            <img style={{ borderRadius: '0' }} width="90px" height="60px"  src={product.photo}/>

                            </div>
                          </td>
                          <td className="desc">
                            <h3>
                              <a href="#" className="text-navy">{product.name}</a>
                            </h3>
                            {/* <p className="small">
                            {product.Description}                            </p> */}
                            <dl className="small m-b-none">
                              <dt>Quantity</dt>
                              <dd>    {product.quantity} </dd>
                            </dl>
  

                                            </td>
                      
                          <td>
                            <h3
                            style={{
                                fontWeight:"bold"
                            }}
                            >{product.price*product.quantity} EGP</h3>
                          </td>
                        </tr>
                        
                            </tbody>
                        </table>
        ))}

                    {/* <h2 class="font-bold">
                 {sum} EGP
                    </h2> */}
                    </div>

                    <hr></hr>
                    <span class="text-muted small">
                    {/* <h2 class="font-bold"
                    style={{
                        fontSize:'18px',
                        color:'black'

                    }}
                    > Subtotal:
                    &nbsp;  &nbsp;  &nbsp; 


                 {sum} EGP
                    </h2>             */}
                    
                        </span>
<div
 style={{
    textAlign:"center"
}}
>
                    {/* <span class="text-muted small"
                    style={{
                        textAlign:"center"
                    }}
                    >
                    <h2 class="font-bold"
                    style={{
                        fontSize:'18px',
                        color:'black'

                    }}
                    > 
                                 Shipping:
                    &nbsp;         &nbsp;  

                    Calculated at next step                     </h2>                </span> */}

                    </div>
<div>

<input 
            type="text"
            id="productName"
            className="product-request-form-input "
            placeholder="Promo Code"

          />
           <button type="submit" class="order-btn" style={{
      marginLeft:"10px",
    //  backgroundColor:"black",
    //  borderColor:"black",
     
           }}

          //  color="primary"

          >
Apply          </button>
</div>
                    <span class="text-muted small">
                    <h2 class="font-bold"
                    style={{
                        fontSize:'18px',
                        color:'black'

                    }}
                    > Total:
                    &nbsp;  &nbsp;  &nbsp; 


                 {sum} EGP
                    </h2>                </span>
                    <div class="m-t-sm">
                  
                    </div>
                </div>
            </div>

            <div class="ibox">
                <div class="ibox-title">
                    <h5>ECS Support</h5>
                </div>
                <div class="ibox-content text-center">
                    <h3><i class="fa fa-phone"></i> +00201234567</h3>
                    <span class="small">
                        Please contact us if you have any questions. We are avalible 24h.
                    </span>
                </div>
            </div>

           

        </div>
       </div>
    </div>
   </div>
</div> 


<Modal show={showModalE} onHide={() => setShowModalE(false)} centered>
      <div className="modal-container">
        <Modal.Body className="modal-content">
        <h2 style={{fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', margin: 0}}>Address Details</h2>
        
      <div>
      <div className='nAdd-form-container'>
        <form className='nAdd-form'
        
      >
                  <div style={{
                      'height':'70px' 
                  }}>
      <h4>
Address Details     </h4>
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
            value={Address2} 
            onChange={(e) => setAddress2(e.target.value)} 
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
               onClick={handleEdit}
      
            >
      Save & Use Address     </button>
            </div>
      
        </form>
      </div>
      </div>
      
       
      
      
        {/* <p style={{fontSize: '17px'}}>{selectedProduct.Description}</p> */}
        </Modal.Body>
      </div>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModalE(false)}>Close</Button>
      </Modal.Footer>
      </Modal>
      




<Modal show={showModal} onHide={() => setShowModal(false)} centered>
<div className="modal-container">
  <Modal.Body className="modal-content">
  <h2 style={{fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', margin: 0}}>Add a new Address</h2>
  
<div>
<div className='nAdd-form-container'>
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

 


  {/* <p style={{fontSize: '17px'}}>{selectedProduct.Description}</p> */}
  </Modal.Body>
</div>
<Modal.Footer>
  <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
</Modal.Footer>
</Modal>

<div>

  
</div>




</>
  ); 

}

export default CheckoutT;



{/* <div className="col-md-3 text-right">
          <a href="#" className="btn btn-xs btn-outline btn-primary">Info <i className="fa fa-long-arrow-right"></i></a>
        </div> */}