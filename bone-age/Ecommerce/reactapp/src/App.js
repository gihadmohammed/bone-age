import './App.css';
import RegistrationPage from './components/Register/RegisterScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPageScreen from './components/HomePage/LandingPageScreen';
import { BrowserRouter, Routes, Route, Redirect  } from 'react-router-dom';
import NavSidebar from './components/landingPage/LandingPageGuest';
import LandingPageGuest from './components/landingPage/LandingPageGuest';
import LandingPageUser from './components/landingPage/LandingPageUser';
import ForgotPasswordForm from './components/ResetPassword/ForgotPasswordPage';
import ResetPassword from './components/ResetPassword/reset_password';
import ProfileEditForm from './components/Profile/Profile';
import ProductRequest from './components/ProductRequest/ProductRequest';
import Layout from './components/Layout/Layout';
import VendorRequests from './components/VendorRequests/VendorRequests';
import ProductsContainer from './components/Subcategory/productscontainer';
import LayoutUser from './components/Layout/LayoutUser';
import ProductPage from './components/products/productpage';
import AccessDenied from './components/Layout/AccessDenied';
import SubCategoryProducts from './components/SubCategoryProducts/SubCategoryProducts';
import MobileSubCategoryProducts from './components/SubCategoryProducts/MobileSubCategoryProducts';
import TestShipping from './components/TestShipping/TestShipping';
import SearchResult from './components/SearchResult/SearchResult';
import Addresses from './components/Addresses/Addresses';
import NewAdd from './components/Addresses/NewAdd';
import Cart from './components/Cart/Cart';
import CheckoutT from './components/CheckoutT/CheckoutT';
import Order from './components/CheckoutT/Order';
import Location from './components/Location/Location';







import NoMatchesFound from './components/SearchResult/NoMatchesFound';
import PastOrders from './components/PastOrders/PastOrders';
import PastOrdersMobile from './components/PastOrders/PastOrdersMobile';
import PastOrdersItems from './components/PastOrdersItems/PastOrderItems';
import ChangePasswordForm from './components/Profile/ChangePassword';

function App() {
  const token = localStorage.getItem("token");
  // console.log(token)
  return (
      <div>
        <Routes>
          <Route path="/" element={ <LandingPageGuest/>} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgotpassword" element={<ForgotPasswordForm />} />
          <Route path="/reset_password/:uidb64/:token/" element={<ResetPassword />} />
          <Route exact path="/profile" element={<LayoutUser><ProfileEditForm/></LayoutUser>} />
          <Route exact path="/VendorRequests" element={<LayoutUser><VendorRequests/></LayoutUser>} />
          <Route exact path="/ProductRequest" element={<LayoutUser><ProductRequest/></LayoutUser>} />
          <Route exact path="/Userpage" element={<LandingPageUser/>} />
          <Route exact path="/access-denied" element={<AccessDenied/>} />
          <Route exact path="/layuser" element={<LayoutUser><ProductsContainer/></LayoutUser>} />
          <Route path="/categories/:categoryId/products" element={<LayoutUser><SubCategoryProducts/></LayoutUser> } />
          <Route path="/mobile/categories/:categoryId/products" element={<LayoutUser><MobileSubCategoryProducts/></LayoutUser> } />
          <Route path="/products/:productId" element={<LayoutUser><ProductPage/></LayoutUser>} />
          <Route path="/search/:inputValue" element={<LayoutUser><SearchResult/></LayoutUser>} />
          <Route path="/TestShipping" element={<LayoutUser><TestShipping/></LayoutUser> } />
          <Route path="/Addresses" element={<LayoutUser><Addresses/></LayoutUser> } />
          <Route path="/newAdd" element={<LayoutUser><NewAdd/></LayoutUser> } />
          <Route path="/Cart" element={<LayoutUser><Cart/></LayoutUser> } />
          <Route path="/CheckoutT" element={<LayoutUser><CheckoutT/></LayoutUser> } />
          <Route path="/Order" element={<Order/> } />
          <Route path="/Location" element={<Location/> } />






    
          


          <Route path="/productpage" element={token ? <LayoutUser><ProductPage/></LayoutUser> : <Layout><ProductPage/></Layout>}/>
          <Route path="/SubProducts" element={token ? <LayoutUser><SubCategoryProducts/></LayoutUser> : <Layout><SubCategoryProducts/></Layout>}/>
          <Route path="/categories/:categoryId/products" element={token ? <LayoutUser><SubCategoryProducts/></LayoutUser> : <Layout><SubCategoryProducts/></Layout>}/>
          <Route path="/products/:productId" element={token ? <LayoutUser><ProductPage/></LayoutUser> : <Layout><ProductPage/></Layout>}/>
          <Route path="/SearchResult/:inputValue" element={token ? <LayoutUser><SearchResult /></LayoutUser>: <Layout><SearchResult /></Layout>} />
          <Route path='/NoMatchesFound' element={<NoMatchesFound/>}/>
          <Route path='/PastOrders' element={<LayoutUser><PastOrders/></LayoutUser>}/>
          <Route path='/PastOrdersM' element={<LayoutUser><PastOrdersMobile/></LayoutUser>}/>
          <Route path='/PastOrderItems/:shoppingCartId' element={<LayoutUser><PastOrdersItems/></LayoutUser>}/>
          <Route path="/change" element={<ChangePasswordForm/>} />

          




        </Routes>
        <ToastContainer toastclassName="custom-toast-container" />

      </div>
  );
}

export default App;
