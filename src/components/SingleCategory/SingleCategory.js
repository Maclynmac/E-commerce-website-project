// Import necessary dependencies and functions
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsModalVisible, setModalData } from '../../store/modalSlice';
import { formatPrice } from '../../utils/helpers';
import SingleProduct from '../SingleProduct/SingleProduct';
import Error from '../Error/Error';
import Loader from '../Loader/Loader';
import { STATUS } from "../../utils/status";

// Define the SingleCategory component
const SingleCategory = ({ products, status }) => {
    // Access the Redux dispatch function
    const dispatch = useDispatch();
    
    // Extract the isModalVisible state from the Redux store
    const { isModalVisible } = useSelector((state) => state.modal);

    // Handler to show the modal with specific product data
    const viewModalHandler = (data) => {
        // Dispatch actions to set modal data and visibility
        dispatch(setModalData(data));
        dispatch(setIsModalVisible(true));
    }

    // Conditional rendering based on the status prop
    if (status === STATUS.ERROR) return (<Error />);
    if (status === STATUS.LOADING) return (<Loader />);

    // Component rendering
    return (
        <section className='cat-single py-5 bg-ghost-white'>
            {/* Display the SingleProduct modal if isModalVisible is true */}
            {isModalVisible && <SingleProduct />}

            <div className='container'>
                <div className='cat-single-content'>
                    {/* Render the category name in a section title */}
                    <div className='section-title'>
                        <h3 className='text-uppercase fw-7 text-regal-blue ls-1'>{products[0].category.name}</h3>
                    </div>
                    <div className='product-items grid'>
                        {/* Map over products and render each product */}
                        {products.map(product => (
                            <div className='product-item bg-white' key={product.id} onClick={() => viewModalHandler(product)}>
                                {/* Display product image and category */}
                                <div className='product-item-img'>
                                    <img src={product.images[0]} alt="" />
                                    <div className="product-item-cat text-white fs-13 text-uppercase bg-gold fw-6">{product.category.name}</div>
                                </div>
                                <div className='product-item-body'>
                                    {/* Display product title and price */}
                                    <h6 className="product-item-title text-pine-green fw-4 fs-15">{product.title}</h6>
                                    <div className="product-item-price text-regal-blue fw-7 fs-18">{formatPrice(product.price)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// Export the SingleCategory component as default
export default SingleCategory;
