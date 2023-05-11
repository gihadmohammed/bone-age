import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PastOrders.css';
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
import ListAltIcon from '@mui/icons-material/ListAlt';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'


function PastOrders() {
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
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');
  const [sortedOrders, setSortedOrders] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [sortedOrdersStatus, setSortedOrdersStatus] = useState([]);
  const [sortStatus, setSortStatus] = useState('');
  const [sortMethod, setSortMethod] = useState('');
  const [sortDate, setSortDate] = useState('');
  const [sortTotal, setSortTotal] = useState('');
  const[shoppingCartId,setShoppingCatId]=useState('')

  
  
  useEffect(() => {
    axios
      .get('http://localhost:8000/ShoppingCart/get_orders/', {
        headers: {
          Authorization: `Bearer ${token}`
        } 
      }) 
      .then((response) => {
        setOrders(response.data.orders);  
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);   

  useEffect(() => {
    let sorted = [...orders];
  
    if (sortMethod === 'date') {
      if (sortDate === 'date-asc') {
        sorted.sort((a, b) => new Date(a.order_date) - new Date(b.order_date));
      } else if (sortDate === 'date-desc') {
        sorted.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
      }
    } else if (sortMethod === 'total') {
      if (sortOrder === 'asc') {
        sorted.sort((a, b) => a.payment_amount - b.payment_amount);
      } else if (sortOrder === 'desc') {
        sorted.sort((a, b) => b.payment_amount - a.payment_amount);
      } else if (sortOrder === 'total-asc') {
        sorted.sort((a, b) => a.payment_amount - b.payment_amount);
      } else if (sortOrder === 'total-desc') {
        sorted.sort((a, b) => b.payment_amount - a.payment_amount);
      }
    }
  
    if (sortStatus) {
      sorted = sorted.filter(order => order.status === sortStatus);
    }
  
    setSortedOrders(sorted);
  }, [orders, sortOrder, sortStatus, sortMethod, sortDate]);
  
  function handleSort() {
    if (sortMethod === 'total') {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else {
        setSortOrder('asc');
      }
    } else {
      setSortMethod('total');
      setSortOrder('asc');
    }
  }
  
  
  const handleDateSort = () => {
    if (sortMethod === '') {
      setSortMethod('date');
      setSortDate('date-asc');
    } else if (sortMethod === 'date') {
      if (sortDate === 'date-asc') {
        setSortDate('date-desc');
      } else {
        setSortDate('date-asc');
      }
    } else if (sortMethod === 'total') {
      setSortMethod('date');
      setSortDate('date-asc');
    }
  };
  
  const handleStatusSort = e => {
    const status = e.target.value;
    setSortStatus(status);
  };
  const handleResetSort = () => {
    setSortMethod('');
    setSortOrder('');
    setSortStatus('');
    setSortDate('');
  };
  




  return (
    <>
    <div style={{backgroundColor:'#f5f5f5'}}>
    <div className="SubP-list" style={{ marginLeft: '20px' }}>
      <div className="sort-buttons-container" style={{backgroundColor:'#f5f5f5'}}>
        <div className='ph3'>
        <h3 >
          Sort By:
        </h3>
        </div>
        <div className="sort-button-container">
        <button 
  className="sort-button" 
  style={{
    backgroundColor: sortMethod === 'total' ? '#16558F' : 'white',
    color: sortMethod === 'total' ? 'white' : '#16558F',
    marginRight: '10px' // Add 10px margin to the right of the button
  }}
  onClick={handleSort}
>
  Sort by Total
  {sortMethod === 'total' && sortOrder === 'asc' && ' (Ascending)'}
  {sortMethod === 'total' && sortOrder === 'desc' && ' (Descending)'}
</button>





  <button 
    className="sort-button" 
    style={{
      backgroundColor: sortMethod === 'date' && (sortDate === 'date-asc' || sortDate === 'date-desc') ? '#16558F' : 'white',
      color: sortMethod === 'date' && (sortDate === 'date-asc' || sortDate === 'date-desc') ? 'white' : '#16558F',
      marginRight: '10px' // Add 10px margin to the right of the button
    }}
    onClick={handleDateSort}
  >
    Sort by Date
    {sortMethod === 'date' && sortDate === 'date-asc' && ' (Ascending)'}
    {sortMethod === 'date' && sortDate === 'date-desc' && ' (Descending)'}
  </button>





        <select className="sort-dropdown" onChange={handleStatusSort}>
          <option value="">Sort by Status</option>
          <option value="PENDING">Pending</option>
          <option value="DELIVERED">Delivered</option>
          <option value="ON THE WAY">On the way</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        <button 
        className='sort-button'
  style={{ marginRight: '10px',marginTop:'70%' }} // Add 10px margin to the right of the button
  onClick={handleResetSort}
>
  Reset Sorting
</button>


      </div>


      </div>      
      <div className='containerSub2'
      style={{
        
      }}      
      >
      <div className="Pastordercontainer">
      
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-3">Total</div>
          <div style={{ paddingLeft: '20px'}} className="col col-4">Status</div>
          <div className="col col-5">Delivery</div>
          <div className="col col-6">Order Date</div>
          <div className="col col-2">View Items</div>
        </li>
        {sortedOrders.map((order) => (
          <li className="table-row" key={order.id}>
            <div className="col col-3" data-label="Total">${order.payment_amount.toFixed(2)}</div>
            <div className="col col-4" data-label="Status">
              <span style={{ paddingRight: '10px'}} className={`badge ${
              order.status === 'DELIVERED'
                ? 'text-green'
                : order.status === 'ON THE WAY'
                  ? 'text-purple'
                  : order.status === 'PENDING'
                  ? 'text-yellow'
                  : 'text-red'
            }`}>
              {order.status}
            </span>
            

              </div>
            <div style={{ paddingLeft: '20px'}} className="col col-5" data-label="Delivery">{order.delivery ? 'Yes' : 'No'}</div>
            <div className="col col-6" data-label="Order Date">{new Date(order.order_date).toLocaleDateString()}</div>
            <div className="col col-2" data-label="View Items">
            <Link to={`/PastOrderItems/${order.shopping_cart_id}`}>
  <FontAwesomeIcon icon={faEye} style={{width:'100%'}} size="2x" aria-hidden="true" />
</Link>


</div>


          </li>
        ))}
      </ul>
    </div>
      </div>
     
    </div>.
    

    



    </div>
    
  </>
  );
}

export default PastOrders;