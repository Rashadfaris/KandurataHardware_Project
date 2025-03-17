// routes/invoiceRoute.js
import express from 'express';
import Invoice from '../models/invoiceModel.js';
import Product from '../models/productModel.js'; // Ensure you have the Product model

const router = express.Router();

// Create a new invoice
router.post('/', async (req, res) => {
  const { invoiceNumber, customerName, items, discount, totalAmount } = req.body;

  try {
    // Save the invoice to the database
    const invoice = new Invoice({ invoiceNumber, customerName, items, discount, totalAmount });
    await invoice.save();

    // Decrement product quantities
    for (const item of items) {
      await Product.findOneAndUpdate(
        { name: item.name },
        { $inc: { availableQuantity: -item.quantity } }
      );
    }

    res.status(201).json({ message: 'Invoice created successfully', invoice });
  } catch (error) {
    res.status(500).json({ message: 'Error creating invoice', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find(); // Fetch all invoices
    res.json(invoices); // Send back as JSON
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch invoices', error });
  }
});

export default router;
