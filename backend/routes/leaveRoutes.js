import express from 'express';
import { createLeaveRequest, getLeaveRequests,updateLeave,deleteLeave } from '../controllers/leaveController.js';

const router = express.Router();

router.post('/', createLeaveRequest);
router.get('/', getLeaveRequests);
router.put('/:id', updateLeave);
router.delete('/:id', deleteLeave);

export default router;
