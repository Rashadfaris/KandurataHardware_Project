import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LeaveForm.css'; // Add styles for modal

const LeaveForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    role: '',
    dateFrom: '',
    dateTo: '',
    leaveType: '',
    description: '',
  });
  const [leaves, setLeaves] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that the "To" date is after the "From" date
    if (new Date(formData.dateTo) <= new Date(formData.dateFrom)) {
      alert('The "To" date must be after the "From" date.');
      return;
    }

    try {
      if (editingId) {
        // Update existing leave request
        await axios.put(`http://localhost:5001/api/leaves/${editingId}`, formData);
        alert('Leave request updated successfully');
      } else {
        // Create a new leave request
        await axios.post('http://localhost:5001/api/leaves', formData);
        alert('Leave request submitted successfully');
      }
      fetchLeaves();
      setFormData({
        username: '',
        role: '', // Clear the role field after submission
        dateFrom: '',
        dateTo: '',
        leaveType: '',
        description: '',
      });
      setEditingId(null); // Reset editing state
    } catch (error) {
      console.error('Error submitting leave request:', error);
      alert('Error submitting leave request');
    }
  };

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/leaves?role=${userRole}`);
      setLeaves(response.data);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };

  useEffect(() => {
    const fetchedRole = localStorage.getItem('userRole')?.toLowerCase() || 'logistics-manager'; // Example role
    setUserRole(fetchedRole);
    fetchLeaves();
  }, []);

  const handleEdit = (leave) => {
    setEditingId(leave._id);
    setFormData({
      username: leave.username,
      role: leave.role, // Use the role from the leave request
      dateFrom: leave.dateFrom.split('T')[0],
      dateTo: leave.dateTo.split('T')[0],
      leaveType: leave.leaveType,
      description: leave.description,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/leaves/${id}`);
      alert('Leave request deleted successfully');
      fetchLeaves();
    } catch (error) {
      console.error('Error deleting leave request:', error);
      alert('Error deleting leave request');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:5001/api/leaves/${id}`, { status });
      fetchLeaves();
    } catch (error) {
      console.error('Error updating leave request status:', error);
      alert('Error updating leave request status');
    }
  };

  const openModal = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      <h2> Leave Request Form</h2>
      <form className='form1' onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label>Role:</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        />

        <label>From:</label>
        <input
          type="date"
          name="dateFrom"
          value={formData.dateFrom}
          onChange={handleChange}
          required
        />

        <label>To:</label>
        <input
          type="date"
          name="dateTo"
          value={formData.dateTo}
          onChange={handleChange}
          required
        />

        <label>Leave Type:</label>
        <select
          name="leaveType"
          value={formData.leaveType}
          onChange={handleChange}
          required
        >
          <option value="">Select Leave Type</option>
          <option value="Medical Leave">Medical Leave</option>
          <option value="Short Leave">Short Leave</option>
          <option value="Casual Leave">Casual Leave</option>
        </select>

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? 'Save Changes' : 'Request Leave'}
        </button>
      </form>

      <button onClick={openModal}>Show Leave Requests</button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button onClick={closeModal} className="close-modal">X</button>
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
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave, index) => (
                  <tr key={index}>
                    <td>{leave.username}</td>
                    <td>{leave.role}</td>
                    <td>{new Date(leave.dateFrom).toLocaleDateString()}</td>
                    <td>{new Date(leave.dateTo).toLocaleDateString()}</td>
                    <td>{leave.leaveType}</td>
                    <td>{leave.description}</td>
                    <td>{leave.status}</td>
                    <td>
                      {userRole === 'hr-manager' ? (
                        <>
                          <button onClick={() => handleStatusChange(leave._id, 'Accepted')}>Approve</button>
                          <button onClick={() => handleStatusChange(leave._id, 'Declined')}>Reject</button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => handleEdit(leave)} 
                            disabled={leave.status === 'Accepted'}
                          >
                            Modify
                          </button>
                          <button 
                            onClick={() => handleDelete(leave._id)} 
                            disabled={leave.status === 'Accepted'}
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveForm;
