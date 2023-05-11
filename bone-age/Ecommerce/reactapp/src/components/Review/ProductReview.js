import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './productreview.css';


function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('all');
  const [selectedSortOrder, setSelectedSortOrder] = useState('desc');
  const [rating, setRating] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [numToShow, setNumToShow] = useState(5);
  const [showMoreClicked, setShowMoreClicked] = useState(false);
  

  
  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:8000/Products/productrating/${productId}/`,
    })
      .then(response => {
        console.log(response);
  
        if (response.status === 200) {
          setRating(response.data.ratings);
  
          // Calculate average rating
          const totalRatings = response.data.ratings.length;
          const sumRatings = response.data.ratings.reduce((acc, curr) => acc + curr.Rating, 0);
          const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;
          setAverageRating(averageRating);
        }
      })
      .catch(error => {
        console.log(error);
        toast.error('Failed to fetch product ratings.');
      });
  }, [productId]);
  

  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:8000/Products/productreview/${productId}/`,
    })
      .then(response => {
        console.log(response);

        if (response.status === 200) {
          setReviews(response.data.reviews);
          setFilteredReviews(response.data.reviews.slice(0, numToShow));
        }
      })
      .catch(error => {
        console.log(error);
        toast.error('Failed to fetch product reviews.');
      });
  }, [productId, numToShow]);

  const handleShowMore = () => {
    setNumToShow(num => num + 5);
    setShowMoreClicked(true);
  };

  const renderStars = (rating) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="gold-star">&#9733;</span>);
      } else {
        stars.push(<span key={i}  className="gold-star">&#9734;</span>);
      }
    }

    return stars;
  }

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }

  const handleFilterChange = (event) => {
    setSelectedRating(event.target.value);
  
    let filtered = reviews;
  
    if (event.target.value !== 'all') {
      const selectedRating = parseInt(event.target.value);
      filtered = filtered.filter(review => review.rating === selectedRating);
    }
  
    if (selectedDateRange !== 'all') {
      const today = new Date();
      const days = parseInt(selectedDateRange);
      const dateRange = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(review => new Date(review.date) >= dateRange);
    }
  
    setFilteredReviews(filtered);
  };
  
  const handleDateFilterChange = (event) => {
    setSelectedDateRange(event.target.value);
  
    let filtered = reviews;
  
    if (event.target.value !== 'all') {
      const today = new Date();
      const days = parseInt(event.target.value);
      const dateRange = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(review => new Date(review.date) >= dateRange);
    }
  
    if (selectedRating !== 'all') {
      const selectedRatingInt = parseInt(selectedRating);
      filtered = filtered.filter(review => review.rating === selectedRatingInt);
    }
  
    setFilteredReviews(filtered);
  };
  

const handleSortOrderChange = (event) => {
  setSelectedSortOrder(event.target.value);

  let filtered = filteredReviews;
  
  if (event.target.value === 'desc') {
    filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else {
    filtered = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  setFilteredReviews(filtered);
};
  

return (
    
    <div className={'reviewsContainer'}>
      <h1 style={{ textAlign: 'center' }}>Reviews:</h1>
      <div className="filter">
        <select id="dateFilter" value={selectedDateRange} onChange={handleDateFilterChange}>
          <option value="all">All dates</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
        <select id="filter" value={selectedRating} onChange={handleFilterChange}>
          <option value="all">All stars</option>
          <option value="1">1 star</option>
          <option value="2">2 stars</option>
          <option value="3">3 stars</option>
          <option value="4">4 stars</option>
          <option value="5">5 stars</option>
        </select>
        <select id="sortFilter" value={selectedSortOrder} onChange={handleSortOrderChange}>
          <option value="desc">Newest to oldest</option>
          <option value="asc">Oldest to newest</option>
        </select>
      </div>
      {filteredReviews.length === 0 ? (
        <h2 style={{ textAlign: 'center' }}>No reviews yet</h2>
      ) : (
          <>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
            {filteredReviews.slice(0, numToShow).map((review, index) => (
            <li
                key={review.id}
                className={showMoreClicked ? 'reviewFadeIn' : null} 
                
            > 
                  <p>{review.user}</p>
                  <p>
                    Rating: <span className="stars">{renderStars(review.rating)}</span>
                  </p>
                  <p>Reviewed on {formatDate(review.date)}</p>
                  <p>{review.text}</p>
                </li>
              ))}
            </ul>
            {filteredReviews.length >= numToShow && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
              onClick={handleShowMore}
              style={{
                backgroundColor: '#16558F',
                border: 'none',
                color: 'white',
                borderRadius:'5px',
                padding: '10px 24px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '16px',
                margin: '10px',
                cursor: 'pointer',
              }}
            >
              Show More
            </button>
            </div>
            
            )}
          </>
        )}
    </div>
  );
}

export default ProductReviews;
