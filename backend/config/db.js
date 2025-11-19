import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://shilma:powerPro123@cluster0.4mpkn.mongodb.net/kandurata_hardware';
        await mongoose.connect(mongoURI);
        console.log("DB Connected successfully");
    } catch (error) {
        console.error("Database connection error:", error.message);
        throw error; // Re-throw to allow caller to handle
    }
};