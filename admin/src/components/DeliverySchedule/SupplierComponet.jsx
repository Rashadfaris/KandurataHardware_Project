import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './SupplierComponent.css';

const SupplierComponent = () => {
  const navigate = useNavigate();
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]); // State to store suppliers with emails

  const productUrl = "http://localhost:5001/api/product";
  const supplierUrl = "http://localhost:5001/api/suppliers/getSuppliers";

  // Fetch low stock products
  const fetchLowStockProducts = async () => {
    try {
      const response = await axios.get(`${productUrl}/list`);
      if (response.data.success) {
        const alerts = response.data.data.filter(product => product.quantity <= 5);
        setLowStockProducts(alerts);
      }
    } catch (error) {
      console.error("Error fetching low stock products:", error);
    }
  };

  // Fetch supplier emails
  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(supplierUrl);
      if (response.data) {
        setSuppliers(response.data); // Set supplier data with emails
      }
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  useEffect(() => {
    fetchLowStockProducts();
    fetchSuppliers();
  }, []);

  const handleBack = () => {
    navigate('/sup');
  };

  // Match supplier name to email
  const getSupplierEmail = (supplierName) => {
    const supplier = suppliers.find(s => s.name === supplierName);
    return supplier ? supplier.email : 'No email available';
  };

  const handleRequestProduct = (productName, supplierName) => {
    const supplierEmail = getSupplierEmail(supplierName); // Get email from supplier data
    const mailtoLink = `mailto:${supplierEmail}?subject=Request%20for%20Product:%20${productName}&body=Dear%20${supplierName},%0D%0A%0D%0AI%20would%20like%20to%20request%20the%20following%20product:%0D%0A%0D%0AProduct%20Name:%20${productName}%0D%0A%0D%0AThank%20you,%0D%0A[Your%20Name]`;
    window.location.href = mailtoLink;
  };

  // Function to group products by supplier
  const groupBySupplier = (products) => {
    return products.reduce((grouped, product) => {
      const { supplierName } = product;
      if (!grouped[supplierName]) {
        grouped[supplierName] = [];
      }
      grouped[supplierName].push(product);
      return grouped;
    }, {});
  };

  const groupedProducts = groupBySupplier(lowStockProducts);

  return (
    <div className="app-content">
      <div className="DriverListSidebar">
        <ul>
          <li><Link to="/logistics">Dashboard</Link></li>
          <li><Link to="/addSupplier">Add Supplier</Link></li>
          <li><Link to="/listSupplier">List Supplier</Link></li>
          <li><Link to="/low-stock">Low Stock Products</Link></li>
        </ul>
      </div>

      <h2>Low Stock Products</h2>
      {lowStockProducts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Products</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedProducts).map(([supplierName, products]) => (
              <tr key={supplierName}>
                <td>{supplierName}</td>
                <td>
                  <ul>
                    {products.map(product => (
                      <li key={product._id}>
                        {product.name} (Quantity: {product.quantity})
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{getSupplierEmail(supplierName)}</td> {/* Display supplier email */}
                <td>
                  <button 
                    onClick={() => handleRequestProduct(
                      products.map(p => p.name).join(', '), 
                      supplierName
                    )}
                    className="request-product-button"
                  >
                    Request Products
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No low stock products.</p>
      )}
    </div>
  );
};

export default SupplierComponent;