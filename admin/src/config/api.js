// API Configuration for Admin Panel
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

