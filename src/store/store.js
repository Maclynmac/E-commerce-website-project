// Import necessary functions and modules from Redux Toolkit and custom slice files.
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";
import modalReducer from "./modalSlice";
import cartReducer from "./cartSlice";

// Configure the Redux store using the configureStore function.
const store = configureStore({
    // Combine the reducers for different slices of the state.
    reducer: {
        product: productReducer,
        category: categoryReducer,
        modal: modalReducer,
        cart: cartReducer
    }
});

// Export the configured Redux store for use in the application.
export default store;
