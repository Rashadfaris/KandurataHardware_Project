// userRoute.js
import express from "express";
import { loginUser, registerUser, getAllUsers, deleteUser, getUserCount } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/all", getAllUsers);
userRouter.delete("/:id", deleteUser); 
userRouter.get("/count", getUserCount); // Route for user count

export default userRouter;
