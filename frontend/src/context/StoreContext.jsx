import { createContext, useEffect, useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../config/api.js";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("");
    
    const url = API_ENDPOINTS.BASE_URL;


    
    // Add item to cart
    const addToCart = async (itemId, size, productName) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (!updatedCart[itemId]) {
                updatedCart[itemId] = { name: productName, size, quantity: 1 };
            } else {
                updatedCart[itemId].quantity += 1;
            }
            return updatedCart;
        });

        if (token) {
            try {
                await axios.post(
                    API_ENDPOINTS.CART.ADD,
                    { itemId, size, name: productName },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (error) {
                console.error("Error adding item to cart:", error);
            }
        }
    };

    const clearCart = () => {
        // Logic to clear the cart, e.g., resetting state or local storage
        localStorage.removeItem("cartItems"); // Example for clearing local storage
    };
    
    // Remove item from cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId]) {
                if (updatedCart[itemId].quantity > 1) {
                    updatedCart[itemId].quantity -= 1;
                } else {
                    delete updatedCart[itemId];
                }
            }
            return updatedCart;
        });

        if (token) {
            try {
                await axios.post(API_ENDPOINTS.CART.REMOVE, { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error removing item from cart:", error);
            }
        }
    };

    // Fetch the product list from the API
    const fetchProductList = async () => {
        try {
            const response = await axios.get(API_ENDPOINTS.PRODUCTS.LIST);
            setFeaturedProducts(response.data.data); // Assuming your API returns products in data.data
        } catch (error) {
            console.error("Error fetching product list:", error);
        }
    };

    // Load cart data for the user and extract user ID from the response
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(API_ENDPOINTS.CART.GET, {}, { headers: { Authorization: `Bearer ${token}` } });
            setCartItems(response.data.cartData);
            const userIdFromResponse = response.data.userId; // Assuming your API response includes the userId
            setUserId(userIdFromResponse); // Set user ID from the response
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };
    

    // Get the total cart amount
    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((total, itemId) => {
            const { quantity } = cartItems[itemId];
            const product = featuredProducts.find((product) => product._id === itemId);

            if (product) {
                return total + product.retailPrice * quantity;
            }
            return total;
        }, 0);
    };


    //getting orders placed by the particular user who is logged in 
  
    const fetchUserOrders = async () => {
        if (!token) return; 
    
        try {
            console.log("Fetching user orders...");
            const response = await axios.get(API_ENDPOINTS.ORDERS.GET_USER_ORDERS, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            console.log("Response:", response); // Log the full response for debugging
            console.log("Orders fetched:", response.data.orders);
            return response.data.orders;
        } catch (error) {
            console.error("Error fetching user orders:", error.response ? error.response.data : error.message);
            return []; // Return an empty array on error
        }
    };
    
    


    // Load the token, userId, and cart data when the component mounts
    useEffect(() => {
        async function loadData() {
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
                await loadCartData(savedToken); // Load cart data for the user
            }

            await fetchProductList(); // Fetch the product list
        }
        loadData();
    }, []);

    // Log the cart items whenever they change (for debugging)
    useEffect(() => {
        console.log("Updated cart items:", cartItems);
    }, [cartItems]);

    // Log the current total amount whenever the cart items change
    useEffect(() => {
        const total = getTotalCartAmount();
        console.log("Current total amount:", total);
    }, [cartItems]);

    const contextValue = {
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        fetchUserOrders,
        url,
        token,
        setToken,
        userId, // Make sure userId is correctly passed in the context
        featuredProducts,
        clearCart,
        getTotalCartAmount,
    };

    
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
