import React, { createContext, useState, useContext } from 'react';

// Create the Cart Context
const CartContext = createContext('');

// Custom hook to use the Cart context
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Add item to the cart
    const addToCart = (item) => {
        // Check if item already exists in the cart
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            // Update quantity if the item exists
            setCart(cart.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
                    : cartItem
            ));
        } else {
            // Add a new item with a default quantity of 1
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    // Remove item from the cart
    const removeFromCart = (itemId) => {
        setCart(cart.filter(cartItem => cartItem.id !== itemId));
    };

    // Clear the entire cart
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
