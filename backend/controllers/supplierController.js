import SupplierModel from '../models/Supplier.js';
import { validationResult } from 'express-validator';

// Get all suppliers with optional sorting
export const getSuppliers = (req, res) => {
    const sortField = req.query.sortField || 'name';
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

    SupplierModel.find({})
        .sort({ [sortField]: sortOrder })
        .then(suppliers => res.json(suppliers))
        .catch(err => res.status(500).json(err));
};


// Get a single supplier by ID
export const getSupplierById = (req, res) => {
    const id = req.params.id;

    SupplierModel.findById(id)
        .then(supplier => {
            if (supplier) {
                res.json(supplier);
            } else {
                res.status(404).json({ message: 'Supplier not found' });
            }
        })
        .catch(err => res.status(500).json(err));
};


// Update a supplier by ID with duplicate check
export const updateSupplierById = async (req, res) => {
    const id = req.params.id;
    const { name, company_name, contact_number, email } = req.body;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const existingSupplier = await SupplierModel.findOne({
            _id: { $ne: id },
            name,
            company_name,
            contact_number,
            email
        });

        if (existingSupplier) {
            return res.status(400).json({ message: 'Supplier with the same details already exists' });
        }

        const updatedSupplier = await SupplierModel.findByIdAndUpdate(
            id,
            { name, company_name, contact_number, email },
            { new: true }
        );

        if (!updatedSupplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.json(updatedSupplier);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete a supplier by ID
export const deleteSupplierById = (req, res) => {
    const id = req.params.id;

    SupplierModel.findByIdAndDelete(id)
        .then(result => {
            if (result) {
                res.json(result);
            } else {
                res.status(404).json({ message: 'Supplier not found' });
            }
        })
        .catch(err => res.status(500).json(err));
};


// Create a new supplier with duplicate check

export const createSupplier = async (req, res) => {
    const { name, company_name, contact_number, email } = req.body;

    try {
        const existingSupplier = await SupplierModel.findOne({
            name,
            company_name,
            contact_number,
            email
        });

        if (existingSupplier) {
            return res.status(400).json({ message: 'Supplier with the same details already exists' });
        }

        const newSupplier = await SupplierModel.create({ name, company_name, contact_number, email });
        res.status(201).json(newSupplier);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Example searchSuppliers function implementation
export const searchSuppliers = (req, res) => {
    const query = req.query.q || '';  // Get search query from request

    SupplierModel.find({
        $or: [
            { name: { $regex: query, $options: 'i' } },
            { company_name: { $regex: query, $options: 'i' } },
            { product_name: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } }
        ]
    })
    .then(suppliers => res.json(suppliers))
    .catch(err => res.status(500).json(err));
};