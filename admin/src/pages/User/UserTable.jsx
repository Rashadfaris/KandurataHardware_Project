import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './UserTable.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/user/all');
        const data = await response.json();
        if (data.success) {
          setUsers(data.users); // Update the state with the fetched users
        } else {
          console.error('Error fetching users:', data.message);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/user/${userId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        setUsers(users.filter(user => user._id !== userId)); // Remove the deleted user from the state
        toast.success('User deleted successfully!');
      } else {
        console.error('Error deleting user:', data.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDelete = (userId) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this user?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteUser(userId),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  return (
    <div className="user-table-container">
      <div className="UserSidebar">
        <ul className="sidebar-list">
        <li className="sidebar-item"><Link to="/dashboard/admin">Dashboard</Link></li>
          <li className="sidebar-item"><Link to="/add">Add Items</Link></li>
          <li className="sidebar-item"><Link to="/list">Inventory</Link></li>
          <li className="sidebar-item"><Link to="/orders">Orders</Link></li>
          <li className="sidebar-item"><Link to="/users">Users</Link></li>
          <li className="sidebar-item"><Link to="/sales">Sales</Link></li>
          <li className="sidebar-item"><Link to="/register"> Register Employee</Link></li>
          <li className="sidebar-item"><Link to="/acess"> Other Dashboards</Link></li>
        </ul>
      </div>
      <div className="user-table-content"> {/* Wrapper for table content */}
        <h1>User List</h1> {/* Add a heading for user list */}
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => handleDelete(user._id)} className="delete-button">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UserTable;
