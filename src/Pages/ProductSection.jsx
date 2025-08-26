import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../components/Layout/Header';
import CartSpinner from '../components/UI/CartSpinner';
import CartSuccessPopup from '../components/UI/CartSuccessPopup';
import HeartExplosion from '../components/UI/HeartExplosion';

const ProductSection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Form States
  const [formData, setFormData] = useState({
    customerName: '',
    selectedSize: '',
    selectedDough: '',
    selectedItems: [],
    specialNotes: '',
    quantity: 1
  });

  // UI States
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [showHeartExplosion, setShowHeartExplosion] = useState(false);
  const [heartPosition, setHeartPosition] = useState({ x: 0, y: 0 });

  // Product data (you can fetch this based on ID)
  const product = {
    id: id || 1,
    name: "Position Absolute Acı Pizza",
    category: "SPICY, PIZZA",
    rating: "4.9",
    comments: "(200)",
    price: "85.50",
    image: "/images/pizzaresim.png",
    description: "Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir."
  };

  // Pizza sizes
  const sizes = [
    { id: 'S', name: 'Small', description: '10"', basePrice: 0 },
    { id: 'M', name: 'Medium', description: '12"', basePrice: 5 },
    { id: 'L', name: 'Large', description: '14"', basePrice: 10 }
  ];

  // Dough types
  const doughTypes = [
    { id: 'ince', name: 'İnce Kenar', description: 'Klasik İtalyan tarzı' },
    { id: 'yumusak', name: 'Yumuşak Kenar', description: 'Fluffy ve yumuşak' },
    { id: 'kalin', name: 'Kalın Kenar', description: 'Extra peynirli kenar' },
    { id: 'ipince', name: 'İpince Kenar', description: 'Ultra ince ve çıtır' }
  ];

  // Available toppings
  const toppings = [
    { id: 'pepperoni', name: 'Pepperoni', price: 5, category: 'Et' },
    { id: 'sosis', name: 'Sosis', price: 5, category: 'Et' },
    { id: 'jambon', name: 'Kanada Jambonu', price: 5, category: 'Et' },
    { id: 'tavuk', name: 'Tavuk Izgara', price: 5, category: 'Et' },
    { id: 'sucuk', name: 'Sucuk', price: 5, category: 'Et' },
    { id: 'misir', name: 'Mısır', price: 5, category: 'Sebze' },
    { id: 'ananas', name: 'Ananas', price: 5, category: 'Sebze' },
    { id: 'sogan', name: 'Soğan', price: 5, category: 'Sebze' },
    { id: 'biber', name: 'Biber', price: 5, category: 'Sebze' },
    { id: 'kabak', name: 'Kabak', price: 5, category: 'Sebze' },
    { id: 'domates', name: 'Domates', price: 5, category: 'Sebze' },
    { id: 'jalepano', name: 'Jalepano', price: 5, category: 'Sebze' },
    { id: 'zeytin', name: 'Zeytin', price: 5, category: 'Sebze' },
    { id: 'sarımsak', name: 'Sarımsak', price: 5, category: 'Baharat' },
    { id: 'fume', name: 'Füme Et', price: 5, category: 'Et' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form validation
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

  // Handle input changes
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

  // Handle topping selection
  const handleToppingChange = (toppingId, isSelected) => {
    const updatedItems = isSelected
      ? [...formData.selectedItems, toppingId]
      : formData.selectedItems.filter(item => item !== toppingId);
    
    handleInputChange('selectedItems', updatedItems);
  };

  // Calculate total price
  const calculateTotal = () => {
    const basePrice = parseFloat(product.price);
    const sizePrice = sizes.find(s => s.id === formData.selectedSize)?.basePrice || 0;
    const ingredientPrice = formData.selectedItems.length * 5;
    return (basePrice + sizePrice + ingredientPrice) * formData.quantity;
  };

  // Handle like functionality
  const handleLikeClick = (e) => {
    e.stopPropagation();
    
    // Get button position for heart explosion
    const rect = e.currentTarget.getBoundingClientRect();
    setHeartPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    
    if (newLikedState) {
      setShowHeartExplosion(true);
    }
  };

  // Handle add to cart
  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    setAddedProduct({...product, customizations: formData});
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      addToCart({...product, customizations: formData});
      setIsAddingToCart(false);
      setShowSuccessPopup(true);
    } catch (error) {
      console.error('Sepete ekleme hatası:', error);
      setIsAddingToCart(false);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
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

      const response = await fetch('https://reqres.in/api/pizza', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Sipariş gönderilemedi');
      }

      const result = await response.json();
      
      navigate('/success', {
        state: {
          selectedItems: formData.selectedItems,
          selectedSize: formData.selectedSize,
          selectedDough: formData.selectedDough,
          total: calculateTotal(),
          orderData: result,
          product: product
        }
      });
      
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      {/* Hero Section with Breadcrumb */}
      <div className="pt-28 pb-12 bg-gradient-to-r from-red-50 via-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-gray-600 mb-8">
            <button 
              onClick={() => navigate('/')} 
              className="hover:text-red-500 font-medium transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Ana Sayfa
            </button>
            <span className="mx-2">/</span>
            <button 
              onClick={() => navigate('/products')} 
              className="hover:text-red-500 transition-colors"
            >
              Ürünler
            </button>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-semibold">Sipariş Oluştur</span>
          </nav>

          {/* Product Header */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Lezzetini Özelleştir
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Size özel pizza deneyimi için detayları seçin ve mükemmel tatı oluşturun
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side - Product Image & Info */}
          <div className="space-y-8">
            {/* Product Image Card */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="relative h-96 bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Like Button */}
                <button
                  onClick={handleLikeClick}
                  className={`absolute top-6 right-6 z-10 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 backdrop-blur-sm border-2 ${
                    isLiked 
                      ? 'bg-red-500 border-red-500 text-white shadow-xl animate-heartBeat' 
                      : 'bg-white/90 border-white/60 text-gray-400 hover:text-red-500 hover:border-red-200 shadow-lg'
                  }`}
                >
                  <svg className="w-7 h-7" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Product Image */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="p-8 space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 text-red-700 text-sm font-medium rounded-full border border-red-100">
                      {product.category.split(',')[0].trim()}
                    </span>
                    <div className="text-3xl font-bold text-red-600">{calculateTotal().toFixed(2)}₺</div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {product.name}
                  </h2>
                  
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {product.description}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{product.comments}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Customization Form */}
          <div className="space-y-8">
            {/* Customer Name */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                İletişim Bilgileri
              </h3>
              
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  İsim Soyisim *
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  placeholder="Adınızı ve soyadınızı girin"
                  className={`w-full p-4 border-2 rounded-2xl bg-gray-50 focus:bg-white transition-all duration-300 text-lg ${
                    errors.customerName ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-red-400'
                  } focus:outline-none focus:ring-4 focus:ring-red-100`}
                />
                {errors.customerName && (
                  <p className="text-red-500 text-sm mt-2 bg-red-50 p-3 rounded-xl border border-red-200">{errors.customerName}</p>
                )}
              </div>
            </div>

            {/* Size & Dough Selection */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                Boyut & Hamur Seçimi
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Size Selection */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">Pizza Boyutu</label>
                  <div className="space-y-3">
                    {sizes.map((size) => (
                      <div key={size.id}>
                        <label className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                          formData.selectedSize === size.id
                            ? 'border-red-400 bg-red-50 shadow-lg'
                            : 'border-gray-200 hover:border-red-200 hover:bg-red-25'
                        }`}>
                          <input
                            type="radio"
                            name="size"
                            value={size.id}
                            checked={formData.selectedSize === size.id}
                            onChange={(e) => handleInputChange('selectedSize', e.target.value)}
                            className="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-900">{size.name}</span>
                              <span className="text-sm text-gray-500">{size.description}</span>
                            </div>
                            {size.basePrice > 0 && (
                              <span className="text-sm text-red-600 font-medium">+{size.basePrice}₺</span>
                            )}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.selectedSize && (
                    <p className="text-red-500 text-sm mt-2">{errors.selectedSize}</p>
                  )}
                </div>

                {/* Dough Selection */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">Hamur Tipi</label>
                  <select
                    value={formData.selectedDough}
                    onChange={(e) => handleInputChange('selectedDough', e.target.value)}
                    className={`w-full p-4 border-2 rounded-2xl bg-gray-50 focus:bg-white transition-all duration-300 ${
                      errors.selectedDough ? 'border-red-500' : 'border-gray-200 focus:border-red-400'
                    } focus:outline-none focus:ring-4 focus:ring-red-100`}
                  >
                    <option value="">Hamur kalınlığı seçin</option>
                    {doughTypes.map((dough) => (
                      <option key={dough.id} value={dough.id}>
                        {dough.name} - {dough.description}
                      </option>
                    ))}
                  </select>
                  {errors.selectedDough && (
                    <p className="text-red-500 text-sm mt-2">{errors.selectedDough}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Toppings Selection */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                Ek Malzemeler
              </h3>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-2">En az 4, en fazla 10 malzeme seçebilirsiniz. (Her biri 5₺)</p>
                <div className="flex items-center gap-4">
                  <div className={`px-4 py-2 rounded-xl font-semibold ${
                    formData.selectedItems.length < 4
                      ? 'bg-red-100 text-red-700'
                      : formData.selectedItems.length > 10
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    Seçilen: {formData.selectedItems.length}/10
                  </div>
                  <div className="text-sm text-gray-500">
                    Toplam: {formData.selectedItems.length * 5}₺
                  </div>
                </div>
              </div>

              {/* Group toppings by category */}
              {['Et', 'Sebze', 'Baharat'].map((category) => (
                <div key={category} className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    {category}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {toppings
                      .filter(topping => topping.category === category)
                      .map((topping) => (
                        <label
                          key={topping.id}
                          className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                            formData.selectedItems.includes(topping.id)
                              ? 'border-green-400 bg-green-50 shadow-md'
                              : formData.selectedItems.length >= 10
                              ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                              : 'border-gray-200 hover:border-green-300 hover:bg-green-25'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.selectedItems.includes(topping.id)}
                            onChange={(e) => handleToppingChange(topping.id, e.target.checked)}
                            disabled={!formData.selectedItems.includes(topping.id) && formData.selectedItems.length >= 10}
                            className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                          />
                          <div className="ml-3 flex-1">
                            <div className="font-semibold text-gray-900 text-sm">{topping.name}</div>
                            <div className="text-xs text-green-600 font-medium">+{topping.price}₺</div>
                          </div>
                        </label>
                      ))}
                  </div>
                </div>
              ))}

              {errors.selectedItems && (
                <p className="text-red-500 text-sm mt-4 bg-red-50 p-3 rounded-xl border border-red-200">{errors.selectedItems}</p>
              )}
            </div>

            {/* Special Notes */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" />
                  </svg>
                </div>
                Özel Not
              </h3>
              
              <textarea
                value={formData.specialNotes}
                onChange={(e) => handleInputChange('specialNotes', e.target.value)}
                placeholder="Siparişiniz için özel notunuz (opsiyonel)..."
                rows={4}
                className="w-full p-4 border-2 border-gray-200 rounded-2xl bg-gray-50 focus:bg-white transition-all duration-300 text-lg focus:outline-none focus:ring-4 focus:ring-purple-100"
              ></textarea>  
            </div>
            {/* Quantity & Actions */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <label className="text-lg font-semibold text-gray-700">Adet</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 p-3 border-2 border-gray-200 rounded-2xl bg-gray-50 focus:bg-white transition-all duration-300 text-lg focus:outline-none focus:ring-4 focus:ring-red-100 text-center"
                  />
                </div>
                <div className="text-2xl font-bold text-red-600">
                  Toplam: {calculateTotal().toFixed(2)}₺
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <button 
                  onClick={handleAddToCart}
                  disabled={!isFormValid() || isAddingToCart}
                  className={`w-full md:w-1/2 flex-1 py-4 bg-red-600 text-white font-semibold rounded-2xl shadow-lg hover:bg-red-700 transition-colors duration-300 flex items-center justify-center gap-3 ${
                    (!isFormValid() || isAddingToCart) && 'bg-red-300 cursor-not-allowed hover:bg-red-300'
                  }`}
                >
                  {isAddingToCart ? (
                    <>
                      <CartSpinner />
                      Sepete Ekleniyor...
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Sepete Ekle
                    </>
                  )}
                </button>
                <button 
                  onClick={handleSubmit}  
                  disabled={!isFormValid() || isLoading}
                  className={`w-full md:w-1/2 flex-1 py-4 bg-gray-200 text-gray-700 font-semibold rounded-2xl shadow-lg hover:bg-gray-300 transition-colors duration-300 ${
                    (!isFormValid() || isLoading) && 'bg-gray-100 cursor-not-allowed hover:bg-gray-100'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <CartSpinner />
                      Sipariş Gönderiliyor...
                    </>
                  ) : (
                    'Siparişi Tamamla'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showHeartExplosion && (
        <HeartExplosion 
          x={heartPosition.x} 
          y={heartPosition.y} 
          onAnimationEnd={() => setShowHeartExplosion(false)} 
        />
      )}
      {showSuccessPopup && addedProduct && (
        <CartSuccessPopup 
          product={addedProduct} 
          onClose={() => setShowSuccessPopup(false)} 
        />
      )}
    </div>
  );
};

export default ProductSection;