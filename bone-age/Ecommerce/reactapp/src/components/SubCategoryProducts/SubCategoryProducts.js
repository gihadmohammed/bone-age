import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SubCategoryProducts.css';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { Modal } from "react-bootstrap";
import { LinearProgress } from '@material-ui/core';
import { fontWeight, textAlign } from '@mui/system';
import { Checkbox } from '@material-ui/core';

function SubCategoryProducts() {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('price');
  const { categoryId } = useParams();
  const [filterRate, setFilterRate] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [filterPrice, setFilterPrice] = useState(null); 
  const [allProducts, setAllProducts] = useState([]); 
  const [numLoaded, setNumLoaded] = useState(4); 
  const [pLoaded, setPLoaded] = useState(); 
  const [numProducts, setNumProducts] = useState(4);
  const [productsL, setProductsL] = useState();
  const [ShnumProducts, setShNumProducts] = useState(4);
  const [prevProducts, setprevProducts] = useState();
  const [vendors, setVendors] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);









  const handleSeeMore = (event, Description) => {
    event.preventDefault();
    setSelectedProduct({ Description });
    setShowModal(true);
  }

  const loadMore = () => {
    if ((numLoaded + 4)>productsL){
      setShNumProducts(productsL);
    }
    else
    {setShNumProducts(numLoaded + 4)}

    setNumLoaded(numLoaded + 4);
    
    // console.log(productsL)
        // console.log(productsL)

  };


  const handleFilterReset = () => {
 
    setFilterPrice('');
    setFilterRate('')
    axios.get(`http://localhost:8000/Products/get_Subproducts/${categoryId}/${numProducts}/`)
    .then(response => {
      const data = response.data;
      if (typeof data === 'object' && Array.isArray(data.products)) {
        setAllProducts(data.products); 
        setProducts(data.products.slice(0, numLoaded)); 
        setPLoaded(data.products.length);
        setNumProducts(numLoaded + 4); 
        setProductsL(data.Length)
        console.log("eman")
        console.log(data.Length)
        if (prevProducts!=categoryId){
          if (data.Length>=4){
          setShNumProducts(4)
          setNumLoaded(4)
        }
        else {setShNumProducts(data.Length)
          setNumLoaded(data.Length)

        }        }
        setprevProducts(categoryId)
        // setShNumProducts(Math.min(data.Length,ShnumProducts))

        // console.log(productsL)
      } 

      else {
        console.log('Invalid response data format');
      }
    })
    .catch(error => {
      console.log('Error fetching products:', error);
    });
  }


  useEffect(() => {
    const uniqueVendors = Array.from(new Set(allProducts.map(product => product.UserID)));
    setVendors(uniqueVendors);
  }, [allProducts]);

  useEffect(() => {
    console.log(numLoaded)
  axios.get(`http://localhost:8000/Products/get_Subproducts/${categoryId}/${numProducts}/`)
    .then(response => {
      const data = response.data;
      if (typeof data === 'object' && Array.isArray(data.products)) {
        setAllProducts(data.products); 
        setProducts(data.products.slice(0, numLoaded)); 
        setPLoaded(data.products.length);
        setNumProducts(numLoaded + 4); 
        setProductsL(data.Length)
        console.log("eman")
        console.log(data.Length)
        if (prevProducts!=categoryId){
          if (data.Length>=4){
          setShNumProducts(4)
          setNumLoaded(4)
          console.log("eman1")
        }
          else {
            console.log("eman2")

            setShNumProducts(data.Length)
            setNumLoaded(data.Length)

          }
          // console.log(ShnumProducts)
          // console.log(productsL)

        }
        setprevProducts(categoryId)
        // setShNumProducts(Math.min(data.Length,ShnumProducts))

        // console.log(productsL)
      } else {
        console.log('Invalid response data format');
      }
    })
    .catch(error => {
      console.log('Error fetching products:', error);
    });
}, [categoryId, numLoaded, numProducts]);

  const sortProducts = (sortBy) => {
    setSort(sortBy);
    let sortedProducts = [...products.slice(0, numLoaded)];
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
    setProducts(sortedProducts);
  };

  const handleFilterSubmit = (event) => {
    setProducts(allProducts.slice(0, numLoaded)); 
    console.log(allProducts)
    event.preventDefault();
    if (filterPrice !== null && filterPrice !== '') {
      const filteredProducts = allProducts.slice(0, numLoaded).filter(product => product.price <= parseInt(filterPrice));
      setProducts(filteredProducts); 
    } else {
      setProducts(allProducts); 
    }
  };

  const handleFilterSubmit2 = (event) => {
    event.preventDefault();
    if (filterRate !== null && filterRate !== '') {
      const filteredProducts = allProducts.slice(0, numLoaded).filter(product => product.Rating >= parseInt(filterRate));
      setProducts(filteredProducts); 
    } else {
      setProducts(allProducts); 
    }
  };

  const handleVendorFilter = (vendor, checked) => {
    if (checked) {
      setSelectedVendors([...selectedVendors, vendor]);
    } else {
      setSelectedVendors(selectedVendors.filter(v => v !== vendor));
    }
  }
  
  const handleFilterProducts = () => {
    const filteredProducts = allProducts.slice(0, numLoaded).filter(product => selectedVendors.length === 0 || selectedVendors.includes(product.UserID));
    setProducts(filteredProducts);
        
  } 

  return (
    <>
    <div style={{backgroundColor:'#f5f5f5'}}>
    <div className="SubP-list" style={{ }}>
      <div className="sort-buttons-container" style={{backgroundColor:'#f5f5f5'}}>
        <div className='ph3'>
        <h3 >
          Sort By:
        </h3>
        </div>
        <Button 
          className="sort-button" 
          variant={sort === 'priceA' ? "contained" : "outlined"} 
          onClick={() => sortProducts('priceA')}
          style={{width:'180px', marginBottom: '20%', backgroundColor: sort === 'priceA' ? "#16558F" : "" }}
          color="primary"

        >
          Price: LOW to HIGH
        </Button>

        <Button 
          className="sort-button" 
          variant={sort === 'priceD' ? "contained" : "outlined"} 
          onClick={() => sortProducts('priceD')}
          color="primary"
          style={{width:'180px', marginBottom: '20%', backgroundColor: sort === 'priceD' ? "#16558F" : "" }}
        >
          Price: HIGH to LOW
        </Button>

        <Button 
          className="sort-button" 
          variant={sort === 'rating' ? "contained" : "outlined"} 
          onClick={() => sortProducts('rating')}
          style={{width:'180px', marginBottom: '20%', backgroundColor: sort === 'rating' ? "#16558F" : "" }}
          color="primary"


        >
          Rating (AVG)
        </Button>

        <div className='ph3 e'>
        <h3 style={{
          marginTop: '20%',

        }} >
          Filter By:
        </h3>
       
        <Button 
          onClick={handleFilterReset}
          style={{ marginBottom: '20%' }}
          color='primary'  
          variant="outlined"

        >
         reset filters
        </Button>
        
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
<div className='Sub-Rate-cont' >
      <form onSubmit={handleFilterSubmit2} style={{backgroundColor:'#f5f5f5'}}>
        
      <select className="form-control" 
    value={filterRate}
    style={{
      // marginBottom: '20px',
      height: '40px',
      transition: 'background-color 0.3s ease',
      marginTop: '30%',
      width:"200px",
      textAlignLast: "center",
      textAlign: 'center',
      alignItems:'center'

      // width:'650px',


    }}

    onChange={(event) => setFilterRate(event.target.value)}

  > 
   <option key="" value="1">Rate</option>
   <option key="1" value="1">1 & above</option>
   <option key="2" value="2">2 & above</option>
   <option key="3" value="3">3 & above</option>
   <option key="4" value="4">4 & above</option>
   <option key="5" value="5">5 </option>

    
  </select>
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
<div className='n' style={{ display: 'flex' ,backgroundColor:'#f5f5f5'}}>
  <form onSubmit={(e) => e.preventDefault()} style={{backgroundColor:'#f5f5f5'}}>
    <h3 style={{ marginTop: '24%' }}>Vendors:</h3>
    {vendors.map(vendor => (
      <div key={vendor} style={{ display: 'flex'}}>
        <Checkbox
          checked={selectedVendors.includes(vendor)}
          onChange={(e) => handleVendorFilter(vendor, e.target.checked)}
          inputProps={{ 'aria-label': vendor }}
          color="primary"
          style={{width: '30px',height:'34px'}}

        />
        <span style={{ fontSize: '20px', marginLeft: '10px' ,width: '120px',height:'10px'}}>{vendor}</span>
      </div>
    ))}
    <Button
      variant="contained"
      color="primary"
      onClick={() => handleFilterProducts()}
      style={{ marginLeft: '0px', marginTop: '8%', width: '60px', backgroundColor: '#16558F' }}
    >
      Filter
    </Button>
  </form>
</div>

      </div>
      <div className='containerSub'
      style={{
        
      }}
      
      >
      {
        
        products.map(product => (
          <div className="card-SubP">
          <Link to={`/products/${product.id}`} key={product.id}>
            <div className="photo-SubP" style={{ textAlign: 'center' }}>
              <img src={product.photo} key={product.photo} style ={{
                      borderRadius: '0',objectFit: 'cover', maxHeight: '200px', maxWidth: '200px'
              }} alt="Product"/>
            </div>
            <div className="description-SubP" style={{ textAlign: 'center' }}>
              <div className="description-SubP-h2" style={{ textAlign: 'center' }} >
                <h2>{product.name}</h2>
              </div>
              <h1 style={{ marginBottom: '8px' }}>Price: {product.price} </h1>
              <div className='Rating'  style={{ textAlign: 'center' }}>
                <Rating name="product-rating" value={Number(product.Rating)} readOnly/>
              </div>
            </div>
            <div className="CartButton" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10%',
                width: '100%',
              }}>
              <Button 
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ margin: '0 auto' }}
                  endIcon={<ShoppingCartIcon />}
              >
                Add to Cart
              </Button>
            </div>
            <div className="description-SubP " style={{ textAlign: 'center' }}>
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', margin: 0}}> 
              {product.Description.slice(0, 20)}
              {product.Description.length > 20 && (
              <a href="#" onClick={(event) => handleSeeMore(event, product.Description)}>...See More</a>
             )}
           </p>            </div>
            </Link>
          </div>
      ))}
     
      </div>
     
    </div>

    <div className='load-btn' style={{textAlign: 'center', padding: '30px', display: 'flex', flexDirection: 'column'}}>
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '10px'}}>
    <div>
      <p style={{margin: '0', fontSize:'16px', fontWeight:"bold"}}>
        {ShnumProducts} of {productsL} products loaded
      </p>
    </div>
    <div style={{width: '10%', marginTop: '10px'}}>
      <LinearProgress variant='determinate' value={(ShnumProducts / productsL) * 100} />
    </div>
  </div>
  {numLoaded < productsL && (
    <div style={{}}>
      <Button
        variant="outlined"
        color="primary"
        size='large'
        onClick={loadMore}
      >
        LOAD MORE
      </Button>
    </div>
  )}
</div>



    </div>
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
    <div className="modal-container">
      <Modal.Body className="modal-content">
      <h2 style={{fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', margin: 0}}>Description</h2>
      <p style={{fontSize: '17px'}}>{selectedProduct.Description}</p>
      </Modal.Body>
    </div>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
    </Modal.Footer>
  </Modal>
  </>
  );
}

export default SubCategoryProducts;