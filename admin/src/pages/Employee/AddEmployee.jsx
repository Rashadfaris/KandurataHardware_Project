// AddEmployee.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddEmployee.css';
import API_ENDPOINTS from '../../config/api.js';

const AddEmployee = () => {
    const navigate = useNavigate(); // Use the useNavigate hook
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        nic: '',
        contactNumber: '',
        email: '',
        dob: '',
        employeeType: '',
    });

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { nic, contactNumber, email, dob } = employee;

        // NIC validation (assuming NIC is alphanumeric with 10-12 characters)
        const nicPattern = /^[0-9]{9}[vV]|[0-9]{12}$/;
        if (!nicPattern.test(nic)) {
            alert('NIC must be 10-12 characters long and may end with a letter (v or V).');
            return false;
        }

        // Contact number validation (must be 10 digits)
        if (!/^\d{10}$/.test(contactNumber)) {
            alert('Contact number must be exactly 10 digits.');
            return false;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        // Date of birth validation (should be in the past)
        if (new Date(dob) >= new Date()) {
            alert('Date of Birth must be in the past.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await fetch(API_ENDPOINTS.EMPLOYEES.BASE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee),
            });

            if (response.ok) {
                // Show success toast
                toast.success('Employee added successfully!');
                // Redirect to the list-employee page after a short delay
                setTimeout(() => {
                    navigate('/list-employee');
                }, 2000); // Redirect after 2 seconds
                // Reset form
                setEmployee({
                    firstName: '',
                    lastName: '',
                    nic: '',
                    contactNumber: '',
                    email: '',
                    dob: '',
                    employeeType: '',
                });
            } else if (response.status === 409) {
                alert('NIC already exists. Cannot add duplicate employee.');
            } else {
                alert('Error adding employee');
            }
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    return (
        <div>
            <ToastContainer /> {/* Toast container for notifications */}
            <form onSubmit={handleSubmit} className="employee-form">
                <input
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                    required
                />
                <input
                    name="lastName"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <input
                    name="nic"
                    placeholder="NIC"
                    onChange={handleChange}
                    required
                />
                <input
                    name="contactNumber"
                    placeholder="Contact Number"
                    onChange={handleChange}
                    required
                />
                <input
                    name="email"
                    placeholder="Email"
                    type="email"
                    onChange={handleChange}
                    required
                />
                <input
                    name="dob"
                    placeholder="Date of Birth"
                    type="date"
                    onChange={handleChange}
                    required
                />
                <select
                    name="employeeType"
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Employee Type</option>
                    <option value="worker">Worker</option>
                    <option value="cashier">Cashier</option>
                    <option value="hr-manager">HR Manager</option>
                    <option value="logistics-manager">Logistics Manager</option>
                </select>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployee;
