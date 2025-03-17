import React, { useContext, useState } from 'react';
import './PlaceOrder.css'; 
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchCardByCode } from "../Card/CardManager";


const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, userId, clearCart, token } = useContext(StoreContext);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false); 
  const [cardDetails, setCardDetails] = useState(null); // For storing card details
  const [uniqueCode, setUniqueCode] = useState(''); // For storing the unique card code
  const navigate = useNavigate(); 

  const provinces = {
    'Central Province': 100,
    'Northern Province': 200,
    'North Central Province': 150,
    'Eastern Province': 180,
    'North Western Province': 120,
    'Sabaragamuwa': 130,
    'Southern Province': 170,
    'Uva': 140,
  };

  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);
    setDeliveryFee(provinces[province] || 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const validate = () => {
    const errors = {};
    if (!formValues.firstName) errors.firstName = 'First Name is required';
    if (!formValues.lastName) errors.lastName = 'Last Name is required';
    if (!formValues.address) errors.address = 'Address is required';
    if (!formValues.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^0\d{9}$/.test(formValues.phone)) {
      errors.phone = 'Phone number must be 10 digits and start with 0';
    }
    if (!selectedProvince) errors.province = 'Province must be selected';
    if (!paymentMethod) errors.paymentMethod = 'Payment method must be selected';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const decreaseQuantity = async (productId, quantity) => {
    try {
      const response = await axios.post(
        'http://localhost:5001/api/product/decrease-quantity',
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.data; 
    } catch (error) {
      console.error('Error decreasing product quantity:', error);
      return { success: false, message: error.message }; 
    }
  };

  const handleFetchCardDetails = async () => {
    try {
      const fetchedCards = await fetchCardByCode(uniqueCode);
      if (fetchedCards.length > 0) {
        setCardDetails(fetchedCards[0]);
      } else {
        alert('No card found with this unique code');
        setCardDetails(null);
      }
    } catch (error) {
      console.error('Error fetching card details:', error);
      alert('Failed to fetch card details');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validate()) {
      setLoading(true);
  
      const orderData = {
        userId,
        items: cartItems,
        amount: getTotalCartAmount() + deliveryFee,
        date: Date.now(),
        address: formValues.address,
        province: selectedProvince,
        payment: paymentMethod === 'card',
        paymentMethod,
        cardDetails: paymentMethod === 'card' ? cardDetails : null,
      };
  
      try {
        const response = await axios.post(
          'http://localhost:5001/api/orders/place',
          orderData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        if (response.data.success) {
          clearCart();
  
          const decreaseResults = await Promise.all(
            Object.keys(cartItems).map(itemId => {
              const { quantity } = cartItems[itemId];
              return decreaseQuantity(itemId, quantity);
            })
          );

          const failedDecreases = decreaseResults.filter(res => !res.success);
          if (failedDecreases.length) {
            console.error("Some items could not be decremented:", failedDecreases);
          }
  
          navigate('/order-confirmation', { 
            state: { 
              orderId: response.data.orderId,
              orderDetails: orderData.items,
              totalAmount: orderData.amount 
            } 
          });
        } else {
          throw new Error(response.data.message || 'Order placement failed');
        }
      } catch (error) {
        console.error("Error:", error);
        alert(`Error: ${error.response ? error.response.data.message : error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };
  
  return (
    <div>
      <form className='place-order' onSubmit={handleSubmit}>
        <div className="place-order-left">
          <p className='title'>Delivery Information</p>
          <div className="multi-fields">
            <input 
              type="text" 
              name="firstName" 
              placeholder='First Name' 
              value={formValues.firstName} 
              onChange={handleChange}
              aria-label="First Name"
            />
            {formErrors.firstName && <p className="error">{formErrors.firstName}</p>}
            <input 
              type="text" 
              name="lastName" 
              placeholder='Last Name' 
              value={formValues.lastName} 
              onChange={handleChange}
              aria-label="Last Name"
            />
            {formErrors.lastName && <p className="error">{formErrors.lastName}</p>}
          </div>
          <input 
            type="text" 
            name="address" 
            placeholder='Address' 
            value={formValues.address} 
            onChange={handleChange}
            aria-label="Address"
          />
          {formErrors.address && <p className="error">{formErrors.address}</p>}
          <input 
            type="text" 
            name="phone" 
            placeholder='Phone' 
            value={formValues.phone} 
            onChange={handleChange}
            aria-label="Phone"
          />
          {formErrors.phone && <p className="error">{formErrors.phone}</p>}
          <div className="province-selection">
            <select 
              id="province" 
              value={selectedProvince} 
              onChange={handleProvinceChange}
              aria-label="Select Province"
            >
              <option value="">Select Province</option>
              {Object.keys(provinces).map((province) => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>
            {formErrors.province && <p className="error">{formErrors.province}</p>}
          </div>
        </div>

        <div className="place-order-right">
          <div className='cart-total'>
            <h2>Cart Totals</h2>
            <div>
              <hr />
              <div className='cart-total-details'>
                <p>Subtotal</p>
                <p>Rs.{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className='cart-total-details'>
                <p>Delivery Fee</p>
                <p>Rs.{deliveryFee}</p>
              </div>
              <hr />
              <div className='cart-total-details'>
                <b>Total</b>
                <b>Rs.{getTotalCartAmount() + deliveryFee}</b>
              </div>
            </div>
          </div>

          <div className="payment-method-selection">
            <p>Payment Method</p>
            <div>
              <label>
                <input 
                  type="radio" 
                  value="card" 
                  checked={paymentMethod === 'card'} 
                  onChange={handlePaymentMethodChange} 
                />
                Card Payment
              </label>
              <label>
                <input 
                  type="radio" 
                  value="cod" 
                  checked={paymentMethod === 'cod'} 
                  onChange={handlePaymentMethodChange} 
                />
                Cash on Delivery
              </label>
            </div>
            {formErrors.paymentMethod && <p className="error">{formErrors.paymentMethod}</p>}
          </div>

          {paymentMethod === 'card' && (
            <div className="card-fetch">
              <input 
                type="text" 
                placeholder="Enter Card Unique Code" 
                value={uniqueCode}
                onChange={(e) => setUniqueCode(e.target.value)}
                aria-label="Unique Card Code"
              />
              <button type="button" onClick={handleFetchCardDetails}>Fetch Card</button>
              {cardDetails && (
                <div className="card-details">
                  <p>Card Number: {cardDetails.cardNumber}</p>
                  <p>Card Holder: {cardDetails.cardHolderName}</p>
                  <p>Expires: {cardDetails.expiryDate}</p>
                </div>
              )}
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
