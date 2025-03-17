import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './CashierDashboard.css';

const List = () => {
  const url = "http://localhost:5001";
  const [list, setList] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [isWholesale, setIsWholesale] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  // Fetch product list
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/product/list`);
      if (response.data.success) {
        setList(response.data.data);
        const uniqueCategories = [...new Set(response.data.data.map(item => item.category))];
        setCategories(uniqueCategories);
      } else {
        toast.error("Error fetching product list");
      }
    } catch (error) {
      toast.error("Network Error");
      console.error("Error fetching list:", error);
    }
  };

  useEffect(() => {
    fetchList();
    if (location.state?.invoiceItems) {
      setInvoiceItems(location.state.invoiceItems);
    }
  }, [location.state]);

  // Add product to invoice based on selected price type
  const handleAddToInvoice = (item, quantity) => {
    const selectedPrice = isWholesale ? item.wholesalePrice : item.retailPrice;
    const quantityNumber = Number(quantity);
  
    if (!quantity || quantityNumber < 1) {
      toast.error("Please enter a valid quantity.");
      return;
    }
  
    if (quantityNumber > item.quantity) {
      toast.error(`Insufficient stock. Only ${item.quantity} available.`);
      return;
    }
  
    const existingItemIndex = invoiceItems.findIndex(existingItem => existingItem._id === item._id);
  
    if (existingItemIndex !== -1) {
      toast.error(`${item.name} is already added to the invoice. Please adjust the quantity.`);
      return;
    }
  
    const selectedItem = {
      ...item,
      quantity: quantityNumber,
      price: selectedPrice,
      total: selectedPrice * quantityNumber,
      availableQuantity: item.quantity 
    };
  
    setInvoiceItems([...invoiceItems, selectedItem]);
    toast.success(`${item.name} added to invoice`);
  };

  // Proceed to invoice page
  const handleProceedToInvoice = () => {
    if (invoiceItems.length === 0) {
      toast.error("No items in the invoice. Please add products before proceeding.");
      return;
    }
    
    navigate('/invoice', { state: { invoiceItems } });
  };

  // Filter products based on selected category and search query
  const filteredList = list
    .filter(item => selectedCategory === '' || item.category === selectedCategory)
    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className='list-container'>
      <div className="CashierSidebar"> 
        <ul className="sidebar-list"> 
          <li className="sidebar-item"><Link to="/">Dashboard</Link></li>
          <li className="sidebar-item"><Link to="/dashboard/cashier">Sales</Link></li>
          <li className="sidebar-item"><Link to="/invoice-display">View Sales</Link></li>
          <li className="sidebar-item"><Link to="/new">Leave Request</Link></li> 
        </ul>
      </div>
      <div className="list-content">
        <div className="price-toggle">
          <label>
            <input
              type="checkbox"
              checked={isWholesale}
              onChange={(e) => setIsWholesale(e.target.checked)}
            />
            Use Wholesale Prices
          </label>
        </div>

        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)} 
          className="category-filter"
        >
          <option value=''>All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />

        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Wholesale Price</b>
            <b>Retail Price</b>
            <b>Available Quantity</b>
            <b>Quantity</b>
            <b>Action</b>
          </div>
          
          {filteredList.length > 0 ? (
            filteredList.map((item, index) => (
              <div key={index} className='list-table-format'>
                <img src={`${url}/images/` + item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category || "No category"}</p>
                <p>{item.wholesalePrice || "No wholesale price"}</p>
                <p>{item.retailPrice || "No retail price"}</p>
                <p>{item.quantity || "No products left"}</p>
                <input 
                  type="number" 
                  placeholder="Enter quantity" 
                  min="1" 
                  onChange={(e) => { 
                    const value = e.target.value;
                    item.inputQuantity = value;
                  }} 
                />
                <button className='add-button' onClick={() => handleAddToInvoice(item, item.inputQuantity)}>Add</button>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>

        <button className="proceed-button" onClick={handleProceedToInvoice}>
          Proceed to Invoice
        </button>

        <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
      </div>
    </div>
  );
};

export default List;
