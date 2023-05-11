import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './productpage.css'
import Rating from '@material-ui/lab/Rating';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ReactImageMagnify from 'react-image-magnify'
import { useParams } from "react-router-dom";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import { HeartOutlined } from '@ant-design/icons';
import { borderColor, borderRadius, height, width } from '@mui/system';
import ProductsContainer from '../Subcategory/productscontainer';




import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ReviewPage from '../Review/review';
import ProductReviews from '../Review/ProductReview';
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));



const buttonContainerStyles = {
  display: 'flex',
  flexDirection: 'column', // update to column
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft:"-10px",
  marginRight:"30px"
}

const buttonStyles = {
  marginBottom: '10px',
  backgroundColor: '#16558F',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  fontSize: '16px',
  borderRadius: '25px',
  cursor: 'pointer',
  width: '300px',
  height: '50px',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: '#0f3c5c',
    margin: '0 auto',
    maxWidth: '300px',
  },
}
const quantityButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '6%',
  backgroundColor: 'transparent',
  color: '#16558F',
  padding: '5px',
  fontSize: '20px',
  cursor: 'pointer',
  width: '60px',
  justifyContent: 'center',
  fontWeight: 'bold',
  borderColor:'transparent',
}


const quantityButtonTextStyles = {
  fontWeight: 'bold',
  margin: '0 10px',
  padding: '5px 10px',
  marginLeft:'7%',
  marginBottom:'2%'
}

const quantityButtonWrapperStyles = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
  border: '1px solid #16558F', // add a border
  padding: '5px',
  borderRadius: '5px',
  width:'150px',
  marginLeft:"285px",
  height:'50px'
};

function ProductPage(props) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedItem, setSelectedItem] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [ProductID, setProductID] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [totalReviews, setTotalReviews] = useState(0);
  const token = localStorage.getItem("token");
useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

const smallImageWidth = windowWidth > 1024 ? 400 : (windowWidth === 768 ? 320 : (windowWidth > 768 ? 350 : windowWidth - 130));
const smallImageHeight = windowWidth > 1024 ? 430 : (windowWidth === 768 ? 300 : (windowWidth > 768 ? 380 : (windowWidth - 130) * 1.075));
const largeImageWidth = windowWidth > 1024 ? 1200 : (windowWidth > 768 ? 900 : windowWidth * 1.5);
const largeImageHeight = windowWidth > 1024 ? 1290 : (windowWidth > 768 ? 1140 : (windowWidth * 1.5) * 1.075);


  console.log(ProductID)


  const [scrollX, setScrollX] = useState(0);
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:8000/Products/products/')
  //     .then(response => {
  //       const data = response.data;
  //       if (typeof data === 'object' && Array.isArray(data.products)) {
  //         setProducts(data.products);
  //       } else {
  //         console.log('Invalid response data format');
  //       }
  //     })
  //     .catch(error => {
  //       console.log('Error fetching products:', error);
  //     });
  // }, []);
  

  const handleLeftArrowClick = () => {
    const container = document.querySelector('.products-container');
    const containerWidth = container.offsetWidth;
    const itemsWidth = container.scrollWidth;
    const newScrollX = Math.max(0, scrollX - containerWidth);
    setScrollX(newScrollX);
  };

  const handleRightArrowClick = () => {
    const container = document.querySelector('.products-container');
    const containerWidth = container.offsetWidth;
    const itemsWidth = container.scrollWidth;
    const newScrollX = Math.min(itemsWidth - containerWidth, scrollX + containerWidth);
    setScrollX(newScrollX);
  };



  const handleSubmit= (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log(token)
    const ProductID=productId
    axios.post(`http://localhost:8000/ShoppingCart/add-to-cart/${ProductID}/`, null, {
    headers: {
        Authorization: `Bearer ${token}`
    }
}).then(response => {
    console.log(response.data);
}).catch(error => {
    console.log(error.response.data);
});

  
  }







  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/Products/similar-products/${productId}/`);
        setSimilarProducts(response.data.similar_products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSimilarProducts();
  }, [productId]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };




  useEffect(() => {
    axios.get(`http://localhost:8000/Products/product/${productId}/`)
      .then(response => response.data)
      .then(data => {
        setProduct(data);
      })
  }, [productId]);

  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1);
  }

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  

  if (!product) {
    return <div>Loading...</div>;
  }


  return (
    <div>
    <div className="productpage-wrapper" style={{backgroundColor:'white'}}>
      <div className="productpage" >
        <div className="productpagee-image">
        <div style={{ maxWidth: '500px', maxHeight: '500px', margin: '0 auto', textAlign: 'center'}}>
            <Carousel
              showStatus={false}
              showThumbs={true}
              dynamicHeight={true}
              selectedItem={selectedItem}
              onChange={setSelectedItem}
              style={{ display: 'flex', justifyContent: 'center' }}

            >
              {product.photos && product.photos.map((photo, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <ReactImageMagnify
                        {...{
                          smallImage: {
                            src: photo.photo,
                            width: smallImageWidth,
                            height: smallImageHeight
                          },
                          largeImage: {
                            src: photo.photo,
                            width: largeImageWidth,
                            height: largeImageHeight
                          },
                          isHintEnabled: true,
                          enlargedImagePosition: 'over'
                        }}
                      />           
                      </div> 
                      <img
                    style={{ maxWidth: '400px', maxHeight: '400px' }}
                    src={photo.photo}
                    alt=""
                    onClick={() => setSelectedItem(index)}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="productpage-details">
          <h1>{product.name}</h1>
          <div className="productpage-price">EGP {product.price}</div>
          <div className="productpage-reviews">
        <Rating name="product-rating" value={product.rating} precision={0.5} readOnly />
        <div className="reviews-count">{product.rating_count} Reviews</div>
      </div>
          <span style={{fontSize:"20px",fontWeight:"bold"}}>Description:</span>
          <div className="productpage-description">{product.description}</div>
          <div style={quantityButtonWrapperStyles}>
  <button style={quantityButtonStyles} onClick={handleQuantityDecrease}>-</button>
  <div style={quantityButtonTextStyles}>{quantity}</div>
  <button style={quantityButtonStyles} onClick={handleQuantityIncrease}>+</button>
</div>
<div style={{ display: 'flex', flexDirection: 'row', marginLeft: '50px' }}>
  <Button style={buttonStyles} onClick={handleSubmit} endIcon={<ShoppingCartIcon />}>
    Add to Cart
  </Button>
  <div style={{ width: '20px' }}></div> {/* add a div with width of 10px as a spacer */}
  <Button style={buttonStyles} endIcon={<HeartOutlined />}>
    Add to Favourites
  </Button>
</div>

        </div>
      </div>
    </div>
    <div style= {{paddingTop:"5%"}}>
<ProductsContainer products={similarProducts} title={"Similar Products"}/>
</div>


<div className="container">
  <div>
    <ProductReviews productId={productId} />
  </div>
  <div>
    <ReviewPage productId={productId} />
  </div>
</div>



</div> 
  );
}

export default ProductPage;