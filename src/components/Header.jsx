import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigateToMenu = () => {
    console.log('Navigate to menu');
  };

  return (
    <header className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-md shadow-lg rounded-2xl z-50 animate-slideDown">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9l-5.22 5.74L18.18 22 12 18.27 5.82 22l1.4-7.26L2 9l6.91-.74L12 2z"/>
              </svg>
            </div>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            >
              BTTFOOD
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-red-500 transition-colors font-medium py-2">
                <span>Home</span>
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown indicator */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></div>
            </div>
            
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-red-500 transition-colors font-medium py-2">
                <span>Pages</span>
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></div>
            </div>
            
            <div className="relative group">
              <button 
                onClick={navigateToMenu}
                className="flex items-center space-x-1 text-gray-700 hover:text-red-500 transition-colors font-medium py-2"
              >
                <span>Menu</span>
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></div>
            </div>
            
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-red-500 transition-colors font-medium py-2">
                <span>Blog</span>
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></div>
            </div>
            
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-red-500 transition-colors font-medium py-2">
                <span>Shop</span>
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></div>
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button className="relative bg-gradient-to-br from-teal-600 to-teal-700 text-white p-3 rounded-full hover:from-teal-700 hover:to-teal-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m6 0L18 18m-3-3h3m-3 3v3" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                0
              </span>
            </button>

            {/* Theme Toggle */}
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 animate-slideDown">
            <nav className="flex flex-col space-y-3 pt-4">
              <button className="text-left text-gray-700 hover:text-red-500 transition-colors font-medium py-2 px-2 rounded-lg hover:bg-red-50">Home</button>
              <button className="text-left text-gray-700 hover:text-red-500 transition-colors font-medium py-2 px-2 rounded-lg hover:bg-red-50">Pages</button>
              <button 
                onClick={navigateToMenu}
                className="text-left text-gray-700 hover:text-red-500 transition-colors font-medium py-2 px-2 rounded-lg hover:bg-red-50"
              >
                Menu
              </button>
              <button className="text-left text-gray-700 hover:text-red-500 transition-colors font-medium py-2 px-2 rounded-lg hover:bg-red-50">Blog</button>
              <button className="text-left text-gray-700 hover:text-red-500 transition-colors font-medium py-2 px-2 rounded-lg hover:bg-red-50">Shop</button>
            </nav>
          </div>
        )}
      </div>

  <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.8s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;