import React from 'react';
import './DashAcess.css';
import { Link } from 'react-router-dom'; 

const Access = () => {
  return (
    <div className="Dash-page">
      <h1 className="dash-message">Kandurata Hardware Employee Acess</h1>
      <div className="dbutton-container">
        <Link to="/logistics">
          <button className="dnav-button">Logistic Manager</button>
        </Link>
        <Link to="/dashboard/cashier">
          <button className="dnav-button">Cashier Dashboard</button>
        </Link>
        <Link to="/hr">
          <button className="dnav-button">HR Manager</button>
        </Link>
        <Link to="/employee">
          <button className="dnav-button">Employee Dashboard</button>
        </Link>
       
      </div>
    </div>
  );
}

export default Access;