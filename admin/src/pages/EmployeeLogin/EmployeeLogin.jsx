import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EmployeeLogin.css'; // Ensure correct CSS path

const EmployeeLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/employees/login', { email: username, password });
            const { token, role, user } = response.data;

            // Save token and role to local storage
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('user', JSON.stringify(user));

            // Redirect based on role
            const routes = {
                admin: '/dashboard/admin',
                logistics: '/logistics',
                hr: '/hr',
                cashier: '/dashboard/cashier',
                employee: '/employee',
            };
            window.location.href = routes[role] || '/unauthorized';
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || error.message);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-form-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default EmployeeLogin;
