import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        required: true, 
        enum: ['admin', 'logistics', 'hr', 'cashier', 'employee'] // Define roles
    }
}, { minimize: false });

// Fix: Use employeeSchema instead of employeeLoginSchema
const employeeModel = mongoose.models.employee || mongoose.model("employeeLogins", employeeSchema);

export default employeeModel;
