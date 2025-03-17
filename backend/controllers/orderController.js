//order controller

import orderModel from "../models/Order.js";
import userModel from "../models/userModel.js";

//placing orders on cash on delivery method 
const placeOrder =async (req,res)=>{
  try {
    console.log("Placing order:", req.body); // Log the incoming order data
  
    const {userId,items,amount,address,province,paymentMethod} =req.body;

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
      }
    const orderData = {
        userId,
        items,
        address,
        province,
        amount,
        paymentMethod,
        payment: paymentMethod === "Card" ? true : false, // Payment will be marked true for card
        date: Date.now(),
      };

    const newOrder =new orderModel(orderData)
    await newOrder.save()

    await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

    res.json({ success: true, orderId: newOrder._id, message: "Order placed successfully" });

  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}


//placing orders using strip method 
const placeOrderStripe =async (req,res)=>{
    
}


//placing orders using strip method 
const allOrders =async (req,res)=>{
    
}

//user data for frontend 
const userOrders =async (req,res)=>{
    
}

//update order status from logistic manager
const updateStatus =async (req,res)=>{
    
}

export{placeOrder,placeOrderStripe,allOrders,userOrders,updateStatus}