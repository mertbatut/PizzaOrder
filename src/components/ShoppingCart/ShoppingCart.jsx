import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { simulateCheckout } from '../../context/CheckoutService';
import Header from '../../components/Header';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, parseInt(newQuantity));
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Sepetiniz boş!');
      return;
    }

    if (!customerInfo.name || !customerInfo.email) {
      alert('Lütfen isim ve email alanlarını doldurun!');
      return;
    }

    setIsCheckingOut(true);
    
    const orderData = {
      customer: customerInfo,
      items: cartItems,
      total: getTotalPrice().toFixed(2),
      orderDate: new Date().toLocaleString('tr-TR')
    };

    try {
      const result = await simulateCheckout(orderData);
      
      // Success sayfasına yönlendir
      navigate('/success', {
        state: {
          selectedItems: cartItems.map(item => item.name),
          total: getTotalPrice(),
          orderData: result,
          customer: customerInfo
        }
      });
      
      // Sepeti temizle
      clearCart();
      
    } catch (error) {
      console.error('Checkout hatası:', error);
      alert('Sipariş tamamlanırken hata oluştu');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-32 pb-16">
          <div className="max-w-2xl mx-auto text-center px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sepetiniz Boş</h2>
              <p className="text-gray-600 mb-6">Pizza siparişi vermek için menüye göz atın!</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/products')}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Ürünleri Keşfet
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Ana Sayfa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sepetim</h1>
            <p className="text-gray-600">
              {getTotalItems()} ürün • Toplam: {getTotalPrice().toFixed(2)}₺
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Sipariş Detayları</h2>
                </div>

                <div className="divide-y divide-gray-200">
                  {cartItems.map(item => (
                    <div key={item.id} className="p-6 flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl bg-gray-50"
                        onError={(e) => { e.target.src = '/images/pizzaresim.png'; }}
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.category}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-yellow-500">⭐ {item.rating}</span>
                          <span className="text-xs text-gray-400">{item.comments}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow text-gray-600 hover:text-red-600 transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow text-gray-600 hover:text-green-600 transition-colors"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right min-w-[80px]">
                          <div className="font-bold text-red-600">
                            {(item.price * item.quantity).toFixed(2)}₺
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.price}₺ × {item.quantity}
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                          title="Ürünü kaldır"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear Cart */}
                <div className="p-6 border-t border-gray-200">
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 font-semibold transition-colors"
                  >
                    Sepeti Temizle
                  </button>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-32">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Sipariş Özeti</h2>

                {/* Customer Info Form */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      İsim Soyisim *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Adınızı girin"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Email adresiniz"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Telefon numaranız"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Adres
                    </label>
                    <textarea
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Teslimat adresiniz"
                    />
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Ürün Sayısı:</span>
                    <span className="font-semibold">{getTotalItems()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Ara Toplam:</span>
                    <span className="font-semibold">{getTotalPrice().toFixed(2)}₺</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Teslimat:</span>
                    <span className="font-semibold text-green-600">Ücretsiz</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold">Toplam:</span>
                      <span className="text-xl font-bold text-red-600">{getTotalPrice().toFixed(2)}₺</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut || cartItems.length === 0}
                  className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Siparişiniz İşleniyor...
                    </div>
                  ) : (
                    'Siparişi Tamamla'
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-4">
                  <button
                    onClick={() => navigate('/products')}
                    className="text-red-500 hover:text-red-700 font-semibold transition-colors"
                  >
                    Alışverişe Devam Et
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;