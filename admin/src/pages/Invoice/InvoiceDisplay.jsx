import React, { useEffect, useState } from 'react';
import './InvoiceDisplay.css'; // Import the CSS file
import { Link } from 'react-router-dom'; // Import Link for navigation
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Optional plugin to add tables

const InvoiceDisplay = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedDate, setSelectedDate] = useState(''); // Date filter

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

  // Filter invoices based on search term and selected date
  const filteredInvoices = invoices.filter(invoice =>
    (invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedDate === '' || invoice.createdAt.startsWith(selectedDate)) // Filter by date
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

  // Function to generate PDF of filtered invoices
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Invoices Report', 14, 16);
    doc.text(`Date: ${selectedDate || 'All Dates'}`, 14, 22);

    // Define columns and rows for the table
    const columns = ['Invoice Number', 'Customer Name', 'Items', 'Discount', 'Total Amount', 'Date'];
    const rows = sortedInvoices.map(invoice => [
      invoice.invoiceNumber,
      invoice.customerName,
      invoice.items.map(item => `${item.name} (Qty: ${item.quantity}, Price: ${item.price})`).join(', '),
      invoice.discount,
      invoice.totalAmount,
      formatDate(invoice.createdAt),
    ]);

    // Generate table using jsPDF-autotable
    doc.autoTable({
      startY: 26,
      head: [columns],
      body: rows,
    });

    doc.save(`invoices_${selectedDate || 'all'}.pdf`); // Save PDF with a specific filename
  };

  return (
    <div className="list-container">
      <div className="CashierSidebar" style={{ fontSize: '18px' }}> {/* Increased font size */}
        <ul className="sidebar-list">
          <li className="sidebar-item"><Link to="/dashboard/cashier">Dashboard</Link></li>
          <li className="sidebar-item"><Link to="/dashboard/cashier">Sales </Link></li>
          <li className="sidebar-item"><Link to="/invoice-display">View Sales</Link></li>
        </ul>
      </div>
      <div className="list-content">
        <h2 style={{ textAlign: 'center', fontSize: '24px' }}>Invoice List</h2> {/* Increased font size */}
        <div style={{ textAlign: 'center', marginBottom: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <input
            type="text"
            placeholder="Search by Customer Name or Invoice Number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '10px', width: '350px', fontSize: '16px' }} // Increased font size
          />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ padding: '10px', fontSize: '16px' }} // Increased font size
          />
          <button onClick={handleSortChange} style={{ padding: '10px', fontSize: '16px' }}>
            Sort by Date ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
          </button>
          <button onClick={generatePDF} style={{ padding: '10px', fontSize: '16px' }}>
            Generate PDF
          </button>
        </div>
        <div className="list-table-container" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', fontSize: '18px' }}>
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
                <div>Date</div>
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
                  <div>{formatDate(invoice.createdAt)}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceDisplay;
