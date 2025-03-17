import React, { useState } from 'react';
import axios from 'axios';
import './EditDriver.css';

const EditDriver = ({ driver, closeModal, fetchDrivers }) => {
  const [firstName, setFirstName] = useState(driver.firstName || '');
  const [lastName, setLastName] = useState(driver.lastName || '');
  const [vehicleModel, setVehicleModel] = useState(driver.vehicleModel || '');
  const [nicNumber] = useState(driver.nicNumber || ''); // Read-only field
  const [homeAddress, setHomeAddress] = useState(driver.homeAddress || '');
  const [mobileNumber] = useState(driver.mobileNumber || ''); // Read-only field
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const vehicleModels = ['Lorry', 'Van', 'Bike', 'Three Wheeler'];

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !vehicleModel || !homeAddress) {
      setError('All fields are required.');
      return;
    }

    try {
      await axios.put(`http://localhost:5001/drivers/${driver._id}`, {
        firstName,
        lastName,
        vehicleModel,
        nicNumber,
        homeAddress,
        mobileNumber,
      });
      setSuccessMessage('Driver details updated successfully!');
      setTimeout(() => {
        closeModal(); // Close the modal after a successful update
        fetchDrivers(); // Refresh the driver list
      }, 2000);
    } catch (error) {
      setError('Error updating driver.');
    }
  };

  return (
    <div className="edit-driver-container">
      <h2>Edit Driver</h2>
      
      {successMessage && <div className="success-alert">{successMessage}</div>}

      <form onSubmit={handleEditSubmit} className="edit-driver-form">
        <label>First Name</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

        <label>Last Name</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

        <label>NIC Number</label>
        <input type="text" value={nicNumber} readOnly />

        <label>Home Address</label>
        <input type="text" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} required />

        <label>Mobile Number</label>
        <input type="tel" value={mobileNumber} readOnly />

        <label>Vehicle Model</label>
        <select value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} required>
          <option value="" disabled>Select Vehicle Model</option>
          {vehicleModels.map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))}
        </select>

        <div className="form-buttons">
          <button type="submit" className="save-button">Save Changes</button>
          <button type="button" className="cancel-button" onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditDriver;
