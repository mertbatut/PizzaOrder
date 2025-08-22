export const simulateCheckout = async (orderData) => {
  console.log('🔄 Sipariş işleme başladı...');

  await new Promise(resolve => setTimeout(resolve, 2000));
  

  const orderResult = {
    id: `ORD-${Date.now()}`,
    timestamp: new Date().toISOString(),
    customer: orderData.customer,
    items: orderData.items,
    total: orderData.total,
    status: 'confirmed'
  };
  
  console.log('🎉 SİPARİŞ BAŞARIYLA TAMAMLANDI!');
  console.log('📋 Sipariş Detayları:', orderResult);
  console.log('👤 Müşteri Bilgileri:', orderData.customer);
  console.log('🍕 Sipariş Edilen Ürünler:', orderData.items);
  console.log('💰 Toplam Tutar:', orderData.total + '₺');
  
  return orderResult;
};