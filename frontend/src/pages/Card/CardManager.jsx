import axios from 'axios';

// Exported fetchCardByCode function
export const fetchCardByCode = async (uniqueCode) => {
    try {
        const response = await axios.get(`http://localhost:5001/api/cards/code/${uniqueCode}`);
        console.log('Response data:', response.data);
        return response.data.cards; // Return the cards array
    } catch (error) {
        console.error('Error fetching card:', error);
        throw new Error('Error fetching card. Please check your code.');
    }
};

// Rest of your Card component
import React, { useState } from 'react';
import './cardManager.css'; // Relative path to the CSS file
import Modal from './Modal';

const Card = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cardType, setCardType] = useState('Debit');
    const [uniqueCode, setUniqueCode] = useState('');
    const [cards, setCards] = useState([]);
    const [message, setMessage] = useState('');
    const [editCardId, setEditCardId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addCard = async (e) => {
        e.preventDefault();
        try {
            const payload = { cardNumber, cardHolderName, expiryDate, cardType, uniqueCode };
            console.log('Adding Card:', payload);
            const response = await axios.post('http://localhost:5001/api/cards', payload);
            console.log('Card added response:', response.data);
            alert('Card added successfully!');
            resetForm();
        } catch (error) {
            console.error('Error adding card:', error);
            alert('Error adding card. Please try again.');
        }
    };

    const resetForm = () => {
        setCardNumber('');
        setCardHolderName('');
        setExpiryDate('');
        setCardType('Debit');
        setUniqueCode('');
    };

    const handleEditCard = (card) => {
        setCardNumber(card.cardNumber);
        setCardHolderName(card.cardHolderName);
        setExpiryDate(card.expiryDate);
        setCardType(card.cardType);
        setUniqueCode(card.uniqueCode);
        setEditCardId(card._id);
        setIsModalOpen(true);
    };

    const handleDeleteCard = async (cardId) => {
        try {
            await axios.delete(`http://localhost:5001/api/cards/${cardId}`);
            setCards(cards.filter(card => card._id !== cardId));
            alert('Card deleted successfully!');
        } catch (error) {
            console.error('Error deleting card:', error);
            alert('Error deleting card. Please try again.');
        }
    };

    const updateCard = async (updatedCardData) => {
        try {
            const response = await axios.put(`http://localhost:5001/api/cards/${editCardId}`, updatedCardData);
            console.log('Card updated response:', response.data);
            alert('Card updated successfully!');
            resetForm();
            setEditCardId(null);
            fetchCardByCode(uniqueCode).then(setCards);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating card:', error);
            alert('Error updating card. Please try again.');
        }
    };

    return (
        <div>
            <h1>{editCardId ? 'Edit Your Card' : 'Add Your Card'}</h1>
            <form onSubmit={addCard}>
                <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
                <input type="text" placeholder="Card Holder Name" value={cardHolderName} onChange={(e) => setCardHolderName(e.target.value)} required />
                <input type="month" placeholder="Expiry Date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
                <select value={cardType} onChange={(e) => setCardType(e.target.value)} required>
                    <option value="Debit">Debit Card</option>
                    <option value="Credit">Credit Card</option>
                </select>
                <input type="text" placeholder="Unique Code" value={uniqueCode} onChange={(e) => setUniqueCode(e.target.value)} required />
                <button type="submit">Add Card</button>
            </form>

            <h1>Retrieve Your Card by Unique Code</h1>
            <form onSubmit={(e) => { e.preventDefault(); fetchCardByCode(uniqueCode).then(setCards); }}>
                <input type="text" placeholder="Unique Code" value={uniqueCode} onChange={(e) => setUniqueCode(e.target.value)} required />
                <button type="submit">Retrieve Card</button>
            </form>

            {message && <p>{message}</p>}
            {Array.isArray(cards) && cards.length === 0 && <p>No cards found for this unique code.</p>}
            {Array.isArray(cards) && cards.length > 0 && (
                <div>
                    <h2>Your Card Details</h2>
                    {cards.map((c) => (
                        <div key={c._id}>
                            <p>Card Number: {c.cardNumber}</p>
                            <p>Card Holder Name: {c.cardHolderName}</p>
                            <p>Expiry Date: {c.expiryDate}</p>
                            <p>Card Type: {c.cardType}</p>
                            <button onClick={() => handleEditCard(c)}>Edit</button>
                            <button onClick={() => handleDeleteCard(c._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={updateCard} cardData={{ cardNumber, cardHolderName, expiryDate, cardType }} />
        </div>
    );
};

export default Card;
