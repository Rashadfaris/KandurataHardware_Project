import React from 'react';

const DriverCard = ({ driver, onEdit, onDelete }) => {
  return (
    <div className="driver-card">
      <h3>{driver.firstName} {driver.lastName}</h3>
      <p>Vehicle Model: {driver.vehicleModel}</p>
      <p>NIC Number: {driver.nicNumber}</p>
      <div className="driver-actions">
        <button onClick={() => onDelete(driver._id)}>Delete</button>
        <button onClick={() => onEdit(driver)}>Edit</button>
      </div>
    </div>
  );
};

export default DriverCard;
