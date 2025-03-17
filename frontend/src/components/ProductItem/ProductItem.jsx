import React from 'react';
import './ProductItem.css';
import { assets } from '../../assets/assets';

const ProductItem = ({ id, name, description, price, image, onClick }) => {
    return (
        <div className='product-item' onClick={() => onClick(id)}>
            <div className="product-item-image-container">
                <img className='product-item-image' src={image} alt={name} />
            </div>
            <div className="product-item-info">
                <div className="product-item-name-rating">
                    <p>{name}</p>
                </div>
                <p className="product-item-desc">
                    {description}
                </p>
                <p className="product-item-price">LKR {price}</p>
            </div>
        </div>
    );
}

export default ProductItem;
