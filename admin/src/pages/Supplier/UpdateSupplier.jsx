import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './UpdateSupplier.css';

const UpdateSupplier = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [supplier, setSupplier] = useState({
        name: '',
        company_name: '',
        contact_number: '',
        email: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/suppliers/getSupplierById/${id}`);
                setSupplier(response.data);
            } catch (error) {
                setError('Failed to fetch supplier details');
            }
        };
        fetchSupplier();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier({ ...supplier, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5001/api/suppliers/updateSupplier/${id}`, supplier);
            toast.success('Supplier updated successfully!'); 
            setTimeout(() => {
                navigate('/listSupplier'); 
            }, 2000);
        } catch (error) {
            setError('Failed to update supplier details');
        }
    };

    return (
        <div className="upd-supplier-container">
            <div className="update-user-container">
                <div className="form-container">
                    <h2>Update Supplier</h2>
                    {error && <div className="text-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="form-label">Name:</label>
                            <input 
                                type="text" 
                                name="name" 
                                className="form-control" 
                                value={supplier.name} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div>
                            <label className="form-label">Company Name:</label>
                            <input 
                                type="text" 
                                name="company_name" 
                                className="form-control" 
                                value={supplier.company_name} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div>
                            <label className="form-label">Contact Number:</label>
                            <input 
                                type="text" 
                                name="contact_number" 
                                className="form-control" 
                                value={supplier.contact_number} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div>
                            <label className="form-label">Email:</label>
                            <input 
                                type="email" 
                                name="email" 
                                className="form-control" 
                                value={supplier.email} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <button type="submit" className="btn-update">Update Supplier</button>
                    </form>
                </div>
            </div>
            <ToastContainer /> 
        </div>
    );
};

export default UpdateSupplier;