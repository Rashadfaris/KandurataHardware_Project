import express from 'express';
import {
    getSuppliers,
    getSupplierById,
    updateSupplierById,
    deleteSupplierById,
    createSupplier,
    searchSuppliers,
} from '../controllers/supplierController.js';

const router = express.Router();

// Define routes
router.get('/getSuppliers', getSuppliers);
router.get('/getSupplierById/:id', getSupplierById);
router.put('/updateSupplier/:id', updateSupplierById);
router.delete('/deleteSupplier/:id', deleteSupplierById);
router.post('/createSupplier', createSupplier);
router.get('/searchSuppliers', searchSuppliers);


export default router;