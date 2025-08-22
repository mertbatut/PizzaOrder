// src/components/UI/LoadingSpinner.jsx
import React from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ 
  message = 'Yükleniyor...', 
  size = 'large',
  className = '' 
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8', 
    large: 'h-16 w-16'
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.large;

  return (
    <div className={`min-h-screen bg-gray-50 flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className={`animate-spin rounded-full ${spinnerSize} border-4 border-red-200 border-t-red-600 mx-auto mb-4`} />
        <p className="text-gray-600 font-medium text-lg">{message}</p>
      </div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  message: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string
};

export default LoadingSpinner;