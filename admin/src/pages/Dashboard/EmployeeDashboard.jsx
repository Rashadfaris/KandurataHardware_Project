import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const EmployeeDashboard = () => {
  return (
    <div>
      <h1>Employee Dashboard</h1>
      {/* Add Employee dashboard content here */}
      
      {/* Button to redirect to Leave Request Form */}
      <Link to="/leaves/new" >
        <button className="nav-button">Request Leave</button>
      </Link>
    </div>
  );
};

export default EmployeeDashboard;
