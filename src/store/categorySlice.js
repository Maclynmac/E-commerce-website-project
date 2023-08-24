// Import necessary functions and constants
import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

// Create a Redux slice for managing category and product state
const categorySlice = createSlice({
    name: 'category',
    initialState: {
        data: [], // Array to store categories
        status: STATUS.IDLE, // Status of category data
        catProductAll : [], // Array to store products of all categories
        catProductAllStatus: STATUS.IDLE, // Status of all-category product data
        catProductSingle : [], // Array to store products of a single category
        catProductSingleStatus: STATUS.IDLE // Status of single-category product data
    },

    // Reducer functions to update the state
    reducers: {
        setCategories(state, action){
            state.data = action.payload; // Update categories array
        },
        setStatus(state, action){
            state.status = action.payload; // Update category status
        },
        setCategoriesProductAll(state, action){
            state.catProductAll.push(action.payload); // Update products of all categories
        },
        setCategoriesStatusAll(state, action){
            state.catProductAllStatus = action.payload; // Update all-category product status
        },
        setCategoriesProductSingle(state, action){
            state.catProductSingle = action.payload; // Update products of a single category
        },
        setCategoriesStatusSingle(state, action){
            state.catProductSingleStatus = action.payload; // Update single-category product status
        }
    }
});

// Export action creators and the reducer from the slice
export const { setCategories, setStatus, setCategoriesProductAll, setCategoriesStatusAll, setCategoriesProductSingle, setCategoriesStatusSingle } = categorySlice.actions;
export default categorySlice.reducer;

// Thunk action to fetch categories from the API
export const fetchCategories = () => {
    return async function fetchCategoryThunk(dispatch){
        dispatch(setStatus(STATUS.LOADING)); // Set category status to loading
        try{
            const response = await fetch(`${BASE_URL}categories`); // Fetch categories from the API
            const data = await response.json();
            dispatch(setCategories(data.slice(0, 5))); // Update categories array with fetched data
            dispatch(setStatus(STATUS.IDLE)); // Set category status back to idle
        } catch(error){
            dispatch(setStatus(STATUS.ERROR)); // Set category status to error if fetching fails
        }
    }
}

// Thunk action to fetch products by category from the API
export const fetchProductsByCategory = (categoryID, dataType) => {
    return async function fetchCategoryProductThunk(dispatch){
        if(dataType === 'all') dispatch(setCategoriesStatusAll(STATUS.LOADING)); // Set all-category product status to loading
        if(dataType === 'single') dispatch(setCategoriesStatusSingle(STATUS.LOADING)); // Set single-category product status to loading
        
        try{
            const response = await fetch(`${BASE_URL}categories/${categoryID}/products`); // Fetch products by category from the API
            const data = await response.json();
            if(dataType === 'all'){
                dispatch(setCategoriesProductAll(data.slice(0, 10))); // Update all-category products array with fetched data
                dispatch(setCategoriesStatusAll(STATUS.IDLE)); // Set all-category product status back to idle
            }
            if(dataType === 'single'){
                dispatch(setCategoriesProductSingle(data.slice(0, 20))); // Update single-category products array with fetched data
                dispatch(setCategoriesStatusSingle(STATUS.IDLE)); // Set single-category product status back to idle
            }
        } catch(error){
            dispatch(setCategoriesStatusAll(STATUS.ERROR)); // Set all-category product status to error if fetching fails
        }
    }
}
