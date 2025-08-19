import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import OrderOption from '../components/OrderOption';
import Hamur from '../components/Hamur';
import OrderButton from '../components/OrderButton';

// Main Component
const ProductSection = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    selectedSize: '',
    selectedDough: '',
    selectedItems: [],
    specialNotes: '',
    quantity: 1
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const hamurRef = useRef(null);
  const orderOptionRef = useRef(null);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.customerName.length < 3) {
      newErrors.customerName = 'İsim en az 3 karakter olmalıdır';
    }
    
    if (!formData.selectedSize) {
      newErrors.selectedSize = 'Lütfen pizza boyutu seçin';
    }
    
    if (!formData.selectedDough) {
      newErrors.selectedDough = 'Lütfen hamur tipi seçin';
    }
    
    if (formData.selectedItems.length < 4) {
      newErrors.selectedItems = 'En az 4 malzeme seçmelisiniz';
    }
    
    if (formData.selectedItems.length > 10) {
      newErrors.selectedItems = 'En fazla 10 malzeme seçebilirsiniz';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const calculateTotal = () => {
    const basePrice = 85.50;
    const ingredientPrice = formData.selectedItems.length * 5;
    return (basePrice + ingredientPrice) * formData.quantity;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    setIsLoading(true);
    
    try {
      // Axios simülasyonu
      const orderData = {
        isim: formData.customerName,
        boyut: formData.selectedSize,
        hamur: formData.selectedDough,
        malzemeler: formData.selectedItems,
        ozel: formData.specialNotes,
        adet: formData.quantity,
        toplam: calculateTotal(),
        tarih: new Date().toISOString()
      };

      // Mock API response simülasyonu
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Sipariş başarıyla gönderildi:', orderData);
      
      // Success sayfasına yönlendirme simülasyonu
      alert('Siparişiniz başarıyla alındı! Başarı sayfasına yönlendiriliyorsunuz...');
      
    } catch (error) {
      console.error('Sipariş gönderilirken hata oluştu:', error);
      alert('Sipariş gönderilirken bir hata oluştu. İnternet bağlantınızı kontrol edin.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return formData.customerName.length >= 3 &&
           formData.selectedSize &&
           formData.selectedDough &&
           formData.selectedItems.length >= 4 &&
           formData.selectedItems.length <= 10;
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
  {/* Header */}
  <Header />

      {/* Breadcrumb & Product Info */}
      <section className="w-full bg-white/80 shadow-sm py-4 px-2 lg:px-0 border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-gray-600 mb-2 lg:mb-0 w-full lg:w-auto">
            <button type="button" onClick={() => navigate('/')} className="hover:text-[#CE2829] font-medium transition-colors">Ana Sayfa</button>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-semibold">Sipariş Oluştur</span>
          </nav>
          {/* Fiyat & Rating */}
          <div className="flex flex-row items-center gap-6 ml-auto">
            <span className="text-2xl font-bold text-[#CE2829]">{calculateTotal().toFixed(2)}₺</span>
            <span className="flex items-center gap-2 text-gray-600 font-medium">
              <span>4.9</span>
              <svg width="20" height="20" fill="#FFD600" viewBox="0 0 20 20"><polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,19.02 10,15.27 4.18,19.02 6,12.14 0.49,7.64 7.41,7.36"/></svg>
              <span>(200)</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-10 py-10 px-2 lg:px-0">
        {/* Product Image & Description */}
        <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 gap-6">
          <img 
            className="w-64 h-64 lg:w-80 lg:h-80 object-cover rounded-2xl shadow-xl border-4 border-white" 
            src="/images/pizzaresim.png" 
            alt="Pizza" 
          />
          <h1 className="text-3xl font-bold text-[#292929] text-center lg:text-left">Position Absolute Acı Pizza</h1>
          <p className="font-normal text-base text-[#5F5F5F] text-center lg:text-left max-w-lg">
            Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir.
          </p>
        </div>

        {/* Order Form */}
        <div className="flex-1 flex flex-col gap-6">
          {/* İsim Alanı */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label htmlFor="customerName" className="block text-lg font-semibold mb-2 text-[#292929]">
              İsim Soyisim *
            </label>
            <input
              id="customerName"
              type="text"
              value={formData.customerName}
              onChange={(e) => handleInputChange('customerName', e.target.value)}
              placeholder="Adınızı ve soyadınızı girin (en az 3 karakter)"
              className={`w-full p-3 border rounded-lg bg-[#FAF7F2] transition-colors ${
                errors.customerName ? 'border-red-500' : 'border-gray-300 focus:border-[#FDC913]'
              } focus:outline-none`}
            />
            {errors.customerName && (
              <p className="text-red-500 text-sm mt-1 bg-red-50 p-2 rounded">{errors.customerName}</p>
            )}
          </div>

          {/* Hamur Seçimi */}
          <Hamur 
            ref={hamurRef} 
            onSizeChange={(size) => handleInputChange('selectedSize', size)}
            onDoughChange={(dough) => handleInputChange('selectedDough', dough)}
          />

          {/* Malzeme seçimi hata mesajı */}
          {errors.selectedItems && (
            <div className="text-center mb-2 px-4">
              <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg p-3 inline-block">
                {errors.selectedItems}
              </p>
            </div>
          )}

          {/* Malzeme Seçimi */}
          <OrderOption 
            ref={orderOptionRef} 
            onIngredientsChange={(items) => handleInputChange('selectedItems', items)}
          />

          {/* Özel Not Alanı */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label htmlFor="specialNotes" className="block text-lg font-semibold mb-2 text-[#292929]">
              Özel Not
            </label>
            <textarea
              id="specialNotes"
              value={formData.specialNotes}
              onChange={(e) => handleInputChange('specialNotes', e.target.value)}
              placeholder="Siparişiniz için özel notunuz (opsiyonel)..."
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg bg-[#FAF7F2] focus:border-[#FDC913] focus:outline-none resize-none"
            />
          </div>

          {/* Sipariş Özeti ve Buton */}
          <OrderButton
            totalPrice={85.5 + formData.selectedItems.length * 5}
            handleOrder={() => handleSubmit()}
            selectedItems={formData.selectedItems}
            selectedSize={formData.selectedSize}
            selectedDough={formData.selectedDough}
          />
        </div>
      </main>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          Lütfen tüm alanları doğru şekilde doldurun
        </div>
      )}
    </div>
  );
};

export default ProductSection;