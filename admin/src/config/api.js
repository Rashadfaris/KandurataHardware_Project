// API Configuration for Admin Panel
// This file centralizes all API endpoint configurations

const FALLBACK_PROD_URL = 'https://distinguished-enchantment-production.up.railway.app';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || FALLBACK_PROD_URL;

export const buildUrl = (path = '') => `${API_BASE_URL}${path}`;

export const API_ENDPOINTS = {
    BASE_URL: API_BASE_URL,

    PRODUCTS: {
        LIST: buildUrl('/api/product/list'),
        ADD: buildUrl('/api/product/add'),
        REMOVE: buildUrl('/api/product/remove'),
        UPDATE: buildUrl('/api/product/update'),
        DECREASE_QUANTITY: buildUrl('/api/product/decrease-quantity'),
    },

    EMPLOYEES: {
        LOGIN: buildUrl('/api/employees/login'),
        REGISTER: buildUrl('/api/employees/register'),
        BASE: buildUrl('/api/employees'),
        CHECK_NIC: (nic) => buildUrl(`/api/employees/check-nic/${nic}`),
        BY_ID: (id) => buildUrl(`/api/employees/${id}`),
    },

    LEAVES: {
        BASE: buildUrl('/api/leaves'),
        BY_ID: (id) => buildUrl(`/api/leaves/${id}`),
        BY_ROLE: (role) => buildUrl(`/api/leaves?role=${role}`),
    },

    INQUIRIES: {
        BASE: buildUrl('/inquiries'),
        BY_ID: (id) => buildUrl(`/inquiries/${id}`),
    },

    REPLIES: {
        BASE: buildUrl('/replies'),
    },

    DRIVERS: {
        BASE: buildUrl('/drivers'),
        BY_ID: (id) => buildUrl(`/drivers/${id}`),
    },

    SUPPLIERS: {
        LIST: buildUrl('/api/suppliers/getSuppliers'),
        CREATE: buildUrl('/api/suppliers/createSupplier'),
        DELETE: (id) => buildUrl(`/api/suppliers/deleteSupplier/${id}`),
        UPDATE: (id) => buildUrl(`/api/suppliers/updateSupplier/${id}`),
        BY_ID: (id) => buildUrl(`/api/suppliers/getSupplierById/${id}`),
    },

    USERS: {
        COUNT: buildUrl('/api/user/count'),
        LIST: buildUrl('/api/user/all'),
        BY_ID: (id) => buildUrl(`/api/user/${id}`),
    },

    ORDERS: {
        BASE: buildUrl('/api/orders'),
        ASSIGN: buildUrl('/api/orders/assign'),
    },

    INVOICES: {
        BASE: buildUrl('/api/invoice'),
    },

    IMAGES: {
        BASE: buildUrl('/images'),
        GET: (imagePath) => buildUrl(`/images/${imagePath}`),
    },
};

export default API_ENDPOINTS;

