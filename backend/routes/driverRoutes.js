import express from 'express';
import mongoose from 'mongoose';
import Driver from '../models/Driver.js';

const driverRouter = express.Router();

// Create a new driver
driverRouter.post('/', async (req, res) => {
  try {
    const driver = new Driver(req.body);
    await driver.save();
    res.status(201).send(driver);
  } catch (err) {
    res.status(400).send({ error: 'Error creating driver', details: err.message });
  }
});

// Get all drivers
driverRouter.get('/', async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.send(drivers);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching drivers', details: err.message });
  }
});

// Get a specific driver by ID
driverRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Invalid driver ID format' });
    }

    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).send({ message: 'Driver not found' });
    }

    res.send(driver);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching driver', details: err.message });
  }
});

// Update a driver
driverRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Invalid driver ID format' });
    }

    const driver = await Driver.findByIdAndUpdate(id, req.body, { new: true });
    if (!driver) {
      return res.status(404).send({ message: 'Driver not found' });
    }

    res.send(driver);
  } catch (err) {
    res.status(500).send({ message: 'Error updating driver', details: err.message });
  }
});

// Delete a driver
driverRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Invalid driver ID format' });
    }

    const driver = await Driver.findByIdAndDelete(id);
    if (!driver) {
      return res.status(404).send({ message: 'Driver not found' });
    }

    res.sendStatus(204); // No content to send back
  } catch (err) {
    res.status(500).send({ message: 'Error deleting driver', details: err.message });
  }
});

export default driverRouter;
