// This code defines a Redux toolkit implementation for managing a shopping cart within a web application.

// Importing the necessary functions from the Redux toolkit library.
import { createSlice } from "@reduxjs/toolkit";

// Function to fetch cart data from the browser's local storage.
const fetchFromLocalStorage = () => {
    let cart = localStorage.getItem('cart');
    if(cart){
        return JSON.parse(localStorage.getItem('cart'));
    } else {
        return [];
    }
}

// Function to store cart data in the browser's local storage.
const storeInLocalStorage = (data) => {
    localStorage.setItem('cart', JSON.stringify(data));
}

// Creating a Redux slice to manage the cart state.
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: fetchFromLocalStorage(), // Initial cart data fetched from local storage.
        totalItems: 0, // Total number of items in the cart.
        totalAmount: 0, // Total amount of the cart.
        deliveryCharge: 1000 // Default delivery charge.
    }, 
    reducers: {
        // Action creator to add items to the cart.
        addToCart(state, action){
            const tempItem = state.data.find(item => item.id === action.payload.id);
            if(tempItem){
                // Update item quantity and total price if the item is already in the cart.
                const tempCart = state.data.map(item => {
                    if(item.id === action.payload.id){
                        let newQty = item.quantity + action.payload.quantity;
                        let newTotalPrice = newQty * item.price;
                        return { ...item, quantity: newQty, totalPrice: newTotalPrice };
                    } else {
                        return item;
                    }
                });
                state.data = tempCart;
                storeInLocalStorage(state.data);
            } else {
                // Add the new item to the cart if it's not already present.
                state.data.push(action.payload);
                storeInLocalStorage(state.data);
            }
        },
        // Action creator to remove items from the cart.
        removeFromCart(state, action){
            const tempCart = state.data.filter(item => item.id !== action.payload);
            state.data = tempCart;
            storeInLocalStorage(state.data);
        },
        // Action creator to clear the cart.
        clearCart(state){
            state.data = [];
            storeInLocalStorage(state.data);
        },
        // Action creator to toggle item quantity in the cart.
        toggleCartQty(state, action){
            const tempCart = state.data.map(item => {
                if(item.id === action.payload.id){
                    let tempQty = item.quantity;
                    let tempTotalPrice = item.totalPrice;
                    if(action.payload.type === "INC"){
                        tempQty++;
                        tempTotalPrice = tempQty * item.price;
                    }
                    if(action.payload.type === "DEC"){
                        tempQty--;
                        if(tempQty < 1) tempQty = 1;
                        tempTotalPrice = tempQty * item.price;
                    }
                    return {...item, quantity: tempQty, totalPrice: tempTotalPrice};
                } else {
                    return item;
                }
            });
            state.data = tempCart;
            storeInLocalStorage(state.data);
        },
        // Action creator to calculate the total amount and total items in the cart.
        getCartTotal(state){
            state.totalAmount = state.data.reduce((cartTotal, cartItem) => {
                return cartTotal += cartItem.totalPrice;
            }, 0);
            state.totalItems = state.data.length;
        }
    }
});

// Exporting individual action creators and the reducer.
export const {addToCart, removeFromCart, toggleCartQty, getCartTotal, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
