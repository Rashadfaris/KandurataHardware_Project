import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './DriverForm.css';

const DriverForm = () => {
  const [driver, setDriver] = useState({
    firstName: '',
    lastName: '',
    nicNumber: '',
    mobileNumber: '',
    homeAddress: '',
    emailAddress: '',
    vehicleModel: ''
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState({
    nicNumber: false,
    mobileNumber: false,
    emailAddress: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const vehicleModels = ['Lorry', 'Van', 'Bike', 'Three Wheeler'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriver((prevDriver) => ({ ...prevDriver, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let formErrors = { ...errors };
    let valid = false;

    const mobileRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nicRegex = /^(200\d{8,10}|200\d{10}V)$/;

    switch (name) {
      case 'mobileNumber':
        valid = mobileRegex.test(value);
        formErrors.mobileNumber = valid ? '' : 'Mobile number must be exactly 10 digits.';
        break;
      case 'emailAddress':
        valid = emailRegex.test(value);
        formErrors.emailAddress = valid ? '' : 'Please enter a valid email address.';
        break;
      case 'nicNumber':
        valid = nicRegex.test(value);
        formErrors.nicNumber = valid ? '' : 'NIC number must be 12 digits or 11 digits followed by "V".';
        break;
      default:
        break;
    }

    setIsValid((prevValid) => ({ ...prevValid, [name]: valid }));
    setErrors(formErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValid.nicNumber && isValid.mobileNumber && isValid.emailAddress) {
      setIsSubmitting(true);
      try {
        await axios.post('http://localhost:5001/drivers', driver);
        setDriver({
          firstName: '',
          lastName: '',
          nicNumber: '',
          mobileNumber: '',
          homeAddress: '',
          emailAddress: '',
          vehicleModel: ''
        });
        setSuccessMessage('Driver successfully registered!');

        setTimeout(() => {
          setSuccessMessage('');
          navigate('/drivers');
        }, 2000);
      } catch (error) {
        console.error('Error adding driver:', error);
        setErrors({ submit: 'Failed to register driver. Please try again later.' });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      validateField('nicNumber', driver.nicNumber);
      validateField('mobileNumber', driver.mobileNumber);
      validateField('emailAddress', driver.emailAddress);
    }
  };

  return (
    <div className="driver-form-container">
      <div className="AddDriverSidebar">
        <ul>
          <li><Link to="/logistics">Dashboard</Link></li>
          <li><Link to="/sample">Manage Order</Link></li>
          <li><Link to="/drivers">Driver Details</Link></li>
          <li><Link to="/drivers/add">Add Driver</Link></li>
          <li><Link to="/drivers">Delete Driver</Link></li>
        </ul>
      </div>

      <div className="form-content">
        <h2 className="form-heading">Register New Driver</h2>
        {errors.submit && <span className="error">{errors.submit}</span>}
        
        {/* Success message */}
        {successMessage && <div className="success-alert">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="driver-form">
          <input
            name="firstName"
            value={driver.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            name="lastName"
            value={driver.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          <input
            name="nicNumber"
            value={driver.nicNumber}
            onChange={handleChange}
            placeholder="NIC Number"
            required
          />
          {errors.nicNumber && <span className="error">{errors.nicNumber}</span>}
          <input
            name="mobileNumber"
            value={driver.mobileNumber}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
          />
          {errors.mobileNumber && <span className="error">{errors.mobileNumber}</span>}
          <input
            name="homeAddress"
            value={driver.homeAddress}
            onChange={handleChange}
            placeholder="Home Address"
            required
          />
          <input
            name="emailAddress"
            value={driver.emailAddress}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />
          {errors.emailAddress && <span className="error">{errors.emailAddress}</span>}

          {/* Dropdown for Vehicle Model */}
          <select 
            name="vehicleModel" 
            value={driver.vehicleModel} 
            onChange={handleChange} 
            required
          >
            <option value="" disabled>Select Vehicle Model</option>
            {vehicleModels.map((model, index) => (
              <option key={index} value={model}>{model}</option>
            ))}
          </select>

          <button type="submit" className="add-driver-button" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register Driver'}
          </button>
          <button type="button" className="cancel-button1" onClick={() => navigate('/drivers')}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default DriverForm;
