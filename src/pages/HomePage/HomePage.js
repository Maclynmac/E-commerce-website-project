// Import necessary dependencies and components
import React, { useEffect } from 'react';
import Slider from '../../components/Slider/Slider';
import Category from '../../components/Category/Category';
import ProductList from '../../components/ProductList/ProductList';
import SingleCategory from '../../components/SingleCategory/SingleCategory';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';
import { fetchCategories, fetchProductsByCategory } from '../../store/categorySlice';
import "./HomePage.scss";

// Define the HomePage component
const HomePage = () => {
  // Initialize Redux dispatch hook
  const dispatch = useDispatch();
  
  // Extract data and status from the Redux store
  const { data: categories, status: categoryStatus } = useSelector((state) => state.category);
  const { data: products, status: productStatus } = useSelector((state) => state.product);
  const { catProductAll: productsByCategory, catProductAllStatus } = useSelector((state) => state.category);
  
  // Fetch initial data when the component mounts
  useEffect(() => {
    dispatch(fetchProducts()); // Fetch all products
    dispatch(fetchCategories()); // Fetch all categories
    dispatch(fetchProductsByCategory(1, 'all')); // Fetch products for category 1
    dispatch(fetchProductsByCategory(2, 'all')); // Fetch products for category 2
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Render the component's UI
  return (
    <div className="home-page">
      {/* Render the Slider component */}
      <Slider />
      
      {/* Render the Category component with provided categories and status */}
      <Category categories={categories} status={categoryStatus} />
      
      {/* Render the ProductList component with provided products and status */}
      <ProductList products={products} status={productStatus} />
      
      {/* Render the SingleCategory component for the first category */}
      <section>
        {productsByCategory[0] && <SingleCategory products={productsByCategory[0]} status={catProductAllStatus} />}
      </section>
      
      {/* Render the SingleCategory component for the second category */}
      <section>
        {productsByCategory[1] && <SingleCategory products={productsByCategory[1]} status={catProductAllStatus} />}
      </section>
    </div>
  )
}

// Export the HomePage component
export default HomePage;
