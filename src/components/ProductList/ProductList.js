// Importing necessary dependencies and styles
import React from 'react';
import { STATUS } from '../../utils/status';
import "./ProductList.scss";
import { setModalData, setIsModalVisible } from '../../store/modalSlice';
import SingleProduct from '../SingleProduct/SingleProduct';
import { useSelector, useDispatch } from 'react-redux';
import { formatPrice } from '../../utils/helpers';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';

// ProductList component
const ProductList = ({ products, status }) => {
    const dispatch = useDispatch();
    // Accessing isModalVisible state from the Redux store
    const { isModalVisible } = useSelector((state) => state.modal);

    // Handler function for opening the modal when a product is clicked
    const viewModalHandler = (data) => {
        // Dispatching actions to update modal data and visibility
        dispatch(setModalData(data));
        dispatch(setIsModalVisible(true));
    }

    // Conditional rendering based on the status
    if (status === STATUS.ERROR) return (<Error />);
    if (status === STATUS.LOADING) return (<Loader />);

    return (
        <section className='product py-5 bg-ghost-white' id="products">
            {/* Conditional rendering of the SingleProduct modal */}
            {isModalVisible && <SingleProduct />}

            <div className='container'>
                <div className='product-content'>
                    <div className='section-title'>
                        {/* Title for the product list section */}
                        <h3 className='text-uppercase fw-7 text-regal-blue ls-1'>Our Products</h3>
                    </div>
                    <div className='product-items grid'>
                        {/* Mapping through products and rendering each product */}
                        {products.slice(0, 20).map(product => (
                            <div className='product-item bg-white' key={product.id} onClick={() => viewModalHandler(product)}>
                                <div className='product-item-img'>
                                    {/* Product image */}
                                    <img src={product.images[0]} alt="" />
                                    {/* Category label */}
                                    <div className="product-item-cat text-white fs-13 text-uppercase bg-gold fw-6">{product.category.name}</div>
                                </div>
                                <div className='product-item-body'>
                                    {/* Product title */}
                                    <h6 className="product-item-title text-pine-green fw-4 fs-15">{product.title}</h6>
                                    {/* Product price */}
                                    <div className="product-item-price text-regal-blue fw-7 fs-18">{formatPrice(product.price)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

// Exporting the ProductList component
export default ProductList;
