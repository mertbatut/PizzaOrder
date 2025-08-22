import React from 'react';
import Header from '../components/Header';
import HeroCarousel from '../components/HeroCarousel';
import ProductList from '../components/Product/ProductList';
import PromoCard from '../components/PromoCard';
import Footer from '../components/Footer';

export default function Home() {
  const navigateToPizzaMenu = () => {
    console.log('Navigate to Pizza Menu');
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

          {/* Ürün Kategorileri - Filtreleme için */}
          <div className='flex flex-wrap gap-3 lg:gap-4 justify-center py-6 lg:py-8 mb-8 lg:mb-12'>
            {[
              { name: 'Ramen', img: '', color: 'bg-orange-100 hover:bg-orange-200 text-orange-700' },
              { name: 'Pizza', img: '', color: 'bg-red-100 hover:bg-red-200 text-red-700' },
              { name: 'Burger', img: '', color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700' },
              { name: 'Patates', img: '', color: 'bg-amber-100 hover:bg-amber-200 text-amber-700' },
              { name: 'Fast Food', img: '', color: 'bg-green-100 hover:bg-green-200 text-green-700' },
              { name: 'İçecekler', img: '', color: 'bg-blue-100 hover:bg-blue-200 text-blue-700' }
            ].map((item, index) => (
              <button
                key={item.name}
                onClick={navigateToPizzaMenu}
                className={`px-4 lg:px-6 py-2 lg:py-3 rounded-full border-2 border-transparent hover:border-current flex items-center shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 gap-2 animate-fadeInUp ${item.color}`}
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                {item.img && (
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-6 h-6 lg:w-8 lg:h-8 rounded-full object-cover"
                  />
                )}
                <span className="font-medium text-sm lg:text-base">{item.name}</span>
              </button>
            ))}
          </div>


          <ProductList />
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
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 1s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideInRight {
          animation: slideInRight 1s ease-out forwards;
          opacity: 0;
        }
        
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }
        .delay-900 { animation-delay: 0.9s; }
        .delay-1000 { animation-delay: 1s; }
        .delay-1100 { animation-delay: 1.1s; }
        .delay-1200 { animation-delay: 1.2s; }
        .delay-1300 { animation-delay: 1.3s; }
      `}</style>
    </div>
  );
}