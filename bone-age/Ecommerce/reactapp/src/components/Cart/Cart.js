import React, { useState, useEffect } from 'react';
import './Cart.css';
import axios from 'axios';
import { Link } from 'react-router-dom';




import { useNavigate } from 'react-router-dom';

function Test1() {
    const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [CartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [sum, setSum] = useState(0); 
  const [similarProducts, setSimilarProducts] = useState([]);
  const [productId, setproductId] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    axios
      .get('http://localhost:8000/ShoppingCart/viewcart/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        if (typeof data === 'object' && Array.isArray(data.products)) {
          const itemsWithQuantity = data.products.map((item) => ({
            ...item,
            quantity: item.quantity, // set default quantity to 1
          }));
          setItems(itemsWithQuantity);
          updateSum(itemsWithQuantity);
        }
      })
      .catch((error) => {
        console.log('Error fetching products:', error);
      });
  }, []);
      
    
    useEffect(() => {
      const fetchSimilarProducts = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/Products/similar/${productId}/`);
          setSimilarProducts(response.data.similar_products);
          console.log("2222")
          console.log(response.data.similar_products)
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchSimilarProducts();
    }, [productId]);

    const handleSubmit =()=>{
        console.log("eman")
    
        navigate(`/CheckoutT`);
    
      }


    const handleQuantityChange = (productId, newValue) => {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, quantity: newValue } : product
        )
      );
    };

    const removeProductFromCart = async (productId) => {
      const ProductID=productId
      try {
        const response = await axios.post(
          `http://localhost:8000/ShoppingCart/remove_from_cart/${ProductID}/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        );
        console.log(response.data.success); // Success message
      } catch (error) {
        console.error(error);
      }
    };


  function updateSum(newItems) {
    let sum = 0;
    for (let i = 0; i < newItems.length; i++) {
      sum += (newItems[i].quantity *  newItems[i].price);
    }
    setSum(sum);
  }

  // const updateSum = (newItems) => {
  //   let sum = 0;
  //   for (let i = 0; i < newItems.length; i++) {
  //     sum += newItems[i].quantity * newItems[i].price;
  //   }
  //   setSum(sum);
  // };

  // function updateQuan(newQuan){
  //   let product.quantity=placeholder;
  //   for 
  // }

  function removeItem(productId) {
    const newItems = items.filter(item => item.id !== productId);
    setItems(newItems);
    updateSum(newItems);
  }

  return (
    <div>
      <div className="text-center">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="ibox">
             
                <div className="ibox-title">
                    
                  <span className="pull-right">(<strong>{items.length}</strong>) items</span>
                  <h5>Items in your cart</h5>
                </div>
                <div className="ibox-content">
                  <div className="table-responsive">
                  {
        items.map(product => (
                    <table className="table shoping-cart-table">
                      <tbody>
                        <tr>
                          <td width="90">
                            <div className="cart-product-imitation" style={{ marginBottom:'20px'}}>
                            <img style={{ borderRadius: '0' }} width="230px" height="200px"  src={product.photo}/>

                            </div>
                          </td>
                          <td className="desc">
                            <h3>
                              <a href="#" className="text-navy">{product.name}</a>
                            </h3>
                            <p className="small">
                            {product.Description}                            </p>
                            <dl className="small m-b-none">
                              <dt>Description</dt>
                              <dd>    {product.Description} </dd>
                            </dl>
                            <div className="m-t-sm">
  <a href="#" className="text-muted" onClick={() =>{ removeItem(product.id);removeProductFromCart(product.id);}}>
    <i className="fa fa-trash"></i> Remove item
  </a>
</div>

                                            </td>
                      
                          <td width="80">  Quantity
    <input
      type="number"
      min={1}
      value={product.quantity}
      onChange={(e) => {
        const newQuantity = parseInt(e.target.value);
        if (!isNaN(newQuantity)) {
          const newItems = items.map((prevItem) =>
            prevItem.id === product.id
              ? { ...prevItem, quantity: newQuantity }
              : prevItem
          );
          setItems(newItems);
          updateSum(newItems);
        }
      }}
    />
                          </td>
 {/* <td width="80">
  <select
    className="form-control"
    value={value}
    onChange={(e) => setValue(parseInt(e.target.value))}
  >
    {[...Array(product.quantity)].map((_, index) => (
      <option key={index} value={index+1}>{index+1}</option>
    ))}
  </select>
</td> */}
                          <td>
                            <h4>{product.price*product.quantity} EGP</h4>
                          </td>
                        </tr>
                        
                            </tbody>
                        </table>
        ))}
                    </div>
                   
                </div>
              

                <div class="ibox-content">
                    <button className="btn btn-primary pull-right"
                    onClick={handleSubmit}
                    
                    ><i className="fa fa fa-shopping-cart"></i> Checkout</button>
                    <div style={{ marginRight: '630px' }}>
                    <Link to="/Userpage">
                      <button className="btn btn-white">
                        <i className="fa fa-arrow-left"></i> Continue shopping
                        
                      </button>
                    </Link>
                    </div>
                    {/* <button class="btn btn-white" onclick="redirectToUserPage()"><i class="fa fa-arrow-left"></i> Continue shopping</button>

<script>
function redirectToUserPage() {
    {window.location.href = "/Userpage"}
}
</script> */}

                </div>
                
            </div>

        </div>
        <div class="col-md-4">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>Cart Summary</h5>
                </div>
                <div class="ibox-content">
                    <span>
                        Total
                    </span>
                    <div style={{ marginRight: '50px' }}> 
                    <h2 class="font-bold">
                 {sum} EGP
                    </h2>
                    </div>

                    <hr></hr>
                    <span class="text-muted small">
                    </span>
                    <div class="m-t-sm">
                        <div class="btn-group" style={{ marginRight: '-25px' }}>
                        <a href="#" class="btn btn-primary btn-sm"><i class="fa fa-shopping-cart"></i> Checkout</a>
                        {/* <a href="#" class="btn btn-danger btn-sm"><i className="fa fa-trash"></i> Remove all items</a> */}
                        {/* <a href="#" class="btn btn-danger btn-sm" id="remove-all-btn">Remove all items</a> */}

                        </div>
                    </div>
                </div>
            </div>

            <div class="ibox">
                <div class="ibox-title">
                    <h5>ECS Support</h5>
                </div>
                <div class="ibox-content text-center">
                    <h3><i class="fa fa-phone"></i> +00201234567</h3>
                    <span class="small">
                        Please contact us if you have any questions. We are avalible 24h.
                    </span>
                </div>
            </div>

            <div class="ibox">
  <div class="ibox-content">
    <p class="font-bold">Other products you may be interested</p>
    <div>
      {Array.isArray(similarProducts) && similarProducts.map(product => (
        <div className="product-card" key={product.ProductID}>
          <div className="product-card-image">
            <img src={product.photo} alt={product.ProductName} style={{ borderRadius: '0', objectFit: 'cover', maxHeight: '200px', maxWidth: '200px' }} />
          </div>
          <div className="product-card-details">
            <h3 style={{ marginBottom: '8px' }}>{product.ProductName}</h3>
            {/* <Rating name="product-rating" value={product.Rating} precision={0.5} readOnly /> */}
            <p className="product-price">{product.Price}$</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

        </div>
       </div>
    </div>
   </div>
</div> 
  ); 

}

export default Test1;



{/* <div className="col-md-3 text-right">
          <a href="#" className="btn btn-xs btn-outline btn-primary">Info <i className="fa fa-long-arrow-right"></i></a>
        </div> */}