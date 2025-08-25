import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const { getTotalItems, cartItems, getTotalPrice } = useCart();

  const navigateToMenu = () => {
    console.log('Navigate to menu');
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout');
    }
    setIsCartOpen(false);
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
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></div>
            </div>
            
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-red-500 transition-colors font-medium py-2"
                onClick={() => navigate('/products')}
              >
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
            {/* Modern Cart Button */}
            <div className="relative">
              <button 
                onClick={toggleCart}
                className="relative group bg-white border-2 border-gray-200 hover:border-red-400 text-gray-700 hover:text-red-500 p-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {/* Shopping Cart Icon */}
                <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m6 0L18 18m-3-3h3m-3 3v3" />
                </svg>
                
                {/* Cart Count Badge */}
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-lg animate-pulse">
                    {getTotalItems() > 99 ? '99+' : getTotalItems()}
                  </span>
                )}
              </button>

              {/* Enhanced Mini Cart Dropdown */}
              {isCartOpen && (
                <div className="absolute right-0 top-full mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-fadeInUp">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 border-b border-red-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Sepetim</h3>
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          {getTotalItems()}
                        </span>
                      </div>
                      <button
                        onClick={toggleCart}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-white/50 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13" />
                        </svg>
                      </div>
                      <p className="text-gray-500 font-medium">Sepetiniz boş</p>
                      <p className="text-gray-400 text-sm mt-1">Lezzetli ürünlerimizi keşfedin!</p>
                    </div>
                  ) : (
                    <>
                      <div className="max-h-80 overflow-y-auto">
                        {cartItems.map((item, index) => (
                          <div key={item.id} className={`flex items-center gap-4 p-4 ${index !== cartItems.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 transition-colors`}>
                            <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.src = '/images/pizzaresim.png'; }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 truncate text-sm">{item.name}</h4>
                              <p className="text-xs text-gray-500 truncate">{item.category}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm font-bold text-red-600">{item.price}₺</span>
                                <span className="text-xs text-gray-400">×{item.quantity}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-gray-900">
                                {(item.price * item.quantity).toFixed(2)}₺
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-gray-50 p-4 border-t border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-700 font-medium">Toplam:</span>
                          <span className="text-2xl font-bold text-red-600">
                            {getTotalPrice().toFixed(2)}₺
                          </span>
                        </div>
                        <button
                          onClick={handleCheckout}
                          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 px-6 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                        >
                          Sepeti Görüntüle & Siparişi Tamamla
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button className="p-3 rounded-xl hover:bg-gray-100 transition-colors border-2 border-transparent hover:border-gray-200">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-3 rounded-xl hover:bg-gray-100 transition-colors border-2 border-transparent hover:border-gray-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
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
              <button
                className="text-left text-gray-700 hover:text-red-500 transition-colors font-medium py-2 px-2 rounded-lg hover:bg-red-50"
                onClick={() => navigate('/products')}
              >Pages</button>
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
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.8s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;