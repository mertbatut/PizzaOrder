import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ 
  title = 'Bir Hata Oluştu',
  message,
  onRetry,
  className = ''
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 flex items-center justify-center ${className}`}>
      <div className="text-center max-w-md mx-auto px-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 shadow-lg">
          {/* Error Icon */}
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg 
              className="w-8 h-8 text-red-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>

          {/* Error Title */}
          <h2 className="text-xl font-bold text-red-900 mb-3">
            {title}
          </h2>

          {/* Error Message */}
          {message && (
            <p className="text-red-700 mb-6 leading-relaxed">
              {message}
            </p>
          )}

          {/* Retry Button */}
          {onRetry && (
            <button
              onClick={onRetry}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Tekrar Dene
            </button>
          )}

          {/* Help Text */}
          <p className="text-red-600 text-sm mt-4">
            Sorun devam ederse lütfen destek ekibi ile iletişime geçin.
          </p>
        </div>
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onRetry: PropTypes.func,
  className: PropTypes.string
};

export default ErrorMessage;