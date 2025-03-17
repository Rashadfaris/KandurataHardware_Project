// backend/controllers/inquiryController.js
import Inquiry from '../models/Inquiry.js';

// Create an inquiry
export const createInquiry = async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    await inquiry.save();
    res.status(201).json({ inquiry });
  } catch (error) {
    res.status(400).json({ message: "Error creating inquiry", error });
  }
};

// Get all inquiries
export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.status(200).json({ inquiries });
  } catch (error) {
    res.status(500).json({ message: "Error fetching inquiries", error });
  }
};

// Get an inquiry by ID
export const getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
    res.status(200).json({ inquiry });
  } catch (error) {
    res.status(500).json({ message: "Error fetching inquiry", error });
  }
};

// Update an inquiry by ID
export const updateInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
    res.status(200).json({ inquiry });
  } catch (error) {
    res.status(400).json({ message: "Error updating inquiry", error });
  }
};

// Delete an inquiry by ID
export const deleteInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
    res.status(200).json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting inquiry", error });
  }
};
