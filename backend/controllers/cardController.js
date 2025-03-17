import cardModel from "../models/card.js";

// Add a new card (allowing duplicate unique codes)
const addCard = async (req, res) => {
    try {
        const { cardNumber, cardHolderName, expiryDate, cardType, uniqueCode } = req.body;

        const newCard = new cardModel({
            cardNumber,
            cardHolderName,
            expiryDate,
            cardType,
            uniqueCode // Save the user-defined unique code
        });

        const savedCard = await newCard.save();
        res.json({ success: true, card: savedCard }); // Send back the saved card data
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding card" });
    }
};

// Get cards by unique code
const getCardByUniqueCode = async (req, res) => {
    const { uniqueCode } = req.params; // Get unique code from request params

    try {
        const cards = await cardModel.find({ uniqueCode }); // Fetch all cards by unique code

        if (cards.length === 0) {
            return res.status(404).json({ success: false, message: "No cards found" });
        }

        res.json({ success: true, cards }); // Return all matching cards
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching cards" });
    }
};

// Update a card's details
const updateCard = async (req, res) => {
    const { cardId } = req.params; // Get the card ID from request params
    const { cardHolderName, expiryDate, cardType } = req.body;

    try {
        const card = await cardModel.findByIdAndUpdate(
            cardId,
            { cardHolderName, expiryDate, cardType },
            { new: true } // Return the updated card
        );

        if (!card) {
            return res.status(404).json({ success: false, message: "Card not found" });
        }

        res.json({ success: true, card });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating card" });
    }
};

// Delete a card
const deleteCard = async (req, res) => {
    const { cardId } = req.params; // Get the card ID from request params

    try {
        const card = await cardModel.findByIdAndDelete(cardId);

        if (!card) {
            return res.status(404).json({ success: false, message: "Card not found" });
        }

        res.json({ success: true, message: "Card deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error deleting card" });
    }
};

export { addCard, getCardByUniqueCode, updateCard, deleteCard };
