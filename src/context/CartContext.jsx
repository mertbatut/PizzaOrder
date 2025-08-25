import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  

  useEffect(() => {
    if (cartItems.length > 0) {
      console.log('🛒 Sepet güncellendi:', cartItems);
      console.log('📊 Sepet özeti:', {
        toplamUrun: cartItems.length,
        toplamAdet: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        toplamTutar: cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0).toFixed(2) + '₺'
      });
    }
  }, [cartItems]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      console.log('✅ Ürün miktarı artırıldı:', product.name);
    } else {
      setCartItems([...cartItems, { 
        ...product, 
        quantity: 1,
        price: parseFloat(product.price) // String'den number'a çevir
      }]);
      console.log('✅ Yeni ürün sepete eklendi:', product.name);
    }
  };

  const removeFromCart = (productId) => {
    const removedItem = cartItems.find(item => item.id === productId);
    setCartItems(cartItems.filter(item => item.id !== productId));
    console.log('❌ Ürün sepetten çıkarıldı:', removedItem?.name);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(cartItems.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
    console.log('🔄 Ürün miktarı güncellendi:', { productId, newQuantity });
  };

  const clearCart = () => {
    console.log('🗑️ Sepet temizlendi');
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};