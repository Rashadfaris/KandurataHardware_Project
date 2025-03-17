// EmployeeList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Make sure to install this for table support
import './EmployeeList.css';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await fetch('http://localhost:5001/api/employees');
            const data = await response.json();
            setEmployees(data);
        };
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:5001/api/employees/${id}`, { method: 'DELETE' });
        if (response.ok) {
            setEmployees(employees.filter(emp => emp._id !== id));
            toast.success('Employee deleted successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error('Failed to delete employee!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (e) => {
        setSelectedType(e.target.value);
    };

    const filteredEmployees = employees
        .filter(employee => 
            employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
            employee.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(employee => 
            selectedType ? employee.employeeType === selectedType : true
        );

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('Employee List', 14, 22);

        const tableColumn = ["First Name", "Last Name", "NIC", "Contact Number", "Email", "Date of Birth", "Employee Type"];
        const tableRows = [];

        filteredEmployees.forEach(employee => {
            const employeeData = [
                employee.firstName,
                employee.lastName,
                employee.nic,
                employee.contactNumber,
                employee.email,
                new Date(employee.dob).toLocaleDateString(),
                employee.employeeType,
            ];
            tableRows.push(employeeData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 30 });
        doc.save('employee_list.pdf');
    };

    return (
        <div className="employee-list">
            <h2>Employee List</h2>
            
            <input 
                type="text" 
                placeholder="Search by name..." 
                value={searchTerm} 
                onChange={handleSearch} 
            />
            
            <select value={selectedType} onChange={handleSort}>
                <option value="">All Types</option>
                <option value="worker">Worker</option>
                <option value="cashier">Cashier</option>
                <option value="hr-manager">HR Manager</option>
                <option value="logistics-manager">Logistics Manager</option>
            </select>
            
            <button onClick={generatePDF}>Generate PDF</button>

            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>NIC</th>
                        <th>Contact Number</th>
                        <th>Email</th>
                        <th>Date of Birth</th>
                        <th>Employee Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map(employee => (
                        <tr key={employee._id}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.nic}</td>
                            <td>{employee.contactNumber}</td>
                            <td>{employee.email}</td>
                            <td>{new Date(employee.dob).toLocaleDateString()}</td>
                            <td>{employee.employeeType}</td>
                            <td>
                                <div className="action-buttons">
                                    <Link to={`/edit-employee/${employee._id}`} className="edit-button">Edit</Link>
                                    <button onClick={() => handleDelete(employee._id)} className="delete-button">Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default EmployeeList;
