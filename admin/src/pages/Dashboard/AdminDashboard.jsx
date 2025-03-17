import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import SalesGraph from "../../components/SalesGraph/SalesGraph";
import RevenueGraph from "../../components/Revenue/RevenueGraph";
import notiIcon from '../../assets/noti_icon.jpeg'; 
import './AdminDashboard.css';


const AdminDashboard = ({ totalOrders }) => { // Accept totalOrders as a prop
  const [userCount, setUserCount] = useState(0);
  const [lowStockAlerts, setLowStockAlerts] = useState([]); 
  const [showAlertsPopup, setShowAlertsPopup] = useState(false); 

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/user/count');
        if (response.data.success) {
          setUserCount(response.data.count);
        } else {
          console.error('Failed to fetch user count');
        }
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    const fetchLowStockAlerts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/product/list'); 
        if (response.data.success) {
          const alerts = response.data.data.filter(product => product.quantity <= 5);
          setLowStockAlerts(alerts);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchUserCount();
    fetchLowStockAlerts(); 
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="adminSidebar">
        <ul className="sidebar-list">
          <li className="sidebar-item"><Link to="/dashboard/admin">Dashboard</Link></li>
          <li className="sidebar-item"><Link to="/add">Add Items</Link></li>
          <li className="sidebar-item"><Link to="/list">Inventory</Link></li>
          <li className="sidebar-item"><Link to="/orders">Orders</Link></li>
          <li className="sidebar-item"><Link to="/users">Users</Link></li>
          <li className="sidebar-item"><Link to="/sales">Sales</Link></li>
          <li className="sidebar-item"><Link to="/register"> Register Employee</Link></li>
          <li className="sidebar-item"><Link to="/acess"> Other Dashboards</Link></li>
        </ul>
      </div>
      <div className="dashboard-content">
        <h1>Admin Dashboard</h1>

        <div className="notification-section">
          <div className="notification-icon" onClick={() => setShowAlertsPopup(!showAlertsPopup)}>
            <img src={notiIcon} alt="Notifications" className="noti-icon" />
            {lowStockAlerts.length > 0 && <span className="notification-count">{lowStockAlerts.length}</span>}
          </div>
        </div>

        {showAlertsPopup && (
          <div className="alerts-popup">
            <h3>Low Stock Alerts</h3>
            {lowStockAlerts.length > 0 ? (
              <ul>
                {lowStockAlerts.map(product => (
                  <li key={product._id}>
                    {product.name}: {product.quantity} left
                    <span className="low-stock-message">Low Stock</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No low stock alerts.</p>
            )}
          </div>
        )}

        <div className="stats-container">
          <div className="stat-card">
            <h3>Registered Users</h3>
            <p className="stat-value">{userCount}</p>
          </div>
          <div className="stat-card"> 
            <h3>Number of Employees</h3>
            <p className="stat-value">12</p> 
          </div>
          <div className="stat-card"> {/* New total orders card */}
            <h3>Total Orders</h3>
            <p className="stat-value">9</p>
          </div>
        </div>

        <div className="graphs-container">
          <SalesGraph />
          <div className="revenue-graph-container">
            <RevenueGraph />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;