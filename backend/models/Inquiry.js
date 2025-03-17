// backend/models/Inquiry.js
import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
    required: false,
  },
});

const Inquiry = mongoose.models.Inquiry || mongoose.model("Inquiry", inquirySchema);

export default Inquiry;
