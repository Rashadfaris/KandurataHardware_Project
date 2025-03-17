// models/Employee.js
import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nic: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: Date, required: true },
    employeeType: { type: String, required: true },
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
