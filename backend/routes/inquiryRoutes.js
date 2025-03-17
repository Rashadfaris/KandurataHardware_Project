
// backend/routes/inquiryRoutes.js
import express from 'express';
import {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryById,
  deleteInquiryById,
} from '../controllers/inquiryController.js'; // Ensure correct path

const router = express.Router();

// Define routes
router.post('/', createInquiry);  // Ensure this line is below the import statement
router.get('/', getAllInquiries);
router.get('/:id', getInquiryById);
router.put('/:id', updateInquiryById);
router.delete('/:id', deleteInquiryById);

export default router;
