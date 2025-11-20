import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_ENDPOINTS from '../../config/api.js';

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);

  // Fetch leaves when the component mounts
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.LEAVES.BASE);
        setLeaves(response.data);
      } catch (error) {
        console.error('Error fetching leaves:', error);
      }
    };

    fetchLeaves();
  }, []);

  return (
    <div>
      <h2>Submitted Leave Requests</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Date From</th>
            <th>Date To</th>
            <th>Leave Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, index) => (
            <tr key={index}>
              <td>{leave.username}</td>
              <td>{leave.role}</td>
              <td>{leave.dateFrom}</td>
              <td>{leave.dateTo}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveList;
