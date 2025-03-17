import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import UpdateModal from './UpdateModal';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './List.css';
import notiIcon from '../../assets/noti_icon.jpeg'; // Import your notification icon
import { Link } from 'react-router-dom'; // Import Link for navigation

const List = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [lowStockAlerts, setLowStockAlerts] = useState([]); // State for low stock alerts
  const [showAlertsPopup, setShowAlertsPopup] = useState(false); // State to toggle popup
 
  const url = "http://localhost:5001/api/product";

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${url}/list`);
      if (response.data.success) {
        setProducts(response.data.data);
        const uniqueSuppliers = Array.from(new Set(response.data.data.map(product => product.supplierName)));
        setSuppliers(uniqueSuppliers);

        // Check for low stock and set alerts
        const alerts = response.data.data.filter(product => product.quantity <= 5);
        setLowStockAlerts(alerts);
      } else {
        toast.error("Error fetching products");
      }
    } catch (error) {
      toast.error("Network Error");
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    fetchProducts();
    toast.success("Product updated successfully!");
  };

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await axios.post(`${url}/remove`, { id });
              if (response.data.success) {
                confirmAlert({
                  title: 'Deleted',
                  message: 'Product removed successfully!',
                  buttons: [
                    {
                      label: 'OK',
                      onClick: () => fetchProducts() // Refresh products after deletion
                    }
                  ]
                });
              } else {
                confirmAlert({
                  title: 'Error',
                  message: 'Error removing product.',
                  buttons: [
                    {
                      label: 'OK',
                    }
                  ]
                });
              }
            } catch (error) {
              confirmAlert({
                title: 'Network Error',
                message: 'There was an issue with the network.',
                buttons: [
                  {
                    label: 'OK',
                  }
                ]
              });
              console.error("Error removing product:", error);
            }
          }
        },
        {
          label: 'No',
          onClick: () => console.log('Deletion cancelled')
        }
      ]
    });
  };
  

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Product List by Supplier", 14, 16);
    const filteredBySupplier = products.filter(product => product.supplierName === selectedSupplier);
    
    autoTable(doc, {
      head: [['Name', 'Description', 'Wholesale Price', 'Retail Price', 'Quantity', 'Category', 'Date']],
      body: filteredBySupplier.map(product => [
        product.name,
        product.description,
        product.wholesalePrice,
        product.retailPrice,
        product.quantity,
        product.category,
        new Date(product.date).toLocaleDateString()
      ])
    });

    if (filteredBySupplier.length > 0) {
      doc.save(`${selectedSupplier}-product-list.pdf`);
    } else {
      toast.error("No products found for the selected supplier");
    }
  };

  const generateCSV = () => {
    const csv = Papa.unparse(products, {
      fields: ['name', 'description', 'wholesalePrice', 'retailPrice', 'quantity', 'category', 'supplierName', 'date']
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'product-list.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-container">
      <div className="SalesSidebar">
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
      
      <div className="product-list-container">
        <h2>Product List</h2>
        <input
          type="text"
          placeholder="Search by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {/* Notification section */}
        <div className="notification-section">
          <div className="notification-icon" onClick={() => setShowAlertsPopup(!showAlertsPopup)}>
            <img src={notiIcon} alt="Notifications" className="noti-icon" />
            {lowStockAlerts.length > 0 && <span className="notification-count">{lowStockAlerts.length}</span>}
          </div>
        </div>

        {/* Low Stock Alerts Popup */}
        {showAlertsPopup && (
          <div className="alerts-popup">
            <h3>Low Stock Alerts</h3>
            {lowStockAlerts.length > 0 ? (
              <ul>
                {lowStockAlerts.map(product => (
                  <li key={product._id}>
                    {product.name}: {product.quantity} left
                    <span className="low-stock-message">Low Stock</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No low stock alerts.</p>
            )}
          </div>
        )}

        <div className="supplier-selection">
          <label htmlFor="supplier">Select Supplier:</label>
          <select
            id="supplier"
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
          >
            <option value="">All Suppliers</option>
            {suppliers.map(supplier => (
              <option key={supplier} value={supplier}>{supplier}</option>
            ))}
          </select>
        </div>

        <div className="actions">
          <button onClick={generatePDF}>Download PDF</button>
          <button onClick={generateCSV}>Download CSV</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Wholesale Price</th>
              <th>Retail Price</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Supplier Name</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.wholesalePrice}</td>
                <td>{product.retailPrice}</td>
                <td>
                  {product.quantity}
                  {product.quantity <= 5 && (
                    <div className="low-stock-container">
                      <span className="low-stock-message">Low Stock</span>
                    </div>
                  )}
                </td>
                <td>{product.category}</td>
                <td>{product.supplierName}</td>
                <td>{new Date(product.date).toLocaleDateString()}</td>
                <td className="actions">
                  <button onClick={() => handleEdit(product)}>Edit</button>
                  <button onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Update Modal */}
        <UpdateModal 
          isOpen={isModalOpen} 
          onRequestClose={() => setIsModalOpen(false)} 
          product={selectedProduct} 
          onUpdate={handleUpdate} 
        />
      </div>
    </div>
  );
};

export default List;