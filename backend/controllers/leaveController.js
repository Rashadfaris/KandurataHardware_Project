import Leave from '../models/Leave.js';


// Create a new leave request
const createLeaveRequest = async (req, res) => {
  try {
    const leaveRequest = new Leave({
      ...req.body,
      role: req.body.role.toLowerCase(), // Save role in lowercase for consistency
    });
    await leaveRequest.save();
    res.status(201).json(leaveRequest);
  } catch (error) {
    console.error('Error saving leave request:', error);
    res.status(500).json({ message: 'Error saving leave request' });
  }
};

// Get leave requests based on role
const getLeaveRequests = async (req, res) => {
  try {
    const { role } = req.query;
    console.log('Role from query:', role); // Should log the role received from the query

    const query = role && role.toLowerCase() !== 'hr-manager'
      ? { role: new RegExp(`^${role}$`, 'i') } // Match case-insensitively
      : {};

    console.log('Query object:', query); // Log the query object
    const leaves = await Leave.find(query);
    console.log('Leaves fetched:', leaves);
    res.json(leaves);
  } catch (error) {
    console.error('Error fetching leaves:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update leave status by ID or edit the leave request
const updateLeave = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedLeave = await Leave.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedLeave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    res.status(200).json(updatedLeave);
  } catch (error) {
    console.error('Error updating leave request:', error);
    res.status(500).json({ message: 'Error updating leave request' });
  }
};

// Delete a leave request by ID
const deleteLeave = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLeave = await Leave.findByIdAndDelete(id);

    if (!deletedLeave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    res.status(200).json({ message: 'Leave request deleted successfully' });
  } catch (error) {
    console.error('Error deleting leave request:', error);
    res.status(500).json({ message: 'Error deleting leave request' });
  }
};

// Export functions
export { createLeaveRequest, getLeaveRequests, updateLeave, deleteLeave };