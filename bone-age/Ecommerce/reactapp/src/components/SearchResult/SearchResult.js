import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';

function SearchResult() {
  const [products, setProducts] = useState([]);
  const { inputValue } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);



  function getSimilarity(str1, str2) {
    const words1 = new Set(str1.split(/\W+/));
    const words2 = new Set(str2.split(/\W+/));
    const intersection = new Set(
      [...words1].filter((word) => words2.has(word))
    );
    const union = new Set([...words1, ...words2]);
    return intersection.size / union.size;
  }
  

  useEffect(() => {
    axios
      .get("http://localhost:8000/Products/products/")
      .then((response) => {
        const data = response.data;
        if (typeof data === "object" && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.log("Invalid response data format");
        }
      })
      .catch((error) => {
        console.log("Error fetching products:", error);
      });
  }, [inputValue]);



  useEffect(() => {
    if (!inputValue) {
      setFilteredProducts([]);
      return;
    }
  
    const productIds = inputValue.split(",").map((id) => Number(id));
    const filteredProducts = products.filter((product) =>
      productIds.includes(product.id)
    );
  
    const otherProducts = products.filter((product) =>
      !filteredProducts.includes(product)
    );
  
    const filteredProductDescriptions = filteredProducts.map(
      (product) => product.description
    );
  
    const relevantProducts = otherProducts.sort((a, b) => {
      const aDescriptionSimilarity = filteredProductDescriptions.reduce(
        (similarity, description) =>
          similarity + getSimilarity(a.description, description),
        0
      );
      const bDescriptionSimilarity = filteredProductDescriptions.reduce(
        (similarity, description) =>
          similarity + getSimilarity(b.description, description),
        0
      );
      return bDescriptionSimilarity - aDescriptionSimilarity;
    });
  
    setFilteredProducts([...filteredProducts, ...relevantProducts]);
  }, [products, inputValue]);
  
  
  
  
  
  

  return (
    <>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
    {
      filteredProducts.map(product => (
        <div key={product.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ textAlign: 'center' }}>
              <img src={product.photo} style={{ borderRadius: '5px', objectFit: 'cover', maxHeight: '200px', maxWidth: '200px' }} alt="Product" />
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <h2 style={{ margin: '0', fontSize: '18px', fontWeight: 'bold' }}>{product.name}</h2>
              <p style={{ margin: '8px 0', fontSize: '14px', fontWeight: 'normal', color: '#888' }}>{product.description}</p>
              <p style={{ margin: '8px 0', fontSize: '16px', fontWeight: 'bold', color: '#555' }}>Price: {product.price}</p>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                <Rating name="product-rating" value={Number(product.rating)} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
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
            </div>
          </Link>
        </div>
      ))
    }
  </div>
</>

  );
}

export default SearchResult;