// Import required React components and modules
import React, { useState, useEffect} from 'react';
import "./Navbar.scss"; // Import the styles for the Navbar
import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom
import { useSelector, useDispatch } from 'react-redux'; // Import hooks for interacting with Redux store
import { fetchCategories } from '../../store/categorySlice'; // Import the fetchCategories action
import { getCartTotal } from '../../store/cartSlice'; // Import the getCartTotal action

// Define the Navbar component
const Navbar = () => {
  const dispatch = useDispatch(); // Initialize the dispatch function for Redux actions
  const {data: categories} = useSelector((state) => state.category); // Extract categories from the Redux store
  const {totalItems} = useSelector((state => state.cart)); // Extract totalItems from the cart in the Redux store

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to track whether the sidebar is open or closed

  // Fetch categories and cart total when the component mounts
  useEffect(() => {
    dispatch(fetchCategories()); // Dispatch the fetchCategories action to get category data
    dispatch(getCartTotal()); // Dispatch the getCartTotal action to update cart total
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // JSX that defines the structure of the navigation bar
  return (
    <nav className="navbar">
      <div className='navbar-content'>
        <div className="container">
          {/* Top section of the navigation bar */}
          <div className="navbar-top flex flex-between">
            <Link to="/" className="navbar-brand">
              {/* Brand logo */}
              <span className="text-regal-blue">Shopping</span><span className='text-gold'>Hub.</span>
            </Link>

            {/* Search form */}
            <form className="navbar-search flex">
              <input type="text" placeholder='Search here ...' />
              <button type="submit" className="navbar-search-btn">
                <i className="fas fa-search"></i>
              </button>
            </form>

            {/* Cart icon and count */}
            <div className="navbar-btns">
              <Link to="/cart" className="add-to-cart-btn flex">
                <span className="btn-ico">
                  <i className="fas fa-shopping-cart"></i>
                </span>
                <div className='btn-txt fw-5'>Cart
                  <span className='cart-count-value'>{totalItems}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom section of the navigation bar */}
        <div className='navbar-bottom bg-regal-blue'>
          <div className='container flex flex-between'>
            {/* List of category links */}
            <ul className={`nav-links flex ${isSidebarOpen ? 'show-nav-links' : ""}`}>
              {/* Button to close the sidebar */}
              <button type="button" className='navbar-hide-btn text-white' onClick={() => setIsSidebarOpen(false)}>
                <i className='fas fa-times'></i>
              </button>
              {/* Generate category links dynamically */}
              {categories.map(category => (
                <li key={category.id}><Link to={`/category/${category.id}`} className="nav-link text-white" onClick={() => setIsSidebarOpen(false)}>{category.name}</Link></li>
              ))}
            </ul>

            {/* Button to show the sidebar */}
            <button type="button" className='navbar-show-btn text-gold' onClick={() => setIsSidebarOpen(true)}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar; // Export the Navbar component
