import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import OrderOption from '../components/OrderOption';
import Hamur from '../components/Hamur';
import OrderButton from '../components/OrderButton';

// Main Component
const ProductSection = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  
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


  const { id } = useParams(); // URL'den ürün ID'sini al

  // Ürün verilerini yükle
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/data/product.json');
        if (!response.ok) {
          throw new Error('Product data not found');
        }
        const data = await response.json();
        
        // Eğer ID varsa o ürünü bul, yoksa ilk ürünü al
        let selectedProduct;
        if (id) {
          selectedProduct = data.products.find(p => p.id === parseInt(id));
          if (!selectedProduct) {
            throw new Error('Product not found');
          }
        } else {
          // ID yoksa ilk ürünü varsayılan olarak göster
          selectedProduct = data.products[0];
        }
        
        setProduct(selectedProduct);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
        // Hata durumunda varsayılan ürün
        setProduct({
          id: 1,
          name: "Position Absolute Acı Pizza",
          category: "SPICY, PIZZA",
          rating: "4.9",
          comments: "(200)",
          price: "15.00",
          image: "/images/pizzaresim.png"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
    if (!product) return 0;
    const basePrice = parseFloat(product.price);
    const ingredientPrice = formData.selectedItems.length * 5;
    return (basePrice + ingredientPrice) * formData.quantity;
  };

const handleSubmit = async () => {
    if (!validateForm()) {
      console.log('❌ Form validation hatası');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    setIsLoading(true);
    
    try {
      // Pizza'yı sepete ekle
      const pizzaOrder = {
        id: `PIZZA-${Date.now()}`,
        name: 'Position Absolute Acı Pizza',
        price: calculateTotal(),
        quantity: formData.quantity,
        image: '/images/pizzaresim.png',
        customizations: {
          customerName: formData.customerName,
          size: formData.selectedSize,
          dough: formData.selectedDough,
          ingredients: formData.selectedItems,
          specialNotes: formData.specialNotes
        }
      };

      // Sepete ekle
      addToCart(pizzaOrder);
      
      // Console'a özel pizza detaylarını yaz
      console.log('🍕 Pizza siparişi oluşturuldu:');
      console.log('👤 Müşteri:', formData.customerName);
      console.log('📏 Boyut:', formData.selectedSize);
      console.log('🥖 Hamur:', formData.selectedDough);
      console.log('🧄 Malzemeler:', formData.selectedItems);
      console.log('📝 Özel Not:', formData.specialNotes || 'Yok');
      console.log('🔢 Adet:', formData.quantity);
      console.log('💰 Toplam:', calculateTotal().toFixed(2) + '₺');
      
      // Başarı mesajı
      alert('Pizza sepete eklendi! Sepetinizi kontrol edebilirsiniz.');
      
    } catch (error) {
      console.error('❌ Pizza siparişi hatası:', error);
      alert('Sipariş eklenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">Ürün yüklenirken hata oluştu</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

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
              <span>{product?.rating || '4.9'}</span>
              <svg width="20" height="20" fill="#FFD600" viewBox="0 0 20 20"><polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,19.02 10,15.27 4.18,19.02 6,12.14 0.49,7.64 7.41,7.36"/></svg>
              <span>{product?.comments || '(200)'}</span>
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
            src={product?.image || "/images/pizzaresim.png"} 
            alt={product?.name || "Pizza"} 
            onError={(e) => {
              e.target.src = "/images/pizzaresim.png";
            }}
          />
          <h1 className="text-3xl font-bold text-[#292929] text-center lg:text-left">
            {product?.name || "Position Absolute Acı Pizza"}
          </h1>
          <div className="text-center lg:text-left">
            <p className="text-sm font-medium text-gray-500 mb-2">
              {product?.category || "SPICY, PIZZA"}
            </p>
            <p className="font-normal text-base text-[#5F5F5F] max-w-lg">
              Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir.
            </p>
          </div>
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
            totalPrice={parseFloat(product?.price || 15) + formData.selectedItems.length * 5}
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