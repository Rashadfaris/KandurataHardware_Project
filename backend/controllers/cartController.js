import { response } from "express";
import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData || {}; // Use existing cartData or initialize an empty object

        // Create a unique key for the item based on its ID and size
        const itemKey = `${req.body.itemId}-${req.body.size}`;

        if (!cartData[itemKey]) {
            // If the item doesn't exist in the cart, add it
            cartData[itemKey] = {
                name: req.body.name, // Add name from request
                size: req.body.size, // Add size from request
                quantity: 1, // Initialize quantity
            };
        } else {
            // If it already exists, increase the quantity
            cartData[itemKey].quantity += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added to Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Remove items from the cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData || {}; // Use existing cartData or initialize an empty object
        const itemKey = `${req.body.itemId}-${req.body.size}`; // Create the unique key

        if (cartData[itemKey] && cartData[itemKey].quantity > 0) {
            // If the item exists and the quantity is greater than 0
            cartData[itemKey].quantity -= 1;

            // Remove the item from the cart if the quantity is 0
            if (cartData[itemKey].quantity === 0) {
                delete cartData[itemKey];
            }

            await userModel.findByIdAndUpdate(req.body.userId, { cartData });
            res.json({ success: true, message: "Removed From Cart" });
        } else {
            res.json({ success: false, message: "Item not found in cart" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Fetch user cart data
// Fetch user cart data
const getCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Initialize cartData as an empty array if it doesn't exist
        const cartData = userData.cartData || [];
        
        res.json({ success: true, cartData });
    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}


export { addToCart, removeFromCart, getCart };
