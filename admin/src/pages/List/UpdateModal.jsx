import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './UpdateModal.css'; 
import { assets } from '../../assets/assets';

const UpdateModal = ({ isOpen, onRequestClose, product, onUpdate }) => {
  const url = "http://localhost:5001";

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [wholesalePrice, setWholesalePrice] = useState('');
  const [retailPrice, setRetailPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [date, setDate] = useState('');
  const [suppliers, setSuppliers] = useState([]); // State for suppliers

  const categories = [
    'Building and Hardware', 
    'Safety Gear', 
    'Paint', 
    'Tools', 
    'Storage', 
    'Lighting', 
    'Gardening', 
    'Fasteners'
  ];

  useEffect(() => {
    // Populate form fields if a product is selected
    if (product && isOpen) {
      setName(product.name || '');
      setDescription(product.description || '');
      setWholesalePrice(product.wholesalePrice || '');
      setRetailPrice(product.retailPrice || '');
      setQuantity(product.quantity || '');
      setCategory(product.category || '');
      setSupplierName(product.supplierName || '');
      setDate(product.date.split('T')[0] || '');
    }

    // Fetch suppliers when modal is opened
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(`${url}/api/suppliers/getSuppliers`);
        setSuppliers(response.data); // Populate suppliers
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, [product, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/api/product/update`, {
        id: product._id,
        name,
        description,
        wholesalePrice: parseFloat(wholesalePrice),
        retailPrice: parseFloat(retailPrice),
        quantity: parseInt(quantity, 10),
        category,
        supplierName,
        date: new Date(date).toISOString()
      });

      if (response.data.success) {
        onRequestClose(); // Close the modal first
        confirmAlert({
          title: 'Success',
          message: 'Product updated successfully!',
          buttons: [
            {
              label: 'OK',
              onClick: () => onUpdate(), // Refresh product list
            }
          ]
        });
      } else {
        confirmAlert({
          title: 'Error',
          message: 'Error updating product. Please try again.',
          buttons: [{ label: 'OK' }]
        });
      }
    } catch (error) {
      confirmAlert({
        title: 'Network Error',
        message: 'Error updating product due to network issues.',
        buttons: [{ label: 'OK' }]
      });
      console.error('Error updating product:', error);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      ariaHideApp={false}
      overlayClassName="update-modal-overlay"
      className="update-modal-content"
    >
      <div className="update-modal-title">
        <h2>Edit Product</h2>
        <img src={assets.cross_icon} onClick={onRequestClose} alt="Close" />
      </div>
      <form onSubmit={handleSubmit} className="update-modal-input">
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4"></textarea>
        </div>
        <div>
          <label>Wholesale Price:</label>
          <input type="number" value={wholesalePrice} onChange={(e) => setWholesalePrice(e.target.value)} required />
        </div>
        <div>
          <label>Retail Price:</label>
          <input type="number" value={retailPrice} onChange={(e) => setRetailPrice(e.target.value)} required />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Supplier Name:</label>
          <select value={supplierName} onChange={(e) => setSupplierName(e.target.value)} required>
            <option value="">Select a supplier</option>
            {suppliers.map(supplier => (
              <option key={supplier._id} value={supplier.name}>{supplier.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </Modal>
  );
};

export default UpdateModal;
