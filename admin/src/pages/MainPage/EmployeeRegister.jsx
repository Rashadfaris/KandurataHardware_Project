import React, { useState } from 'react';
import axios from 'axios';
import './EmployeeRegister.css'

const EmployeeRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee'); // Default role

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/employees/register', { name, email, password, role });
            alert("Employee registered successfully");
            // Optionally, redirect to login page or clear form
        } catch (error) { 
            console.error('Registration failed:', error.response?.data?.message || error.message);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
                <option value="logistics">Logistics</option>
                <option value="hr">HR</option>
                <option value="cashier">Cashier</option>
            </select>
            <button type="submit">Register</button>
        </form>
    );
};

export default EmployeeRegister;
