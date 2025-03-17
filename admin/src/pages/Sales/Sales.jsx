import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Sales.css'; // Import the CSS file for styling

const Sales = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/invoice'); // API endpoint for fetching invoices
        if (!response.ok) {
          throw new Error('Failed to fetch invoices');
        }
        const data = await response.json();
        setInvoices(data); // Assuming data is an array of invoices
      } catch (error) {
        console.error(error);
      }
    };

    fetchInvoices();
  }, []);

  // Filter invoices based on search term
  const filteredInvoices = invoices.filter(invoice => 
    invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort invoices by date
  const sortedInvoices = filteredInvoices.sort((a, b) => {
    const dateA = new Date(a.createdAt); // Sort by createdAt field
    const dateB = new Date(b.createdAt);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA; // Sort based on selected order
  });

  const handleSortChange = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc')); // Toggle sort order
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="list-container">
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
      <div className="list-content"> {/* Wrap the main content */}
        <h2 style={{ textAlign: 'center' }}>Invoice List</h2>
        <div style={{ textAlign: 'center', marginBottom: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Search by Customer Name or Invoice Number" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            style={{ padding: '8px', width: '300px' }} // Set width for the input
          />
          <button onClick={handleSortChange} style={{ padding: '8px' }}>
            Sort by Date ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
          </button>
        </div>
        <div className="list-table-container" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}> {/* Increase table size */}
          {sortedInvoices.length === 0 ? (
            <p>No invoices available.</p>
          ) : (
            <>
              <div className="list-table-format title">
                <div>Invoice Number</div>
                <div>Customer Name</div>
                <div>Items</div>
                <div>Discount</div>
                <div>Total Amount</div>
                <div>Date</div> {/* Add a Date column */}
              </div>
              {sortedInvoices.map((invoice) => (
                <div className="list-table-format" key={invoice._id}>
                  <div>{invoice.invoiceNumber}</div>
                  <div>{invoice.customerName}</div>
                  <div>
                    <ul>
                      {invoice.items.map((item, index) => (
                        <li key={index}>
                          {item.name} (Quantity: {item.quantity}, Price: {item.price})
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>{invoice.discount}</div>
                  <div>{invoice.totalAmount}</div>
                  <div>{formatDate(invoice.createdAt)}</div> {/* Display formatted date */}
                  <div>
                    {/* Empty action column for future use */}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sales;
