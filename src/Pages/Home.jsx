// Home.jsx - Artık ProductsPage ile aynı davranış
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import HeroCarousel from '../components/HeroCarousel';
import ProductList from '../components/Product/ProductList';
import ProductQuickViewModal from '../components/UI/ProductQuickViewModal'; // Modal eklendi!
import PromoCard from '../components/PromoCard';
import Footer from '../components/Footer';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Quick View Modal State - ProductsPage ile AYNI
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  
  const navigate = useNavigate();

  // Ürünleri yükle
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/product.json');
        if (response.ok) {
          const data = await response.json();
          const productsData = data.products || data;
          // Sadece popüler ürünleri göster (ilk 6 tane)
          setProducts(productsData.slice(0, 6));
        }
      } catch (error) {
        console.error('Ürünler yüklenemedi:', error);
        // Fallback mock data
        setProducts([
          {
            id: 1,
            name: "Terminal Pizza",
            category: "CHEESE, PIZZA",
            rating: "4.9",
            comments: "(200)",
            price: "12.00",
            image: "/images/pizzaresim.png"
          },
          {
            id: 2,
            name: "useEffect Tavuklu Burger",
            category: "CREAMY, BURGER",
            rating: "4.7",
            comments: "(150)",
            price: "8.00",
            originalPrice: "10.00",
            image: "/images/tavukburger.png"
          },
          {
            id: 3,
            name: "Hackathlon Burger",
            category: "BBQ, MEAT",
            rating: "4.8",
            comments: "(120)",
            price: "14.00",
            image: "/images/burgerresim.png"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Navigation Handler - ProductsPage ile AYNI
  const handleNavigation = (path) => {
    if (path === '/') {
      navigate('/');
    } else if (path.includes('/product/')) {
      navigate('/PizzaMenu');
    } else {
      navigate(path);
    }
  };

  // Quick View Handlers - ProductsPage ile AYNI
  const handleQuickViewOpen = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleQuickViewClose = () => {
    setIsQuickViewOpen(false);
    setTimeout(() => setQuickViewProduct(null), 200);
    document.body.style.overflow = '';
  };

  const handleQuickViewOrder = (product) => {
    setIsQuickViewOpen(false);
    setTimeout(() => setQuickViewProduct(null), 200);
    document.body.style.overflow = '';
    navigate(`/product/${product.id}`);
  };

  const navigateToPizzaMenu = () => {
    navigate('/PizzaMenu');
  };

  const navigateToProducts = () => {
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Component */}
      <Header />

      {/* Hero Carousel Component */}
      <HeroCarousel />

      {/* İkon Menü Bölümü */}
      <div className='IconSection bg-white py-12 shadow-lg animate-fadeInUp delay-200'>
        <div className="container mx-auto px-4">
          <ul className='flex justify-center flex-wrap gap-6 md:gap-12'>
            {[
              { name: 'Yeni Kore', icon: '🍜' },
              { name: 'Pizza', icon: '🍕' },
              { name: 'Burger', icon: '🍔' },
              { name: 'Kızartmalar', icon: '🍟' },
              { name: 'Fast Food', icon: '🌭' },
              { name: 'Gazlı İçecek', icon: '🥤' }
            ].map((item, index) => (
              <li key={item.name} className='flex items-center gap-3 hover:scale-105 transition-transform duration-200 animate-fadeInUp' style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                <button
                  onClick={navigateToPizzaMenu}
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium text-sm md:text-base"
                >
                  {item.name}
                </button>
                <span className="text-2xl">{item.icon}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Promo Cards */}
      <PromoCard />

      {/* Products Section */}
      <div className='ProductSection bg-white py-12 lg:py-16 animate-fadeInUp delay-500'>
        <div className="container mx-auto px-4">
          <div className='text-center mb-8 lg:mb-12 animate-fadeInUp delay-600'>
            <p className='text-2xl lg:text-3xl font-normal text-red-600 mb-2'>
              en çok paketlenen menüler
            </p>
            <p className='text-3xl lg:text-4xl font-bold text-gray-900'>
              Acıktıran Kodlara Doyuran Lezzetler
            </p>
          </div>

          {/* Ürün Kategorileri */}
          <div className='flex flex-wrap gap-3 lg:gap-4 justify-center py-6 lg:py-8 mb-8 lg:mb-12'>
            {[
              { name: 'Ramen', color: 'bg-orange-100 hover:bg-orange-200 text-orange-700' },
              { name: 'Pizza', color: 'bg-red-100 hover:bg-red-200 text-red-700' },
              { name: 'Burger', color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700' },
              { name: 'Patates', color: 'bg-amber-100 hover:bg-amber-200 text-amber-700' },
              { name: 'Fast Food', color: 'bg-green-100 hover:bg-green-200 text-green-700' },
              { name: 'İçecekler', color: 'bg-blue-100 hover:bg-blue-200 text-blue-700' }
            ].map((item, index) => (
              <button
                key={item.name}
                onClick={navigateToPizzaMenu}
                className={`px-4 lg:px-6 py-2 lg:py-3 rounded-full border-2 border-transparent hover:border-current flex items-center shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 gap-2 animate-fadeInUp ${item.color}`}
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                <span className="font-medium text-sm lg:text-base">{item.name}</span>
              </button>
            ))}
          </div>

          {/* ProductList Component - ProductsPage ile AYNI interface */}
          <ProductList
            products={products}
            viewMode="grid"
            onNavigate={handleNavigation} // AYNI
            onQuickView={handleQuickViewOpen} // AYNI - Modal artık çalışacak!
            loading={loading}
            emptyMessage="Popüler ürünler yüklenemedi"
          />

          {/* Quick View Modal - ProductsPage ile AYNI */}
          <ProductQuickViewModal
            product={quickViewProduct}
            open={isQuickViewOpen}
            onClose={handleQuickViewClose}
            onOrder={handleQuickViewOrder}
          />

          {/* Tüm Ürünleri Görüntüle Butonu */}
          <div className="text-center mt-8">
            <button 
              onClick={navigateToProducts}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Tüm Ürünleri Gör
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
      `}</style>
    </div>
  );
}