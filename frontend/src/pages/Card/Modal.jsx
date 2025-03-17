import React from 'react';
import './Modal.css'; // Ensure you have the CSS for styling the modal

const Modal = ({ isOpen, onClose, onSave, cardData, setCardNumber, setCardHolderName, setExpiryDate, setCardType }) => {
    if (!isOpen) return null;

    const handleSave = () => {
        onSave({ // Pass updated values to onSave
            cardNumber: cardData.cardNumber,
            cardHolderName: cardData.cardHolderName,
            expiryDate: cardData.expiryDate,
            cardType: cardData.cardType,
        });
        onClose(); // Close the modal after saving
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Card</h2>
                <input
                    type="text"
                    placeholder="Card Number"
                    value={cardData.cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)} // Update card number using state setter
                    required
                />
                <input
                    type="text"
                    placeholder="Card Holder Name"
                    value={cardData.cardHolderName}
                    onChange={(e) => setCardHolderName(e.target.value)} // Update holder name using state setter
                    required
                />
                <input
                    type="month"
                    placeholder="Expiry Date"
                    value={cardData.expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)} // Update expiry date using state setter
                    required
                />
                <select
                    value={cardData.cardType}
                    onChange={(e) => setCardType(e.target.value)} // Update card type using state setter
                    required
                >
                    <option value="Debit">Debit Card</option>
                    <option value="Credit">Credit Card</option>
                </select>
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default Modal;
