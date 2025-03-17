import mongoose from 'mongoose';


const cardSchema = new mongoose.Schema({
    cardNumber: { type: String, required: true },
    cardHolderName: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cardType: { type: String, required: true },
    uniqueCode: { type: String, required: true, unique: true } // Add unique code field
});


export default mongoose.model('Card', cardSchema);
