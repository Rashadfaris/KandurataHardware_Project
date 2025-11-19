import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';
import driverRoutes from './routes/driverRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import repliesRoutes from './routes/replies.js';
import supplierRoutes from './routes/supplierRoutes.js';
import invoiceRouter from './routes/invoiceRoutes.js';
import leaveRoutes from './routes/leaveRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';


//the below is used for the role base logins
import employeeRouter from './routes/employee.js'

import cardRoutes from './routes/cardRoutes.js';


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
connectDB();

//API endpoint
// Product routes - support both /api/product and /api/products
app.use("/api/product", productRouter);
app.use("/api/products", productRouter); // Alias for plural form
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use('/drivers', driverRoutes);
app.use('/api', orderRoutes);
app.use('/api/cart', cartRouter);
app.use('/api/invoice', invoiceRouter);
app.use('/inquiries', inquiryRoutes);
app.use('/replies', repliesRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api', employeeRoutes);
app.use('/api', cardRoutes);


// Role based login 
app.use('/api', employeeRouter);

// Simple route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


