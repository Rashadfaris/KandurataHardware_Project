// API Configuration
// This file centralizes all API endpoint configurations

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

export const API_ENDPOINTS = {
    // Base URL
    BASE_URL: API_BASE_URL,
    
    // Product endpoints
    PRODUCTS: {
        LIST: `${API_BASE_URL}/api/product/list`,
        ADD: `${API_BASE_URL}/api/product/add`,
        REMOVE: `${API_BASE_URL}/api/product/remove`,
        UPDATE: `${API_BASE_URL}/api/product/update`,
        DECREASE_QUANTITY: `${API_BASE_URL}/api/product/decrease-quantity`,
    },
    
    // User endpoints
    USER: {
        LOGIN: `${API_BASE_URL}/api/user/login`,
        REGISTER: `${API_BASE_URL}/api/user/register`,
    },
    
    // Cart endpoints
    CART: {
        ADD: `${API_BASE_URL}/api/cart/add`,
        REMOVE: `${API_BASE_URL}/api/cart/remove`,
        GET: `${API_BASE_URL}/api/cart/get`,
    },
    
    // Order endpoints
    ORDERS: {
        PLACE: `${API_BASE_URL}/api/orders/place`,
        GET_USER_ORDERS: `${API_BASE_URL}/api/orders`,
    },
    
    // Card endpoints
    CARDS: {
        ADD: `${API_BASE_URL}/api/cards`,
        GET_BY_CODE: (code) => `${API_BASE_URL}/api/cards/code/${code}`,
        UPDATE: (cardId) => `${API_BASE_URL}/api/cards/${cardId}`,
        DELETE: (cardId) => `${API_BASE_URL}/api/cards/${cardId}`,
    },
    
    // Inquiry endpoints
    INQUIRIES: {
        GET_ALL: `${API_BASE_URL}/inquiries`,
        GET_BY_ID: (id) => `${API_BASE_URL}/inquiries/${id}`,
        CREATE: `${API_BASE_URL}/inquiries`,
        UPDATE: (id) => `${API_BASE_URL}/inquiries/${id}`,
        DELETE: (id) => `${API_BASE_URL}/inquiries/${id}`,
    },
    
    // Reply endpoints
    REPLIES: {
        GET_ALL: `${API_BASE_URL}/replies`,
    },
    
    // Employee endpoints
    EMPLOYEES: {
        LOGIN: `${API_BASE_URL}/api/employees/login`,
        REGISTER: `${API_BASE_URL}/api/employees/register`,
    },
    
    // Image endpoints
    IMAGES: {
        BASE: `${API_BASE_URL}/images`,
        GET: (imagePath) => `${API_BASE_URL}/images/${imagePath}`,
    },
};

export default API_ENDPOINTS;

