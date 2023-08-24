// Import the necessary modules and resources
import React from 'react'; // Import React for defining components
import { spinner } from '../../utils/images'; // Import the spinner image
import "./Loader.scss"; // Import the Loader component's styles

// Define the Loader component
const Loader = () => {
  return (
    <div className='container'> {/* Outer container */}
        <div className="flex flex-center loader"> {/* Centered flex container for loader */}
            <img src={spinner} alt="loader" /> {/* Display the spinner image */}
        </div>
    </div>
  );
}

export default Loader; // Export the Loader component as the default export
