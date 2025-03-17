import mongoose from "mongoose";

// Define the schema for the reply
const replySchema = new mongoose.Schema({
  inquiryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "inquiry",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  replyMessage: {
    type: String,
    required: true,
  },
});

// Create or get the model for the schema
const replyModel = mongoose.models.reply || mongoose.model("reply", replySchema);

export default replyModel;
