// src/components/layout/Header.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  // Login page navigation helper
  const handleLoginPage = () => {
    navigate('/auth/login');
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { getTotalItems, cartItems, getTotalPrice } = useCart();
  const {
    currentUser,
    userProfile,
    isAuthenticated,
    loginWithGoogle,
    logout,
    loading: authLoading,
  } = useAuth();

  // Dış tıklama ile dropdown kapatma
  const userMenuRef = useRef(null);
  const cartRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (isUserMenuOpen && userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
      if (isCartOpen && cartRef.current && !cartRef.current.contains(e.target)) {
        // mobilde backdrop zaten kapatıyor; desktop’ta dış tıklama ile kapansın
        setIsCartOpen(false);
      }
    };
    const onEsc = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsCartOpen(false);
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, [isUserMenuOpen, isCartOpen]);

  // Route değişince açık menüleri kapat
  useEffect(() => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const navigateToMenu = () => {
    // ileride gerçek sayfaya bağlayacaksın
    console.log("Navigate to menu");
  };

  const toggleCart = () => setIsCartOpen((s) => !s);
  const toggleUserMenu = () => setIsUserMenuOpen((s) => !s);

  const handleCheckout = () => {
    if (cartItems.length > 0) navigate("/checkout");
    setIsCartOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Artık sayfaya gitmek yerine doğrudan Google’la giriş
  const handleLogin = async () => {
    await loginWithGoogle(); // { mode: "popup" } varsayılan
    // mobil/kiosk istiyorsan: await loginWithGoogle({ mode: "redirect" });
  };

  const handleRegister = () => {
    // ayrı bir kayıt sayfan varsa yönlendirebilirsin:
    navigate("/auth/register");
  };

  // İsim/baş harf yardımcıları
  const displayName =
    userProfile?.firstName
      ? `${userProfile.firstName} ${userProfile.lastName || ""}`.trim()
      : currentUser?.displayName || "User";

  const avatarChar =
    userProfile?.firstName?.charAt(0) ||
    currentUser?.email?.charAt(0)?.toUpperCase() ||
    currentUser?.displayName?.charAt(0) ||
    "U";

  return (
    <header className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-md shadow-lg rounded-2xl z-50 animate-slideDown">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9l-5.22 5.74L18.18 22 12 18.27 5.82 22l1.4-7.26L2 9l6.91-.74L12 2z" />
              </svg>
            </div>
            <button
              type="button"
              onClick={() => navigate("/")}
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
                onClick={() => navigate("/products")}
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
            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-3 bg-white border-2 border-gray-200 hover:border-red-400 text-gray-700 hover:text-red-500 p-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                  aria-haspopup="menu"
                  aria-expanded={isUserMenuOpen}
                >
                  {/* Avatar (varsa photoURL, yoksa harf) */}
                  {currentUser?.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={displayName}
                      className="w-8 h-8 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{avatarChar}</span>
                    </div>
                  )}

                  {/* User Name - Desktop */}
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-semibold">{displayName}</div>
                    <div className="text-xs text-gray-500">
                      {userProfile?.loyaltyPoints || 0} puan
                    </div>
                  </div>

                  <svg
                    className={`w-4 h-4 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setIsUserMenuOpen(false)}></div>
                    <div
                      className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 animate-fadeInUp"
                      role="menu"
                    >
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center overflow-hidden">
                            {currentUser?.photoURL ? (
                              <img
                                src={currentUser.photoURL}
                                alt={displayName}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <span className="text-white font-bold">{avatarChar}</span>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{displayName}</div>
                            <div className="text-sm text-gray-500">{currentUser?.email}</div>
                            <div className="text-xs text-red-600 font-medium">
                              🎯 {userProfile?.loyaltyPoints || 0} sadakat puanı
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <button
                          onClick={() => { setIsUserMenuOpen(false); navigate("/account/profile"); }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors flex items-center space-x-3"
                          role="menuitem"
                        >
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>Profil Bilgileri</span>
                        </button>

                        <button
                          onClick={() => { setIsUserMenuOpen(false); navigate("/account/orders"); }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors flex items-center space-x-3"
                          role="menuitem"
                        >
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          <span>Sipariş Geçmişi</span>
                        </button>

                        <button
                          onClick={() => { setIsUserMenuOpen(false); navigate("/account/favorites"); }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors flex items-center space-x-3"
                          role="menuitem"
                        >
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span>Favorilerim</span>
                          <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                            {userProfile?.favoriteProducts?.length || 0}
                          </span>
                        </button>

                        <div className="border-t border-gray-100 my-2"></div>

                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 rounded-xl transition-colors flex items-center space-x-3"
                          role="menuitem"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Çıkış Yap</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              // Non-Authenticated
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleLoginPage}
                  disabled={authLoading}
                  className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-red-500 font-medium px-4 py-2 rounded-xl hover:bg-red-50 transition-all duration-300 disabled:opacity-60"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>{authLoading ? "Giriş yapılıyor..." : "Giriş"}</span>
                </button>

                <button
                  onClick={handleRegister}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Üye Ol
                </button>
              </div>
            )}

            {/* Cart */}
            <div className="relative" ref={cartRef}>
              <button
                onClick={toggleCart}
                className="relative group bg-white border-2 border-gray-200 hover:border-red-400 text-gray-700 hover:text-red-500 p-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                aria-haspopup="dialog"
                aria-expanded={isCartOpen}
              >
                <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m6 0L18 18m-3-3h3m-3 3v3" />
                </svg>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-lg animate-pulse">
                    {getTotalItems() > 99 ? "99+" : getTotalItems()}
                  </span>
                )}
              </button>

              {isCartOpen && (
                <>
                  {/* Backdrop for mobile */}
                  <div className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden" onClick={toggleCart} />

                  {/* Cart Modal / Dropdown */}
                  <div
                    className="fixed lg:absolute right-0 top-0 lg:top-full lg:mt-3 w-full h-full lg:w-96 lg:h-auto bg-white rounded-none lg:rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-fadeInUp flex flex-col"
                    style={{ maxWidth: "100vw", maxHeight: "100vh" }}
                  >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 border-b border-red-200 flex items-center justify-between">
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
                        aria-label="Sepeti kapat"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {cartItems.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center py-12">
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
                        <div className="flex-1 max-h-80 lg:max-h-80 overflow-y-auto">
                          {cartItems.map((item, index) => (
                            <div
                              key={item.id}
                              className={`flex items-center gap-4 p-4 ${
                                index !== cartItems.length - 1 ? "border-b border-gray-100" : ""
                              } hover:bg-gray-50 transition-colors`}
                            >
                              <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = "/images/pizzaresim.png";
                                  }}
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
                            Sepeti Görüntüle &amp; Siparişi Tamamla
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Theme Toggle */}
            <button className="p-3 rounded-xl hover:bg-gray-100 transition-colors border-2 border-transparent hover:border-gray-200" aria-label="Tema değiştir">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-3 rounded-xl hover:bg-gray-100 transition-colors border-2 border-transparent hover:border-gray-200"
              onClick={() => setIsMenuOpen((s) => !s)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              aria-label="Menüyü aç/kapat"
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
          <div id="mobile-nav" className="lg:hidden mt-4 pb-4 border-t border-gray-200 animate-slideDown">
            <nav className="flex flex-col space-y-3 pt-4">
              <button className="text-left text-gray-700 hover:text-red-500 transition-colors font-medium py-2 px-2 rounded-lg hover:bg-red-50">
                Home
              </button>
              <button
                className="text-left text-gray-700 hover:text-red-500 transition-colors font-medium py-2 px-2 rounded-lg hover:bg-red-50"
                onClick={() => navigate("/products")}
              >
                Pages
              </button>
              <button
                onClick={navigateToMenu}
                className="text-left text-gray-700 hover:text-red-500 transition-colors font-medium py-2 px-2 rounded-lg hover:bg-red-50"
              >
                Menu
              </button>
              <button className="text-left text-gray-700 hover:text-red-500 transition-colors font-medium py-2 px-2 rounded-lg hover:bg-red-50">
                Blog
              </button>
              <button className="text-left text-gray-700 hover:text-red-500 transition-colors font-medium py-2 px-2 rounded-lg hover:bg-red-50">
                Shop
              </button>

              {/* Mobile Auth Buttons */}
              {!isAuthenticated && (
                <div className="pt-2 border-t border-gray-100 space-y-2">
                  <button 
                    onClick={handleLoginPage}
                    className="w-full text-left text-gray-700 hover:text-red-500 transition-colors font-medium py-2 px-2 rounded-lg hover:bg-red-50"
                  >
                    {authLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
                  </button>
                  <button
                    onClick={handleRegister}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                  >
                    Üye Ol
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.8s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.3s ease-out; }
      `}</style>

    </header>
  );
};
export default Header;
