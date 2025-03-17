import productModel from "../models/productModel.js";
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

// Add product item
const addProduct = async (req, res) => {
    let image_filename = req.file ? req.file.filename : ''; 

    const { name, description,category, wholesalePrice, retailPrice, quantity, supplierName } = req.body;
    
    const productId = `PROD-${uuidv4()}`;
    
    const product = new productModel({
        productId,
        image: image_filename, 
        name,
        description,
        category,
        wholesalePrice,
        retailPrice,
        quantity: parseInt(quantity, 10),
        supplierName,
        date: new Date(),
    });

    try {
        await product.save();
        res.json({ success: true, message: "PRODUCT added" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error adding Product item" });
    }
};

// List all products
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, data: products });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error retrieving products" });
    }
};

// Remove product
const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.id);
        if (product) {
            if (product.image) {
                fs.unlink(`uploads/${product.image}`, (err) => {
                    if (err) {
                        console.error("Error deleting image file:", err);
                    }
                });
            }
            await productModel.findByIdAndDelete(req.body.id);
            res.json({ success: true, message: "Product removed" });
        } else {
            res.json({ success: false, message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error removing product" });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
      const { id, name, category, wholesalePrice, retailPrice, quantity } = req.body;
      const updatedProduct = await productModel.findByIdAndUpdate(id, { 
        name, 
        category, 
        wholesalePrice, 
        retailPrice, 
        quantity
      }, { new: true });
  
      if (!updatedProduct) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
  
      res.status(200).json({ success: true, data: updatedProduct, message: "Product updated successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Decrease product quantity
const decreaseProductQuantity = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
      const product = await productModel.findById(productId); // Use correct model name here
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
  
      if (product.quantity < quantity) {
        return res.status(400).json({ success: false, message: "Insufficient stock" });
      }
  
      product.quantity -= quantity;
      await product.save();
  
      return res.json({ success: true, message: "Product quantity updated", product });
    } catch (error) {
      console.error("Error decreasing product quantity:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Export functions
export { addProduct, listProduct, removeProduct, updateProduct, decreaseProductQuantity };
