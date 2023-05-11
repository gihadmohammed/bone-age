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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styled from 'styled-components';

const CloseButton = styled.button`
  position: absolute;
  top: 0px;
  right: 5px;
  padding: 5px;
  background-color: transparent ;
  border: none;
  cursor: pointer;

  svg {
    color: white;
    font-size: 1.5rem;
  }
`;

const FilterMenuContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 300px;
  background-color: #fff;
  transition: transform 0.3s ease-in-out;
  transform: translateY(${props => props.show ? 0 : '100%'});
`;

const SortMenuContainer = styled(FilterMenuContainer)`
  height: 200px;
`;

const MenuContainer = styled.div`
  position: fixed;
  top: 50px;
  right: 20px;
  width: 200px;
  height: 200px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  display: ${props => props.show ? 'block' : 'none'};
`;


const MenuBackdrop  = styled.div`
position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  transform: scaleY(${props => (props.show ? 1 : 0)});
  

`;





const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: #000000;
  border: 2px solid white;
  border-radius: 50px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 8px;


  svg {
    font-size: 1.2rem;
    margin-right: 0.5rem;
  }

  span {
    font-size: 1rem;
    color: grey;
  }
`;

const SortButton = styled(FilterButton)`
  margin-left: auto;
  margin-right: 10px;


  svg {
    color: grey;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 120px;
  left: 0;
  right: 0;
  height: 50px;
  padding: 0 20px;
  background-color: #ffffff;
  z-index: 9999;
`;

const FilterIcon = styled(FontAwesomeIcon)`
  color: grey;
  font-size: 1.5rem;
`;

const FilterButtonLabel = styled.span`
  font-weight: 500;
`;

