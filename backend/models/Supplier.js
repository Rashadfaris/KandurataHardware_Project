import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema({
    name: String,
    company_name: String,
    contact_number: Number,
    email: String
});

const SupplierModel = mongoose.model("suppliers", SupplierSchema);
export default SupplierModel;