import React, { useEffect, useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './LogisticsManager.css';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5001/api');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(`Order Fetch Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const orderCounts = useMemo(() => {
    const orderDates = orders.map(order => new Date(order.date).toLocaleDateString());
    return orderDates.reduce((acc, date) => {
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
  }, [orders]);

  const labels = Object.keys(orderCounts).sort((a, b) => new Date(a) - new Date(b));
  const orderData = labels.map(date => orderCounts[date]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Number of Orders',
        data: orderData,
        borderColor: 'tomato', // Line color changed to tomato
        backgroundColor: 'rgba(255, 99, 71, 0.2)', // Fill color (tomato with transparency)
        fill: true, // Enable filling under the line
      },
    ],
  };
  

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="dashboard">
      <div className="LogisticSidebar">
        <ul>
          <li><Link to="/logistics">Dashboard</Link></li>
          <li><Link to="/sample">Manage Order</Link></li>
          <li><Link to="/sup">Supplier Manager</Link></li>
          <li><Link to="/drivers">Driver Details</Link></li>
          <li><Link to="/drivers/add">Add Driver</Link></li>
          <li><Link to="/drivers">Delete Driver</Link></li>
          <li><Link to="/new">Leave Request</Link></li>
        </ul>
      </div>
      <div className="main-content">
        <div className="stats">
          <div className="stat-box">
            <p>Orders</p>
            <h2>{orders.length}</h2>
          </div>
          <div className="stat-box">
            <p>Orders in Progress</p>
            <h2>{orders.length}</h2>
          </div>
          <div className="stat-box">
            <p>Orders Failed</p>
            <h2>0</h2>
          </div>
        </div>
        <div className="chart-section">
          <h3>Number of Orders Over Time</h3>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
