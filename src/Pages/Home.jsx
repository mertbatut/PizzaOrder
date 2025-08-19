import React from 'react';
import Header from '../components/Header';
import HeroCarousel from '../components/HeroCarousel';
import ProductList from '../components/Product/ProductList';
import PromoCard from '../components/PromoCard';

<ProductList />


// Mock Footer component
const Footer = () => (
  <footer className="bg-gray-900 text-white py-16 animate-fadeInUp delay-600">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">Teknolojik Yemekler</h3>
          <p className="text-gray-400">En lezzetli yemekleri teknolojik çözümlerle sunuyoruz.</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Hızlı Linkler</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Ana Sayfa</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Menü</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Hakkımızda</a></li>
            <li><a href="#" className="hover:text-white transition-colors">İletişim</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">İletişim</h4>
          <div className="space-y-2 text-gray-400">
            <p>📞 +90 216 123 45 67</p>
            <p>📧 aciktim@teknolojikyemekler.com</p>
            <p>📍 İstanbul, Türkiye</p>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-4">Sosyal Medya</h4>
          <div className="flex space-x-4">
            <button className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
              <span>f</span>
            </button>
            <button className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
              <span>t</span>
            </button>
            <button className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
              <span>i</span>
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2023 Teknolojik Yemekler. Tüm hakları saklıdır.</p>
      </div>
    </div>
  </footer>
);

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
              <li key={item.name} className='flex items-center gap-3 hover:scale-105 transition-transform duration-200 animate-fadeInUp' style={{animationDelay: `${0.3 + index * 0.1}s`}}>
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
      
     <PromoCard/>
      
      {/* En Çok Satan Bölümü */}
      <div className='CokSatan bg-white py-16 animate-fadeInUp delay-500'>
        <div className="container mx-auto px-4">
          <div className='text-center mb-12 animate-fadeInUp delay-600'>
            <p className='text-2xl lg:text-3xl font-normal text-red-600 mb-2'>
              en çok paketlenen menüler
            </p>
            <p className='text-3xl lg:text-4xl font-bold text-gray-900'>
              Acıktıran Kodlara Doyuran Lezzetler
            </p>
          </div>
          
          <div className='flex flex-wrap gap-4 lg:gap-6 justify-center py-8 mb-12'>
            {[
              { name: 'Ramen', img: '' },
              { name: 'Pizza', img: '' },
              { name: 'Burger', img: '' },
              { name: 'Patates', img: '' },
              { name: 'Fast Food', img: '' },
              { name: 'İçecekler', img: '' }
            ].map((item, index) => (
              <button 
                key={item.name}
                onClick={navigateToPizzaMenu} 
                className='w-[160px] lg:w-[180px] h-[60px] lg:h-[70px] rounded-full bg-white border-2 border-gray-200 hover:border-red-400 flex justify-center items-center shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 gap-3 animate-fadeInUp'
                style={{animationDelay: `${0.7 + index * 0.1}s`}}
              >
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover"
                />
                <span className="font-medium text-sm lg:text-base text-gray-700">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Ürün Listesi */}
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