import express from "express";
import { createReply, getAllReplies, getReplyById, updateReplyById, deleteReplyById } from "../controllers/ReplyController.js";

const replyRouter = express.Router();

// CREATE a reply
replyRouter.post("/", createReply);

// READ all replies
replyRouter.get("/", getAllReplies);

// READ a reply by ID
replyRouter.get("/:id", getReplyById);

// UPDATE a reply by ID
replyRouter.put("/:id", updateReplyById);

// DELETE a reply by ID
replyRouter.delete("/:id", deleteReplyById);

export default replyRouter;
