import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderConfirmation.css'; // Optional: Add CSS for styling

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the order data passed in the state
  const { orderId, orderDetails = {}, totalAmount } = location.state || {}; 

  // Log the order details to check if they are being passed correctly
  useEffect(() => {
    console.log('Order Details:', orderDetails);  // Check the console for output
  }, [orderDetails]);

  const renderOrderDetails = () => {
    // Use Object.keys to iterate over the dynamic keys in orderDetails
    const productKeys = Object.keys(orderDetails);
    
    if (productKeys.length === 0) {
      return <tr><td colSpan="3">No order details available</td></tr>;
    }

    return productKeys.map((key, index) => {
      const item = orderDetails[key]; // Get the product details using the dynamic key
      return (
        <tr key={index}>
          <td>{item.name}</td>
          <td>{item.quantity}</td>
          <td>{item.size ? `Size: ${item.size}` : ''}</td>
        </tr>
      );
    });
  };

  return (
    <div className="order-confirmation">
      <h1>Order Confirmation</h1>

      {orderId ? (
        <div>
          <p>Thank you for your order!</p>
          <p>Your Order ID: <strong>{orderId}</strong></p>

          <h2>Order Details</h2>

          <table className="order-details">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {renderOrderDetails()}
            </tbody>
          </table>

          <h3>Total Amount: Rs.{totalAmount}</h3>
          <button onClick={() => navigate('/')}>Go to Homepage</button>
        </div>
      ) : (
        <p>It seems like there was an issue with your order. Please try again.</p>
      )}
    </div>
  );
};

export default OrderConfirmation;
