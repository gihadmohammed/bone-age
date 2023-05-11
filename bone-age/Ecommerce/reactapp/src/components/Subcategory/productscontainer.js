import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './productscontainer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const ProductsContainer = ({title,products}) => {
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

  return (
    <>
    <div className='test111'>
    <div className='test111-title'>{title}</div>
    <Carousel responsive={responsive}>
         {Array.isArray(products) && products.map(product => (
          <div className="product-card" key={product.id}>
            <div className="product-card-image">
              <img src={product.photo} alt={product.name} style={{ borderRadius: '0',objectFit: 'cover', maxHeight: '200px', maxWidth: '200px' }} />
            </div>
            <div className="product-card-details">
              <h3 style={{ marginBottom: '8px' }}>{product.name}</h3>
              <Rating name="product-rating" value={product.rating} precision={0.5} readOnly />
              <p className="product-price">{product.price}$</p>

              <Button
                variant="contained"
                color="primary"
                size="small"
                endIcon={<ShoppingCartIcon />}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
    </Carousel>
    </div>
    </>
  );
};


export default ProductsContainer;