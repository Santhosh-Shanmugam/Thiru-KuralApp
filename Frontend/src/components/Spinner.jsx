import React from 'react';
import './Spinner.css'; 

const Spinner = () => {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="dual-ring-spinner"></div>
    </div>
  );
};

export default Spinner;
