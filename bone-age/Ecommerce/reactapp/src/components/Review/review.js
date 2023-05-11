import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './review.css';
import axios from 'axios';
import StarSharpIcon from '@mui/icons-material/StarSharp';

const token = localStorage.getItem('token');

function ReviewPage({ productId }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [productIdState, setProductIdState] = useState(productId);
  function submitReview() {
    if (rating === 0) {
        toast.error('Please select a rating.');
        return;
      }
      if (review.trim() === '') {
        toast.error('Please enter a review.');
        return;
      }
    axios({
      method: 'POST',
      url: 'http://localhost:8000/Products/createreview/',
      data: {
        rating: rating,
        review: review,
        product_id: productIdState
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response);

        if (response.status === 200) {
          toast.success('Your product request was sent successfully, and it is being reviewed.');
        }
      })
      .catch(error => {
        console.log(error);
        toast.error('Please enter all the required information.');
      });
  }

  const handleProductIdChange = (e) => {
    setProductIdState(e.target.value);
  }

  return (
    <div className="review-container">
      <h1>Write a Review</h1>
      <div className="star-rating">
        <span>Rating: </span>
        {[...Array(5)].map((_, i) => (
          <React.Fragment key={i}>
            <input type="radio" id={`star${i + 1}`} name="rating" value={i + 1} checked={rating === i + 1} onChange={() => setRating(i + 1)} />
            <label htmlFor={`star${i + 1}`}><StarSharpIcon fontSize="large" className={rating > i ? "star-gold" : ""} /></label>
          </React.Fragment>
        ))}
      </div>
      <div>
  <textarea
    value={review}
    onChange={e => setReview(e.target.value)}
    placeholder="Write your review here..."
    style={{
      width: '90%',
      height: '80px !important',
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #333',
      borderRadius: '5px',
      boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.1)',
      color: '#333',
      backgroundColor:'#f6f6f6'
    }}
  />
</div>
      <button onClick={submitReview}>Submit Review</button>
    </div>
  );
}

export default ReviewPage;
