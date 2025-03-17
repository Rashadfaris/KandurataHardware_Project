import express from 'express';
import { addCard, getCardByUniqueCode, updateCard, deleteCard } from '../controllers/cardController.js';

const router = express.Router();

// Route to add a card (Public)
router.post('/cards', addCard);

// Route to get a card by unique code (Public)
router.get('/cards/code/:uniqueCode', getCardByUniqueCode);

// Route to update a card (Public)
router.put('/cards/:cardId', updateCard);

// Route to delete a card (Public)
router.delete('/cards/:cardId', deleteCard);

export default router;
