import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import './SupplierList.css';
import API_ENDPOINTS from '../../config/api.js';

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [filteredSuppliers, setFilteredSuppliers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const result = await axios.get(API_ENDPOINTS.SUPPLIERS.LIST);
                setSuppliers(result.data);
                setFilteredSuppliers(result.data);
            } catch (err) {
                console.error("Error fetching suppliers:", err);
                setMessage('Failed to fetch suppliers. Please try again later.');
            }
        };
        fetchSuppliers();
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        const filtered = suppliers.filter(supplier => 
            (supplier.name || '').toLowerCase().includes(query.toLowerCase()) ||
            (supplier.company_name || '').toLowerCase().includes(query.toLowerCase()) ||
            (supplier.email || '').toLowerCase().includes(query.toLowerCase())
        );
        setFilteredSuppliers(filtered);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(API_ENDPOINTS.SUPPLIERS.DELETE(id));
            setMessage('Successfully deleted!');
            setTimeout(() => setMessage(''), 3000);
            setSuppliers(suppliers.filter(supplier => supplier._id !== id));
            setFilteredSuppliers(filteredSuppliers.filter(supplier => supplier._id !== id));
        } catch (err) {
            console.error("Error deleting supplier:", err);
            setMessage('Failed to delete supplier. Please try again later.');
        }
    };

    const handleSort = (field) => {
        const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
            if (a[field] < b[field]) return sortOrder === 'asc' ? -1 : 1;
            if (a[field] > b[field]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        setFilteredSuppliers(sortedSuppliers);
    };

    const toggleSortOrder = () => {
        setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
        handleSort(sortField); // Re-sort after toggling order
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text('Supplier List', 14, 20);
        
        filteredSuppliers.forEach((supplier, index) => {
            const { name, company_name, contact_number, email } = supplier;
            doc.text(`${index + 1}. Name: ${name}, Company: ${company_name}, Contact: ${contact_number}, Email: ${email}`, 14, 30 + (index * 10));
        });

        doc.save('suppliers.pdf');
    };

    return (
        <div className="dashboard">
            <div className="SupplierSidebar">
                <ul>
                    <li><Link to="/logistics">Dashboard</Link></li>
                    <li><Link to="/addSupplier">Add Supplier</Link></li>
                    <li><Link to="/listSupplier">List Supplier</Link></li>
                    <li><Link to="/sup">Low Stock Products</Link></li>
                </ul>
            </div>
            <div className="suppliers-content">
                <div className="suppliers-header">
                    <Link to="/addSupplier" className="btn btn-add">Add</Link>
                    <form className="form-search">
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchQuery} 
                            onChange={handleSearchChange} 
                            className="form-control"
                        />
                    </form>
                    <div className="filter-wrapper">
                        <select onChange={(e) => {
                            setSortField(e.target.value);
                            handleSort(e.target.value);
                        }} value={sortField} className="form-select">
                            <option value="name">Name</option>
                            <option value="company_name">Company Name</option>
                            <option value="email">Email</option>
                        </select>
                        <button onClick={toggleSortOrder} className="btn btn-toggle-sort">
                            {sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
                        </button>
                    </div>
                </div>
                {message && <div className="alert alert-success">{message}</div>}
                {filteredSuppliers.length === 0 && <div className="alert alert-warning">No suppliers found based on your search criteria.</div>}
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Company Name</th>
                            <th>Contact Number</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSuppliers.map(supplier => (
                            <tr key={supplier._id}>
                                <td>{supplier.name}</td>
                                <td>{supplier.company_name}</td>
                                <td>{supplier.contact_number}</td>
                                <td>{supplier.email}</td>
                                <td>
                                    <Link to={`/updateSupplier/${supplier._id}`} className="btn btn-edit">EDIT</Link>
                                    <button className="btn btn-delete" onClick={() => handleDelete(supplier._id)}>DELETE</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={generatePDF} className="btn btn-generate-pdf">Generate PDF</button>
            </div>
        </div>
    );
};

export default SupplierList;