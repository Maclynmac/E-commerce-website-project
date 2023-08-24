// Import React and necessary assets
import React from 'react';
import "./Error.scss";  // Import the styles from Error.scss
import { error } from "../../utils/images";  // Import the error image from the specified path

// Define the Error component
const Error = () => {
  return (
    <div className='container'>
      <div class="flex flex-center error"> {/* Apply flex and centering styles */}
        <img src={error} alt="error" /> {/* Display the error image */}
      </div>
    </div>
  );
}

export default Error;  // Export the Error component
