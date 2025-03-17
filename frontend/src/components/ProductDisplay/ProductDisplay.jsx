import React, { useState } from 'react';
import './ProductDisplay.css';
import ProductItem from '../ProductItem/ProductItem';
import ProductDetailPopup from '../ProductDetailPopup/ProductDetailPopup';

const ProductDisplay = ({ category, products, scrollToProduct }) => { // Accept scrollToProduct as prop
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductClick = (id) => {
        const product = products.find(p => p._id === id);
        setSelectedProduct(product);
    };

    const handleClosePopup = () => {
        setSelectedProduct(null);
    };

    return (
        <div className='product-display' id='product-display'>
            <h2>{category} Products</h2>
            <div className="product-display-list">
                {products.length > 0 ? (
                    products.map((item) => (
                        <div key={item._id} id={item._id}>
                            <ProductItem
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.retailPrice}
                                image={`http://localhost:5001/images/${item.image}`} // Ensure the image path is correct
                                onClick={() => {
                                    handleProductClick(item._id);
                                    scrollToProduct(item._id); // Scroll to the clicked product
                                }}
                            />
                        </div>
                    ))
                ) : (
                    <p>No products available in this category.</p>
                )}
            </div>
            {selectedProduct && (
                <ProductDetailPopup 
                    product={selectedProduct}
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
};

export default ProductDisplay;
