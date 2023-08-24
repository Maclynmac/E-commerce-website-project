// Import React and necessary hooks/modules
import React, { useState } from 'react';
import "./SingleProduct.scss";
import { useSelector, useDispatch } from 'react-redux';
import { setIsModalVisible } from '../../store/modalSlice';
import { addToCart } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';

// Define the SingleProduct component
const SingleProduct = () => {
  // Set up Redux-related hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Manage the quantity state for the product
  const [qty, setQty] = useState(1);

  // Retrieve product data from the modal slice of the Redux store
  const { data: product } = useSelector(state => state.modal);

  // Function to increase the quantity
  const increaseQty = () => {
    setQty((prevQty) => {
      let newQty = prevQty + 1;
      return newQty;
    });
  };

  // Function to decrease the quantity
  const decreaseQty = () => {
    setQty((prevQty) => {
      let newQty = prevQty - 1;
      if (newQty < 1) {
        newQty = 1;
      }
      return newQty;
    });
  };

  // Function to add the selected product to the cart
  const addToCartHandler = (product) => {
    let totalPrice = qty * product.price;
    const tempProduct = {
      ...product,
      quantity: qty,
      totalPrice
    };
    // Dispatch actions to update cart state and navigate to the cart page
    dispatch(addToCart(tempProduct));
    dispatch(setIsModalVisible(false));
    navigate('/cart');
  };

  // Function to handle modal overlay clicks
  const modalOverlayHandler = (e) => {
    if (e.target.classList.contains('overlay-bg')) {
      dispatch(setIsModalVisible(false));
    }
  };

  // JSX rendering for the SingleProduct component
  return (
    <div className='overlay-bg' onClick={modalOverlayHandler}>
      <div className="product-details-modal bg-white">
        <button type="button" className='modal-close-btn flex flex-center fs-14' onClick={() => dispatch(setIsModalVisible(false))}>
          <i className="fas fa-times"></i>
        </button>
        <div className="details-content grid">
          {/* Product details on the left */}
          <div className="details-right">
            <div className="details-img">
              <img src={product.images[0]} alt={product.title} />
            </div>
          </div>
          {/* Product details on the right */}
          <div className='details-left'>
            <div className="details-info">
              <h3 className="title text-regal-blue fs-22 fw-5">{product.title}</h3>
              <p className='description text-pine-green'>{product.description}</p>
              <div className='price fw-7 fs-24'>Price: {formatPrice(product.price)}</div>
              <div className="qty flex">
                <span className="text-light-blue qty-text">Qty: </span>
                <div className="qty-change flex">
                  <button type="button" className='qty-dec fs-14' onClick={() => decreaseQty()}>
                    <i className="fas fa-minus text-light-blue"></i>
                  </button>
                  <span className="qty-value flex flex-center">{qty}</span>
                  <button type="button" className='qty-inc fs-14 text-light-blue' onClick={() => increaseQty()}>
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <button type="button" className='btn-primary add-to-cart-btn' onClick={() => addToCartHandler(product)}>
                <span className="btn-icon">
                  <i className='fas fa-cart-shopping'></i>
                </span>
                <span className='btn-text'>Add To Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the SingleProduct component as the default export
export default SingleProduct;
