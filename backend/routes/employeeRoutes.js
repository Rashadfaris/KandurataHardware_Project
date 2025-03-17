// routes/employeeRoutes.js
import express from 'express';
import { addEmployee, getEmployees, updateEmployee, deleteEmployee,getEmployee } from '../controllers/employeeController.js';

const router = express.Router();

// Adjust these paths if needed
router.post('/employees', addEmployee);
router.get('/employees', getEmployees);
router.get('/employees/:id', getEmployee); // Add this line to fetch a single employee
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

export default router;
