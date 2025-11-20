import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_ENDPOINTS from '../../config/api.js';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    nic: '',
    contactNumber: '',
    email: '',
    dob: '',
    employeeType: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.EMPLOYEES.BY_ID(id));
        if (!response.ok) throw new Error('Employee not found');
        const data = await response.json();
        setEmployee({
          firstName: data.firstName,
          lastName: data.lastName,
          nic: data.nic,
          contactNumber: data.contactNumber,
          email: data.email,
          dob: new Date(data.dob).toISOString().split('T')[0],
          employeeType: data.employeeType
        });
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchEmployee();
  }, [id]);

  const validate = async () => {
    let tempErrors = {};
    const nicPattern = /^(\d{9}[VvXx]|\d{12})$/;
    if (!nicPattern.test(employee.nic)) {
      tempErrors.nic = 'NIC format is invalid';
    } else {
      try {
        const nicCheck = await fetch(API_ENDPOINTS.EMPLOYEES.CHECK_NIC(employee.nic));
        if (!nicCheck.ok) throw new Error('NIC check failed');
        const nicExists = await nicCheck.json();
        if (nicExists && nicExists.id !== id) {
          tempErrors.nic = 'NIC already exists';
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    const contactPattern = /^\d{10}$/;
    if (!contactPattern.test(employee.contactNumber)) {
      tempErrors.contactNumber = 'Contact number is invalid';
    }

    const today = new Date().toISOString().split('T')[0];
    if (employee.dob >= today) {
      tempErrors.dob = 'Date of birth cannot be a future date';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await validate()) {
      try {
        const response = await fetch(API_ENDPOINTS.EMPLOYEES.BY_ID(id), {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(employee),
        });
        if (response.ok) {
          toast.success('Employee updated successfully!'); // Show success toast
          navigate('/list-employee');
        } else {
          console.error('Failed to update employee');
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div>
      <ToastContainer /> {/* Add ToastContainer here */}
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={employee.firstName}
          onChange={handleChange}
        />
        <br />

        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={employee.lastName}
          onChange={handleChange}
        />
        <br />

        <label>NIC:</label>
        <input
          type="text"
          name="nic"
          value={employee.nic}
          onChange={handleChange}
        />
        {errors.nic && <p style={{ color: 'red' }}>{errors.nic}</p>}
        <br />

        <label>Contact Number:</label>
        <input
          type="text"
          name="contactNumber"
          value={employee.contactNumber}
          onChange={handleChange}
        />
        {errors.contactNumber && <p style={{ color: 'red' }}>{errors.contactNumber}</p>}
        <br />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
        />
        <br />

        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={employee.dob}
          onChange={handleChange}
        />
        {errors.dob && <p style={{ color: 'red' }}>{errors.dob}</p>}
        <br />

        <label>Employee Type:</label>
        <select
          name="employeeType"
          value={employee.employeeType}
          onChange={handleChange}
        >
          <option value="">Select Type</option>
          <option value="worker">Worker</option>
          <option value="cashier">Cashier</option>
          <option value="hr-manager">HR Manager</option>
          <option value="logistics-manager">Logistics Manager</option>
        </select>
        <br />

        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
