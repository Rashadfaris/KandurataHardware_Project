import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import jsPDF auto-table plugin
import './Invoice.css';

const Invoice = () => {
  const { state } = useLocation();
  const initialItems = state?.invoiceItems || [];
  const [invoiceItems, setInvoiceItems] = useState(initialItems);
  const [customerName, setCustomerName] = useState('');
  const [discount, setDiscount] = useState(0);
  const [invoiceNumber] = useState(`INV-${Date.now()}`); // Generate a unique invoice number
  const navigate = useNavigate();

  // Handle quantity change
  const handleQuantityChange = (index, newQuantity) => {
    const item = invoiceItems[index];

    // Check if the new quantity is valid
    if (newQuantity < 1 || newQuantity > item.availableQuantity || isNaN(newQuantity)) {
      alert(`Quantity must be between 1 and ${item.availableQuantity}`);
      return;
    }

    // Update the quantity and total for the item
    const updatedItems = invoiceItems.map((item, i) => {
      if (i === index) {
        return { 
          ...item, 
          quantity: newQuantity, 
          total: item.price * newQuantity 
        };
      }
      return item;
    });
    setInvoiceItems(updatedItems);
  };

  // Handle product deletion
  const handleDelete = (index) => {
    const updatedItems = invoiceItems.filter((_, i) => i !== index);
    setInvoiceItems(updatedItems);
  };

  // Calculate total price
  const calculateTotal = () => {
    const subtotal = invoiceItems.reduce((acc, item) => acc + item.total, 0);
    return subtotal - discount; // Apply discount
  };

  // Navigate back to the product list
  const handleBackToList = () => {
    navigate('/dashboard/cashier', { state: { invoiceItems } });
  };

  // Function to generate PDF invoice
  const generatePDF = async () => {
    if (!customerName) {
      alert('Please enter the customer name before generating the invoice.');
      return;
    }

    for (const item of invoiceItems) {
      if (!item.quantity || item.quantity < 1 || item.quantity > item.availableQuantity) {
        alert(`Invalid quantity for item ${item.name}.`);
        return;
      }
    }

    const doc = new jsPDF();
    doc.text(`Invoice Number: ${invoiceNumber}`, 10, 10);
    doc.text(`Customer Name: ${customerName}`, 10, 20);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 30);

    const columns = ['Item', 'Quantity', 'Price', 'Subtotal'];
    const rows = invoiceItems.map(item => [
      item.name,
      item.quantity,
      item.price.toFixed(2),
      item.total.toFixed(2),
    ]);

    doc.autoTable(columns, rows, { startY: 40 });

    const subtotal = invoiceItems.reduce((acc, item) => acc + item.total, 0);
    const total = subtotal - discount;

    doc.text(`Discount: LKR ${discount.toFixed(2)}`, 10, doc.autoTable.previous.finalY + 10);
    doc.text(`Total: LKR ${total.toFixed(2)}`, 10, doc.autoTable.previous.finalY + 20);
    doc.save('invoice.pdf');

    try {
      const response = await fetch('http://localhost:5001/api/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceNumber,
          customerName,
          items: invoiceItems,
          discount,
          totalAmount: total
        }),
      });

      if (response.ok) {
        await updateProductQuantities();
        alert('Invoice created successfully!');
        setInvoiceItems([]);
        setCustomerName('');
        setDiscount(0);
      } else {
        alert('Failed to create invoice.');
      }
    } catch (error) {
      console.error('Error occurred while creating the invoice.', error);
    }
  };

  // Function to update product quantities
  const updateProductQuantities = async () => {
    try {
      await Promise.all(
        invoiceItems.map(async (item) => {
          const response = await fetch(`http://localhost:5001/api/product/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: item._id,
              quantity: item.availableQuantity - item.quantity,
            }),
          });
          if (!response.ok) {
            throw new Error(`Failed to update quantity for ${item.name}`);
          }
        })
      );
      alert('Product quantities updated successfully!');
    } catch (error) {
      console.error('Error updating product quantities:', error);
    }
  };

  // Update the discount handler to handle percentage input
  const handleDiscountChange = (value) => {
    let newDiscount = 0;
    const total = invoiceItems.reduce((acc, item) => acc + item.total, 0); // Calculate total without the discount

    if (value.includes('%')) {
      // If percentage is detected, calculate the discount based on total
      const percentage = parseFloat(value.replace('%', ''));
      newDiscount = (total * percentage) / 100;
    } else {
      // Otherwise, treat it as a fixed discount amount
      newDiscount = parseFloat(value);
    }

    // Ensure the discount does not exceed the total
    if (newDiscount > total) {
      alert('Discount cannot be more than the total amount.');
      setDiscount(total); // Set discount to total if it exceeds
    } else {
      setDiscount(newDiscount); // Update discount if valid
    }
  };

  return (
    <div className='Invoice'>
      <h2>Invoice</h2>

      {/* Customer Name Input */}
      <div className="customer-name">
        <label>Customer Name:</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Enter customer name"
        />
      </div>

      <div className="invoice-table">
        <div className="invoice-table-header">
          <b>Name</b>
          <b>Available</b>
          <b>Price</b>
          <b>Quantity</b>
          <b>Total Price</b>
          <b>Action</b>
        </div>
        {invoiceItems.length > 0 ? (
          invoiceItems.map((item, index) => (
            <div key={index} className="invoice-table-row">
              <p>{item.name}</p>
              <p>{item.availableQuantity}</p>
              <p>{item.price}</p>
              <input
                type="number"
                value={item.quantity}
                min="1"
                max={item.availableQuantity}
                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
              />
              <p>{item.total.toFixed(2)}</p>
              <button className="delete-button" onClick={() => handleDelete(index)}>
                X
              </button>
            </div>
          ))
        ) : (
          <p>No items added to the invoice</p>
        )}
      </div>

      {/* Discount Input */}
      <div className="discount-section">
        <label>Discount:</label>
        <input
          type="text"
          value={discount}
          onChange={(e) => handleDiscountChange(e.target.value)}
          placeholder="Enter discount amount or percentage (e.g., 10 or 10%)"
        />
      </div>

      {/* Total Price Display */}
      <div className="total-price">
        <h3>Total: LKR {calculateTotal().toFixed(2)}</h3>
      </div>

      {/* Generate Invoice Button */}
      <button onClick={generatePDF} className="generate-button">
        Generate Bill
      </button>

      {/* Back to List Button */}
      <button onClick={handleBackToList} className="back-button">
        Back to Product List
      </button>
    </div>
  );
};

export default Invoice;