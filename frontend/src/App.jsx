import React, { useState ,useContext,useEffect} from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import LoginPopup from './components/LoginPopup/LoginPopup'; 
import ContactUsForm from './components/Inquiry/ContactUsForm'; 
import { StoreContext } from './context/StoreContext';
import OrderConfirmation from './pages/OrderConformation/OrderConfirmation';
import UserOrders from './pages/UserOrders/Order'
import UserQueries from './components/Inquiry/UserQueries';
import EditInquiryForm from './components/Inquiry/EditInquiryForm';

import 'bootstrap/dist/css/bootstrap.css';

import Card from './pages/Card/CardManager'

const App = () => {
  const [showLogin, setShowLogin] = useState(false); 
  const { token, setToken } = useContext(StoreContext);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
        setToken(storedToken);
    }
}, [setToken]);

  return (
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} token ={token} /> 

      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/card' element={<Card />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/u-orders' element={<UserOrders />} />
        <Route path='/order-confirmation' element={<OrderConfirmation />} />
        <Route path='/login' element={<LoginPopup setShowLogin={setShowLogin} />} />
        <Route path="/contact-us" element={<ContactUsForm />} />
        <Route path="/queries" element={<UserQueries />} />
        <Route path="/edit-inquiry/:id" element={<EditInquiryForm />} /> {/* Ensure correct route here */}
      </Routes>
    </div>
  );
};

export default App;