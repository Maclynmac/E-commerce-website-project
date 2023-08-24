// Import React and required styles
import React from 'react';
import "./Slider.scss"; // Import local SCSS styles for the slider
import "slick-carousel/slick/slick.css"; // Import slick-carousel CSS styles
import "slick-carousel/slick/slick-theme.css"; // Import slick-carousel theme CSS
import { sliderImages } from '../../utils/images'; // Import image URLs for the slider

// Define the Slider component
const Slider = () => {
  return (
    <div className="hero-slider"> {/* Container for the entire slider */}
      <div className='hero-slider-item'> {/* Individual slide */}
        <img src={sliderImages[1]} alt="" /> {/* Display image from sliderImages array */}
      </div>
    </div>
  );
}


// Export the Slider component as the default export
export default Slider;
