import Employee from '../models/Employee.js';

export const addEmployee = async (req, res) => {
    const { firstName, lastName, nic, contactNumber, email, dob, employeeType } = req.body;

    try {
        const newEmployee = new Employee({ firstName, lastName, nic, contactNumber, email, dob, employeeType });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await Employee.findById(id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
