// Driver.jsx

import React, { useEffect, useState } from 'react';

const Driver = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/orders');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <h1>Orders</h1>
            <ul>
                {orders.map(order => (
                    <li key={order._id}>{order.details}</li> // Adjust according to your order structure
                ))}
            </ul>
        </div>
    );
};

export default Driver;
