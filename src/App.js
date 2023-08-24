// Import required styles and dependencies
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import page components from the pages directory
import { Home, Category, Cart } from "./pages/index";

// Import UI components
import Navbar from './components/Navbar/Navbar';
import Footer from "./components/Footer/Footer";

// Import Redux Provider and store
import { Provider } from 'react-redux';
import store from "./store/store";

// Define the main App component
function App() {
  return (
    // Main container for the entire application
    <div className="App">
      {/* Provide the Redux store to the components */}
      <Provider store={store}>
        {/* Set up routing with BrowserRouter */}
        <BrowserRouter>
          {/* Navigation bar */}
          <Navbar />
          
          {/* Define routes using the Routes component */}
          <Routes>
            {/* Route for the Home page */}
            <Route path="/" element={<Home />} />
            
            {/* Route for the Category page with dynamic parameter */}
            <Route path="/category/:id" element={<Category />} />
            
            {/* Route for the Cart page */}
            <Route path="/cart" element={<Cart />} />
          </Routes>
          
          {/* Footer */}
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

// Export the App component as the default export
export default App;
