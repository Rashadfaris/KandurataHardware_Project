// backend/models/Order.js

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    date: { type: Number, required: true },
    status: { type: String, required: true, default: "Order Processing" },
    address: { type: String, required: true },
    province: { type: String, required: true },
    payment: { type: Boolean, required: true, default: false },
    paymentMethod: { type: String, required: true, default: "false" },
});

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel;
