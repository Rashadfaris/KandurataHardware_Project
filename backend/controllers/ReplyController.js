import Reply from '../models/Reply.js';


// CREATE a reply
export const createReply = async (req, res) => {
  try {
    const { inquiryId, username, replyMessage } = req.body;
    if (!username || !replyMessage) {
      return res.status(400).json({ success: false, message: 'Username and reply message are required' });
    }
    
    const newReply = new Reply({ inquiryId, username, replyMessage });
    const reply = await newReply.save();
    res.status(201).json({ success: true, message: 'Reply created', reply });
  } catch (error) {
    console.error('Error in POST /replies:', error);
    res.status(500).json({ success: false, message: 'Error creating reply' });
  }
};

// READ all replies
export const getAllReplies = async (req, res) => {
  try {
    const replies = await Reply.find();
    res.status(200).json({ success: true, replies });
  } catch (error) {
    console.error('Error in GET /replies:', error);
    res.status(500).json({ success: false, message: 'Error retrieving replies' });
  }
};

// READ a reply by ID
export const getReplyById = async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);
    if (!reply) {
      return res.status(404).json({ success: false, message: 'Reply not found' });
    }
    res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error('Error in GET /replies/:id:', error);
    res.status(500).json({ success: false, message: 'Error retrieving reply' });
  }
};

// UPDATE a reply by ID
export const updateReplyById = async (req, res) => {
  try {
    const { username, replyMessage } = req.body;
    const updatedReply = await Reply.findByIdAndUpdate(
      req.params.id, 
      { username, replyMessage }, 
      { new: true }
    );
    
    if (!updatedReply) {
      return res.status(404).json({ success: false, message: 'Reply not found' });
    }
    res.status(200).json({ success: true, message: 'Reply updated', updatedReply });
  } catch (error) {
    console.error('Error in PUT /replies/:id:', error);
    res.status(500).json({ success: false, message: 'Error updating reply' });
  }
};

// DELETE a reply by ID
export const deleteReplyById = async (req, res) => {
  try {
    const reply = await Reply.findByIdAndDelete(req.params.id);
    if (!reply) {
      return res.status(404).json({ success: false, message: 'Reply not found' });
    }
    res.status(200).json({ success: true, message: 'Reply deleted' });
  } catch (error) {
    console.error('Error in DELETE /replies/:id:', error);
    res.status(500).json({ success: false, message: 'Error deleting reply' });
  }
};
