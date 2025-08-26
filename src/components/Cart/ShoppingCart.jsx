// ShoppingCart.js
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { simulateCheckout } from '../../context/CheckoutService';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Sepetiniz boş!');
      return;
    }

    setIsCheckingOut(true);
    
    const orderData = {
      customer: {
        name: 'Müşteri', // Bu bilgiyi form'dan alabilirsiniz
        email: 'musteri@email.com'
      },
      items: cartItems,
      total: getTotalPrice().toFixed(2),
      orderDate: new Date().toLocaleString('tr-TR')
    };

    try {
      const result = await simulateCheckout(orderData);
      
      // Sepeti temizle
      clearCart();
      
      // Success sayfasına yönlendir
      alert(`Siparişiniz başarıyla alındı! Sipariş No: ${result.id}`);
      
    } catch (error) {
      console.error('Checkout hatası:', error);
      alert('Sipariş tamamlanırken hata oluştu');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Sepetiniz Boş</h2>
        <p>Pizza siparişi vermek için menüye göz atın!</p>
      </div>
    );
  }

  return (
    <div className="shopping-cart">
      <h2>Sepetim</h2>
      
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div>
            <h3>{item.name}</h3>
            {item.customizations && (
              <div className="customizations">
                <p>Boyut: {item.customizations.size}</p>
                <p>Hamur: {item.customizations.dough}</p>
                <p>Malzemeler: {item.customizations.ingredients?.join(', ')}</p>
              </div>
            )}
          </div>
          <div>
            <input 
              type="number" 
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              min="1"
            />
          </div>
          <div>{(item.price * item.quantity).toFixed(2)}₺</div>
          <button onClick={() => removeFromCart(item.id)}>Sil</button>
        </div>
      ))}
      
      <div className="cart-total">
        <h3>Toplam: {getTotalPrice().toFixed(2)}₺</h3>
      </div>
      
      <button 
        onClick={handleCheckout} 
        disabled={isCheckingOut}
        className="checkout-btn"
      >
        {isCheckingOut ? 'İşleniyor...' : 'Siparişi Tamamla'}
      </button>
    </div>
  );
};

export default ShoppingCart;