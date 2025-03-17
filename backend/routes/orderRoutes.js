import express from 'express';
import mongoose from 'mongoose';
import authMiddleware from '../middleware/auth.js';
import orderModel from '../models/Order.js';  
import { placeOrder } from '../controllers/orderController.js';
const router = express.Router();



router.post('/orders/place',authMiddleware, placeOrder);
// GET all orders
router.get('/', async (req, res) => {
    console.log("Fetching orders...");
    try {
        const orders = await orderModel.find({});
        console.log("Orders retrieved:", orders);
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).json({ message: "Error retrieving orders", error });
    }
});


// Getting the orders for a particular user
router.get('/orders', authMiddleware, async (req, res) => {
    const { userId } = req.body; // Extracting userId from req.body (set by the middleware)

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    try {
        const orders = await orderModel.find({ userId }); // Querying using the userId
        console.log("Orders retrieved for user:", orders);
        res.status(200).json({ orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Error fetching orders", error });
    }
});



// DELETE order by _id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid order ID" });
    }

    try {
        const deletedOrder = await orderModel.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        console.log("Order deleted:", deletedOrder);
        res.status(200).json({ message: "Order deleted successfully", deletedOrder });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "Error deleting order", error });
    }
});


export default router;