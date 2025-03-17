import mongoose from "mongoose";

export const connectDB= async () =>{
    await mongoose.connect('mongodb+srv://shilma:powerPro123@cluster0.4mpkn.mongodb.net/kandurata_hardware').then(() => console.log("DB Connected"));
}