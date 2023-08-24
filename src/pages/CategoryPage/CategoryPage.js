// Import necessary modules and components
import React, { useEffect } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsByCategory } from '../../store/categorySlice';
import { useParams, Link } from 'react-router-dom';
import "./CategoryPage.scss";

// Define the CategoryPage component
const CategoryPage = () => {
    // Access the Redux dispatch function
    const dispatch = useDispatch();
    // Get the 'id' parameter from the URL using React Router
    const { id } = useParams();

    // Extract product list and status from the Redux store's 'category' slice
    const { catProductSingle: products, catProductSingleStatus: status } = useSelector((state) => state.category);

    // Fetch products based on the category ID when 'id' changes
    useEffect(() => {
      dispatch(fetchProductsByCategory(id, 'single'));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
      // Render the CategoryPage component
      <div className="category-page">
        <div className="container">
          {/* Breadcrumb trail for navigation */}
          <div className="breadcrumb">
            <ul className="breadcrumb-items flex">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="fas fa-home"></i>
                  <span className="breadcrumb-separator">
                    <i className="fas fa-chevron-right"></i>
                  </span>
                </Link>
              </li>
              <li>
                Category
                <span className="breadcrumb-separator">
                  <i className="fas fa-chevron-right"></i>
                </span>
              </li>
              <li>
                {/* Display the name of the current category */}
                {products[0] && products[0].category.name}
              </li>
            </ul>
          </div>
        </div>
        {/* Render the ProductList component with products and status */}
        <ProductList products={products} status={status} />
      </div>
    );
}

// Export the CategoryPage component as the default export
export default CategoryPage;
