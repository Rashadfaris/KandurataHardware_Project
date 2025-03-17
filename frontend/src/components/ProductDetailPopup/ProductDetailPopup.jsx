import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductDetailPopup.css';
import { StoreContext } from '../../context/StoreContext';

const ProductDetailPopup = ({ product, onClose }) => {
    const { addToCart } = useContext(StoreContext);
    const [selectedSize, setSelectedSize] = useState(""); // State to hold the selected size
    const [updatedPrice, setUpdatedPrice] = useState(product.retailPrice); // State to hold the updated price
    const [addedQuantity, setAddedQuantity] = useState(0); // Track total quantity added to cart
    const navigate = useNavigate(); // Initialize navigate

    if (!product) return null;

    // Function to get size options based on category
    const getSizeOptions = (category) => {
        return category === "Paint" ? ["500ml", "1l", "4l", "10l", "20l"] : ["S", "M", "L", "XL", "XXL"];
    };

    const sizeOptions = getSizeOptions(product.category);

    // Update price based on selected size
    useEffect(() => {
        if (selectedSize) {
            let newPrice = product.retailPrice;

            // Determine price adjustments based on the selected size
            if (product.category === "Paint") {
                if (selectedSize === "4l") {
                    newPrice = product.retailPrice; // Base price for 4l
                } else if (["500ml", "1l"].includes(selectedSize)) {
                    newPrice *= 0.9; // Reduce price by 10%
                } else if (["10l", "20l"].includes(selectedSize)) {
                    newPrice *= 1.1; // Increase price by 10%
                }
            } else {
                // Assuming a similar logic for non-paint categories
                if (selectedSize === "L") {
                    newPrice = product.retailPrice; // Base price for L
                } else if (["S", "M"].includes(selectedSize)) {
                    newPrice *= 0.9; // Reduce price by 10%
                } else if (["XL", "XXL"].includes(selectedSize)) {
                    newPrice *= 1.1; // Increase price by 10%
                }
            }

            setUpdatedPrice(newPrice); // Update the price state
        } else {
            setUpdatedPrice(product.retailPrice); // Reset to base price if no size is selected
        }
    }, [selectedSize, product.retailPrice, product.category]);

    // Handle the Add to Cart button click
    const handleAddToCart = () => {
        const newAddedQuantity = addedQuantity + 1; // Increment quantity with each click
        setAddedQuantity(newAddedQuantity); // Update the added quantity
        addToCart(product._id, selectedSize, product.name, newAddedQuantity); // Pass the total accumulated quantity
    };

    return (
        <div className="product-detail-popup">
            <div className="product-detail-container">
                <span className="close-btn" onClick={onClose}>&times;</span>

                <div className="product-detail-left">
                    <img 
                        className="product-detail-image" 
                        src={`http://localhost:5001/images/${product.image}`} 
                        alt={product.name} 
                    />
                    <div className="product-info-small">Materials, Care and Origin</div>
                    <p className="product-detail-materials">
                        We work with monitoring programs to ensure compliance with our social, environmental and health and safety standards.
                    </p>
                </div>

                <div className="product-detail-right">
                    <div className="product-detail-header">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                    </div>

                    <div className="product-detail-pricing">
                        <p className="old-price">Retail Price: LKR {product.retailPrice}</p>
                        <p className="updated-price">Updated Price: LKR {updatedPrice.toFixed(2)}</p>
                        <p>Quantity in stock: {product.quantity}</p>
                        <p>Category: {product.category}</p>
                    </div>

                    {/* Size Selection */}
                    <div className="size-selection">
                        <h3>Select Size:</h3>
                        {sizeOptions.map((size) => (
                            <label key={size}>
                                <input
                                    type="radio"
                                    value={size}
                                    checked={selectedSize === size}
                                    onChange={() => setSelectedSize(size)}
                                />
                                {size}
                            </label>
                        ))}
                    </div>

                    {/* Out of Stock Message */}
                    {product.quantity === 0 ? (
                        <p className="out-of-stock-message">Out of Stock</p>
                    ) : (
                        <div className="button-group">
                            <button 
                                className="add-to-cart-btn" 
                                onClick={handleAddToCart} // Use the updated handleAddToCart function
                                disabled={!selectedSize} // Disable button if no size is selected
                            >
                                Add to Cart
                            </button>
                            <button 
                                className="view-cart-btn" 
                                onClick={() => navigate('/cart')} // Redirect to cart page
                            >
                                View Cart
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPopup;