function MobileSubCategoryProducts() {
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
  const [showMenu, setShowMenu] = useState(false);
  const [showMenu2, setShowMenu2] = useState(false);


  const onClose = () => {
    setShowMenu(false);
    setShowMenu2(false)
  };
  

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
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceD') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      sortedProducts.sort((a, b) => b.Rating - a.Rating);
    } else {
      sortedProducts = [...products.slice(0, numLoaded)];
    }
    setProducts(sortedProducts);
    setTimeout(() => {
      onClose();
    }, 300); 
  };
  

  const handleFilterSubmit = (event) => {
    setProducts(allProducts.slice(0, numLoaded)); 
    console.log(allProducts)
    event.preventDefault();
    if (filterPrice !== null && filterPrice !== '') {
      const filteredProducts = allProducts.slice(0, numLoaded).filter(product => product.price <= parseInt(filterPrice));
      setProducts(filteredProducts); 
      setTimeout(() => {
        onClose();
      }, 300); 
    } else {
      setProducts(allProducts); 
    }
  };

  const handleFilterSubmit2 = (event) => {
    event.preventDefault();
    if (filterRate !== null && filterRate !== '') {
      const filteredProducts = allProducts.slice(0, numLoaded).filter(product => product.Rating >= parseInt(filterRate));
      setProducts(filteredProducts); 
      setTimeout(() => {
        onClose();
      }, 300); 
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
    setTimeout(() => {
      onClose();
    }, 300); 
        
  } 

    const [showFilters, setShowFilters] = useState(false);
  
    const toggleFilters = () => {
      setShowFilters(!showFilters);
    };

   
    return (
        <>
        <div className='mobileFilters' style={{
            alignItems:'center'
        }}>
          <ButtonContainer>
            <div className='MFilters' style={{}}>
            <FilterButton onClick={() => setShowMenu(!showMenu)}>
                <FilterIcon icon={faFilter} />
                <FilterButtonLabel>Filters</FilterButtonLabel>
              </FilterButton>
              {showMenu && (
         <MenuBackdrop show={showMenu}>

  <CloseButton onClick={onClose}>
  <FontAwesomeIcon icon={faTimes} />
</CloseButton>
 <div className='mobilePrice'
  style={{
    alignItems:'center',
    textAlign:'center'
  }}
 
 >
    <h3
    style={{
        marginTop:'64px',
        marginBottom:'20px',
        color:'white',

    }}>
        Filters
    </h3>
        <TextField
          id="price-filter"
          label="Price"
          variant="outlined"
          className='textSub'
          size="small"
          style={{
            height:'',
            textAlign:'center',
            marginTop:'10px',
            width:'50%',
            backgroundColor:'white',
            borderRadius:'30px'
                      

          }}
          value={filterPrice}
          onChange={(e) => setFilterPrice(e.target.value)}
        />
        <div>
           <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{
            marginTop:'4%',width:'60px', backgroundColor:'#16558F',
            borderRadius:'30px',marginBottom:'50px',

              
          }}
          onClick={handleFilterSubmit}
        >
          Go
        </Button>
        </div>
        </div>
<div  
className='mobileRate'
style={{
  alignItems:'center',
  textAlign:'center',
}}
> 

<div>

        <select
    value={filterRate}
    style={{
        height:'45px',
        textAlign:'center',
        marginTop:'10px',
        width:'50%',
        backgroundColor:'white',
        borderRadius:'30px'
                  

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

  </div>
  <div>
  <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop:'4%',width:'60px', backgroundColor:'#16558F',
          borderRadius:'30px',marginBottom:'20px',
          }}
          onClick={handleFilterSubmit2}

        >
          Go
        </Button>
        </div>
        </div>

<div
className='mobileVen'
style={{
  alignItems:'center',
  textAlign:'center'
}}

>
<h3
    style={{
        marginTop:'20px',
        color:'white',

    }}>
        Vendors
    </h3>
{vendors.map(vendor => (
      <div key={vendor} style={{ alignItems:'center',
      textAlign:'center'}}>
        <Checkbox
          checked={selectedVendors.includes(vendor)}
          onChange={(e) => handleVendorFilter(vendor, e.target.checked)}
          inputProps={{ 'aria-label': vendor }}
          color="primary"
          style={{width: '30px',height:'34px',  color:'white', }}

        />
        <span style={{ color:'white', fontSize: '20px' ,width: '120px',height:'10px'}}>{vendor}</span>
      </div>
    ))}
 <div>
  <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={() => handleFilterProducts()}
          style={{ marginTop:'4%',width:'60px', backgroundColor:'#16558F',
          borderRadius:'30px',marginBottom:'20px',
          }}
        >
          Go
        </Button>
        </div>

</div>


</MenuBackdrop>

)}
            </div>
<div></div>
            <SortButton onClick={() => setShowMenu2(!showMenu2)}>
              <FontAwesomeIcon icon={faSort} />
            <span>Sort</span>
            </SortButton>
            {showMenu2 && (
         <MenuBackdrop show={showMenu2}>

  <CloseButton onClick={onClose}>
  <FontAwesomeIcon icon={faTimes} />
</CloseButton>

<div style={{
    alignItems:'center',
    textAlign:'center',
    marginTop:'50px'

}}

>
<h3
    style={{
        marginTop:'160px',
        color:'white',
        marginBottom:'20px',


    }}>
Sort    </h3>
    <div style={{

    }}>
 
<Button 
          className="mobile-sort-button" 
          variant={sort === 'priceA' ? "contained" : "outlined"} 
          onClick={() => sort != 'priceA' ? sortProducts('priceA') : sortProducts('')}
          style={{width:'180px', marginBottom: '15%', backgroundColor: sort === 'priceA' ? "#16558F" : "white" }}
          

        >
          Price: LOW to HIGH
        </Button>

</div>
<div>
<Button 
          className="sort-button" 
          variant={sort === 'priceD' ? "contained" : "outlined"} 
          onClick={() => sort != 'priceD' ? sortProducts('priceD') : sortProducts('')}
          style={{width:'180px', marginBottom: '15%', backgroundColor: sort === 'priceD' ? "#16558F" : "white" }}
        >
          Price: HIGH to LOW
        </Button>
</div>

<div>  <Button 
          className="sort-button" 
          variant={sort === 'rating' ? "contained" : "outlined"} 
          onClick={() => sort != 'rating' ? sortProducts('rating') : sortProducts('')}
          style={{width:'180px', marginBottom: '20%', backgroundColor: sort === 'rating' ? "#16558F" : "white" }}


        >
          Rating (AVG)
        </Button>
</div>
</div>
</MenuBackdrop>
)}
          </ButtonContainer>
          </div>
          <div className='containerSub'
    style={{ marginTop: '50px' }}
      
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
      <div className='load-btn' style={{textAlign: 'center', padding: '30px', display: 'flex', flexDirection: 'column'}}>
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '10px'}}>
    <div>
      <p style={{margin: '0', fontSize:'16px', fontWeight:"bold"}}>
        {ShnumProducts} of {productsL} products loaded
      </p>
    </div>
    <div style={{width: '50%', marginTop: '10px'}}>
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

        </>
      );
    };
export default MobileSubCategoryProducts;