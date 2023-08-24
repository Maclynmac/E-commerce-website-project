// Import necessary modules and components
import React from 'react';
import { STATUS } from "../../utils/status"; // Assuming STATUS is an object with status constants
import "./Category.scss"; // Styles for the Category component
import { Link } from "react-router-dom"; // For creating navigation links
import Error from '../Error/Error'; // Error component for displaying error messages
import Loader from '../Loader/Loader'; // Loader component for displaying loading indicators

// Define the Category component
const Category = ({ categories, status }) => {
    // Check if there's an error status, render the Error component
    if (status === STATUS.ERROR) return (<Error />);

    // Check if the data is still loading, render the Loader component
    if (status === STATUS.LOADING) return (<Loader />);

    // If no error or loading status, render the main content
    return (
        <section className="categories py-5 bg-ghost-white" id="categories">
            <div className="container">
                <div className="categories-content">
                    <div className='section-title'>
                        <h3 className="text-uppercase fw-7 text-regal-blue ls-1">Category</h3>
                    </div>
                    <div className="category-items grid">
                        {/* Map through categories and render each category */}
                        {categories.slice(0, 5).map(category => (
                            <Link to={`category/${category.id}`} key={category.id}>
                                <div className="category-item">
                                    {/* Display the category image */}
                                    <div className='category-item-img'>
                                        <img src={category.image} alt="" />
                                    </div>
                                    {/* Display the category name */}
                                    <div className="category-item-name text-center">
                                        <h6 className='fs-20'>{category.name}</h6>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// Export the Category component as the default export
export default Category;
