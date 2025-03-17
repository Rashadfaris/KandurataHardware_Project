import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import employeeModel from '../models/Logins.js'; // Ensure this is the correct path

const router = express.Router();

// Registration route
router.post('/employees/register', async (req, res) => { // Make sure this matches the frontend
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).send("All fields are required");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newEmployee = new employeeModel({ name, email, password: hashedPassword, role });
        await newEmployee.save();
        res.status(201).send("Employee registered successfully");
    } catch (error) {
        console.error("Registration error:", error);
        res.status(400).send(error.message);
    }
});

// Login route
router.post('/employees/login', async (req, res) => { // Ensure this matches the frontend
    const { email, password } = req.body;

    try {
        const employee = await employeeModel.findOne({ email });
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid password" });

        const token = jwt.sign({ id: employee._id, role: employee.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.json({ token, role: employee.role, user: employee });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: error.message });
    }
});

export default router;
