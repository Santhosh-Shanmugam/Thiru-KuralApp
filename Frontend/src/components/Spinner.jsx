import React from 'react';
import './Spinner.css'; // Create a CSS file for custom animations

const Spinner = () => {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="dual-ring-spinner"></div>
    </div>
  );
};

export default Spinner;
