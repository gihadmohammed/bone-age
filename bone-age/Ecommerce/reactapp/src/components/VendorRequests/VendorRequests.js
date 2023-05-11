import './VendorRequests.css';
import axios from 'axios';
import { useState , useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // import the carousel styles
import { Carousel } from 'react-responsive-carousel';
import Noimage from './no-image.png';
import { Modal } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function VendorRequests() {
  const [productRequests, setProductRequests] = useState([]);
  const [originalProductRequests, setOriginalProductRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sort, setSort] = useState('price');
  const [selectedProduct, setSelectedProduct] = useState({});
  const [filterRate, setFilterRate] = useState(null); // state to store user input for filtering by price
  const [filterPrice, setFilterPrice] = useState(null); // state to store user input for filtering by price
  const [allProducts, setAllProducts] = useState([]); // state to store the array of all products

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8000/Products/Vendor-Product-requests/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setProductRequests(response.data);
        setOriginalProductRequests(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleWithdraw = (id) => {
    const token = localStorage.getItem('token');
    axios.patch(`http://localhost:8000/Products/Vendor-Product-requests/withdraw/${id}/`, { status: 'WITHDRAWN' }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setProductRequests(prevProductRequests => prevProductRequests.filter(pr => pr.id !== id));
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  }

  
  const handleSeeMore = (event, description) => {
    event.preventDefault();
    setSelectedProduct({ description });
    setShowModal(true);
  }
  const sortProducts = (sortBy) => {
    setSort(sortBy);
    let sortedProducts = [...originalProductRequests];
    if (sortBy === 'priceA') {
      // console.log(sortedProducts[0].Rating)

      sortedProducts.sort((a, b) => a.price - b.price);
    }
    else if (sortBy === 'priceD') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    else if (sortBy === 'rating') {

      sortedProducts.sort((a, b) => b.Rating - a.Rating);
    }
    setProductRequests(sortedProducts);
  };

  const filterProducts = (status) => {
    setSort(status);
    let filteredProducts = [...originalProductRequests];
    if (status) {
      filteredProducts = filteredProducts.filter((product) => product.status === status);
    }
    setProductRequests(filteredProducts);
  };


  const handleFilterSubmit = (event) => {
    event.preventDefault();
    if (filterPrice !== null && filterPrice !== '') {
      const filteredProducts = allProducts.filter(product => product.price <= parseInt(filterPrice));
      setProductRequests(filteredProducts); 
    } else {
      setProductRequests(allProducts); 
    }
  };


  return (
    <>
    <div className="SubP-list" style={{ marginLeft: '20px' }}>
      <div className="sort-buttons-container">
        <div className='ph3'>
        <h3 >
          Sort By:
        </h3>
        </div>
        <Button 
          className="sort-button" 
          variant={sort === 'priceA' ? "contained" : "outlined"} 
          onClick={() => sortProducts('priceA')}
          style={{ marginBottom: '20%' }}
          color="primary"

        >
          Price: LOW to HIGH
        </Button>

        <Button 
          className="sort-button" 
          variant={sort === 'priceD' ? "contained" : "outlined"} 
          onClick={() => sortProducts('priceD')}
          color="primary"

          style={{ marginBottom: '20%' }}
        >
          Price: HIGH to LOW
        </Button>

        <Button 
          className="sort-button" 
          variant={sort === 'ACCEPTED' ? "contained" : "outlined"} 
          onClick={() => filterProducts('ACCEPTED')}
          style={{ marginBottom: '20%', backgroundColor: sort === 'ACCEPTED' ? 'green' : 'transparent' }}
        >
          Accepted
        </Button>

        <Button 
          className="sort-button" 
          variant={sort === 'REJECTED' ? "contained" : "outlined"} 
          onClick={() => filterProducts('REJECTED')}
          style={{ marginBottom: '20%', backgroundColor: sort === 'REJECTED' ? 'red' : 'transparent' }}
        >
          Rejected
        </Button>

        <Button 
          className="sort-button" 
          variant={sort === 'PENDING' ? "contained" : "outlined"} 
          onClick={() => filterProducts('PENDING')}
          style={{ marginBottom: '20%', backgroundColor: sort === 'PENDING' ? 'yellow' : 'transparent' }}
        >
          Pending
        </Button>

        <Button 
          className="sort-button" 
          variant={sort === 'WITHDRAWN' ? "contained" : "outlined"} 
          onClick={() => filterProducts('WITHDRAWN')}
          style={{ marginBottom: '20%', backgroundColor: sort === 'WITHDRAWN' ? 'darkred' : 'transparent' }}
        >
          Withdrawn
        </Button>

        <div className='ph3 e'>
        <h3 style={{
          marginTop: '20%',

        }} >
          Filter By:
        </h3>

        
        </div>

        <form onSubmit={handleFilterSubmit} style={{backgroundColor:'#f5f5f5'}}>
        <input
    type="text"
    id="price-filter"
    placeholder="Price"
    InputProps={{
      style: {color: 'red'}
    }}
    inputProps={{
      style: {color: 'red'}
    }}
    style={{
      color:'black', 
      height: '35px',
      textAlign: 'center',
      borderRadius: '5px',
      fontSize: '16px',
      outline: 'none',
      padding: '5px 10px',
      border: '1px solid #ccc',
      backgroundColor: 'white',
      fontWeight: '400'
    }}
    value={filterPrice}
    onChange={(e) => setFilterPrice(e.target.value)}
  />
           <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginLeft: '0px' ,
            marginTop:'8%',width:'60px', backgroundColor:'#16558F'
              
          }}
        >
          Filter
        </Button>
      </form>

        
      </div>
      <div className='containerSub'
      style={{
        
      }}      
      >
      <div className="Pastordercontainer">
      
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-7">Image</div>
          <div className="col col-8">Name</div>
          <div className="col col-9">Description</div>
          <div className="col col-11">Price</div>
          <div className="col col-10">Status</div>
          <div className="col col-12">withdraw</div>
        </li>
        {productRequests.map((pr) => (
          <li className="table-row" key={pr.id}>
            <div className="col col-7" data-label="Image">
            {pr.photos && pr.photos.length > 0 ? (
              <Carousel className='RequestCarousel' showArrows={true} showStatus={false} showThumbs={false} 
          style={{ borderRadius: '0', objectFit: 'cover', maxHeight: '200px', maxWidth: '200px' }} >
  {pr.photos.map(photo => (
    <div key={photo}>
      <img src={photo} alt="Product" style={{ borderRadius: '0', objectFit: 'contain', height: '150px', width: '150px' }} />
    </div> 
  ))}
</Carousel>
            ) : (
              
              <img src={Noimage} alt="Product" style={{ borderRadius: '0', objectFit: 'contain', height: '150px', width: '150px' }}
              />
            )}
            </div>
            <div className="col col-8" style={{paddingTop:'65px'}} data-label="Name">{pr.name}</div>
            <div style={{ paddingRight: '15px',paddingTop:'65px'}} className="col col-9" data-label="Description">{pr.description}</div>
            <div className="col col-11" style={{paddingTop:'65px'}} data-label="Price">${pr.price.toFixed(2)}</div>

            
            <div className="col col-10" style={{paddingTop:'65px'}} data-label="Status">
              <span style={{ paddingRight: '10px'}} className={`badge ${
              pr.status === 'ACCEPTED'
                ? 'text-green'
                : pr.status === 'WITHDRAWN'
                  ? 'text-purple'
                  : pr.status === 'PENDING'
                  ? 'text-yellow'
                  : 'text-red'
            }`}>
              {pr.status}
            </span>
            

              </div>
              <div className="col col-12" style={{paddingTop:'65px'}} data-label="Withdraw">
              {pr.status === 'PENDING' && (
                   <button className='VendorButton11'
                   type="button"
                   onClick={() => handleWithdraw(pr.id)}
                 >
                   Withdraw
                 </button>   
              )}
              </div>


          </li>
        ))}
      
        
      </ul>
    </div>
      </div>
    </div>


</>
  );
}

export default VendorRequests;