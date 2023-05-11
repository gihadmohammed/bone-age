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
import { fontWeight, margin, textAlign } from '@mui/system';
import { Checkbox } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styled from 'styled-components';
import PastOrders from './PastOrders';

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

function PastOrdersMobile() {
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
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');
  const [sortedOrders, setSortedOrders] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [sortedOrdersStatus, setSortedOrdersStatus] = useState([]);
  const [sortStatus, setSortStatus] = useState('');
  const [sortMethod, setSortMethod] = useState('');
  const [sortDate, setSortDate] = useState('');
  const [sortTotal, setSortTotal] = useState('');


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
  
  const handleSort = () => {
    if (sortMethod === '') {
      setSortMethod('total');
      setSortOrder('asc');
    } else if (sortMethod === 'total') {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        setSortOrder('total-asc');
      } else if (sortOrder === 'total-asc') {
        setSortOrder('total-desc');
      } else if (sortOrder === 'total-desc') {
        setSortOrder('asc');
      }
    } else if (sortMethod === 'date') {
      setSortMethod('total');
      setSortOrder('asc');
    }
  };
  
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

  


  const onClose = () => {
    setShowMenu(false);
    setShowMenu2(false)
  };
  


   
    return (
        <>
        <div className='mobileFilters' style={{
            alignItems:'center'
        }}>
          <ButtonContainer>
            

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
 
 <button 
  className="sort-button" 
  style={{
    backgroundColor: sortTotal === 'asc' || sortTotal === 'desc' ? '#16558F' : 'white',
    color: sortTotal === 'asc' || sortTotal === 'desc' ? 'white' : '#16558F',
    marginBottom: '7%' 
  }}
  onClick={handleSort}
>
  Sort by Total {sortTotal === 'asc' || sortTotal === 'desc' ? `(${sortTotal === 'asc' ? 'Ascending' : 'Descending'})` : ''}
</button>

</div>
<div>
<button 
  className="sort-button" 
  style={{
    backgroundColor: sortDate === 'asc' || sortDate === 'desc' ? '#16558F' : 'white',
    color: sortDate === 'asc' || sortDate === 'desc' ? 'white' : '#16558F',
    marginBottom: '7%'
  }}
  onClick={handleDateSort}
>
  Sort by Date {sortDate === 'asc' || sortDate === 'desc' ? `(${sortDate === 'asc' ? 'Ascending' : 'Descending'})` : ''}
</button>
</div>

<div>  
<select className="sort-dropdown" style={{marginBottom: '7%'  }} onChange={handleStatusSort}>
          <option value="">Sort by Status</option>
          <option value="PENDING">Pending</option>
          <option value="DELIVERED">Delivered</option>
          <option value="ON THE WAY">On the way</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
</div>
<div>
<button 
        className='sort-button'
  style={{ marginBottom: '7%'  }} // Add 10px margin to the right of the button
  onClick={handleResetSort}
>
  Reset Sorting
</button>
</div>
</div>
</MenuBackdrop>
)}
          </ButtonContainer>
          </div>
          <div className='containerSub'
    style={{ marginTop: '50px' }}
      
      >
      <div className="Pastordercontainer">
      
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-3">Total</div>
          <div style={{ paddingLeft: '20px'}} className="col col-4">Status</div>
          <div className="col col-5">Delivery</div>
          <div className="col col-6">Order Date</div>
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
            <div  className="col col-5" data-label="Delivery">{order.delivery ? 'Yes' : 'No'}</div>
            <div className="col col-6" data-label="Order Date">{new Date(order.order_date).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </div>
     
      </div>
      

        </>
      );
    };
export default PastOrdersMobile;