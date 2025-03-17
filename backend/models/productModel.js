import mongoose from "mongoose";

// Define the schema for the product
const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  image: { type: String, required: false }, 
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  wholesalePrice: { type: Number, required: true },  // Wholesale price
  retailPrice: { type: Number, required: true },  // Retail price
  quantity: { type: Number, required: true },
  supplierName: { type: String, required: true },
  date: { type: Date, default: Date.now },
  featured: { type: Boolean, default: false } 
  
});


// Create or get the model for the schema
const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
