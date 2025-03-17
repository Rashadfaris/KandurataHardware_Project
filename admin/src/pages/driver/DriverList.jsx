import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditDriver from './EditDriver'; // Import the EditDriver component
import './DriverList.css';

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [driverToEdit, setDriverToEdit] = useState(null); // State for editing driver
  const [driverToDelete, setDriverToDelete] = useState(null);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:5001/drivers');
      setDrivers(response.data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  const confirmDelete = (id) => {
    setDriverToDelete(id);
    setIsModalOpen(true);
  };

  const deleteDriver = async () => {
    if (driverToDelete) {
      try {
        await axios.delete(`http://localhost:5001/drivers/${driverToDelete}`);
        fetchDrivers(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting driver:', error);
      }
      setDriverToDelete(null);
    }
  };

  // Open the modal and set the driver to edit
  const editDriver = (driver) => {
    setDriverToEdit(driver); // Set the selected driver for editing
    setIsModalOpen(true); // Open the modal
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <div className="driver-list-container">
      <div className="DriverListSidebar">
        <ul>
          <li><Link to="/logistics">Dashboard</Link></li>
          <li><Link to="/sample">Manage Order</Link></li>
          <li><Link to="/drivers">Driver Details</Link></li>
          <li><Link to="/drivers/add">Add Driver</Link></li>
          <li><Link to="/drivers">Delete Driver</Link></li>
        </ul>
      </div>

      <div className="driver-list-content">
        <h1>Driver Details</h1>
        {drivers.length === 0 ? (
          <p>No drivers available</p>
        ) : (
          <table className="driver-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Address</th>
                <th>NIC Number</th>
                <th>Mobile Number</th>
                <th>Address</th>
                <th>Vehicle Model</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver._id}>
                  <td>{driver.firstName}</td>
                  <td>{driver.lastName}</td>
                  <td>{driver.emailAddress}</td>
                  <td>{driver.nicNumber}</td>
                  <td>{driver.mobileNumber}</td>
                  <td>{driver.homeAddress}</td>
                  <td>{driver.vehicleModel}</td>
                  <td className="driver-actions">
                    <button className="edit-button2" onClick={() => editDriver(driver)}>Edit Driver</button>
                    <button className="delete-button1" onClick={() => confirmDelete(driver._id)}>Remove Driver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Confirmation Modal */}
        {driverToDelete && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Confirm Deletion</h3>
              <p>Are you sure you want to delete this driver?</p>
              <div className="modal-actions">
                <button className="confirm-delete-button" onClick={deleteDriver}>Yes, Delete</button>
                <button className="cancel-button" onClick={() => setDriverToDelete(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Driver Modal */}
        {isModalOpen && driverToEdit && (
          <div className="modal-overlay">
            <div className="modal-content">
              <EditDriver driver={driverToEdit} closeModal={() => setIsModalOpen(false)} fetchDrivers={fetchDrivers} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverList;
