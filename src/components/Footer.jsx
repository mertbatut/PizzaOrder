import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById('footer');
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => observer.disconnect();
  }, []);

  const socialIcons = [
    { name: 'Facebook', icon: '📘', link: '#' },
    { name: 'Twitter', icon: '🐦', link: '#' },
    { name: 'Instagram', icon: '📷', link: '#' },
    { name: 'YouTube', icon: '📺', link: '#' },
    { name: 'LinkedIn', icon: '💼', link: '#' }
  ];

  const menuItems = [
    'Terminal Pizza',
    '5 Kişilik Hackathlon Pizza',
    'useEffect Tavuklu Pizza',
    'Beyaz Console Frosty',
    'Testler Geçti Mutlu Burger',
    'Position Absolute Acı Burger'
  ];

  const instagramImages = [
    'https://picsum.photos/150/150?random=1',
    'https://picsum.photos/150/150?random=2',
    'https://picsum.photos/150/150?random=3',
    'https://picsum.photos/150/150?random=4',
    'https://picsum.photos/150/150?random=5',
    'https://picsum.photos/150/150?random=6'
  ];

  return (
    <>
      <footer 
        id="footer" 
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Main Footer Content */}
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Info */}
            <div className={`space-y-6 ${isVisible ? 'animate-slideInLeft' : 'opacity-0'}`}>
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                  Teknolojik Yemekler
                </h2>
                <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                  En lezzetli yemekleri teknolojik çözümlerle sunuyoruz. 
                  Kodladığımız kadar lezzetli!
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 group hover:text-red-400 transition-colors duration-300">
                  <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center group-hover:bg-red-500/30 transition-colors duration-300">
                    <span className="text-lg">📞</span>
                  </div>
                  <span className="text-sm lg:text-base">+90 216 123 45 67</span>
                </div>

                <div className="flex items-center space-x-3 group hover:text-red-400 transition-colors duration-300">
                  <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center group-hover:bg-red-500/30 transition-colors duration-300">
                    <span className="text-lg">📧</span>
                  </div>
                  <span className="text-sm lg:text-base">aciktim@teknolojikyemekler.com</span>
                </div>

                <div className="flex items-center space-x-3 group hover:text-red-400 transition-colors duration-300">
                  <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center group-hover:bg-red-500/30 transition-colors duration-300">
                    <span className="text-lg">📍</span>
                  </div>
                  <span className="text-sm lg:text-base">341 Londonderry Road, Istanbul Türkiye</span>
                </div>
              </div>
            </div>

            {/* Hot Menu */}
            <div className={`space-y-6 ${isVisible ? 'animate-slideInUp delay-200' : 'opacity-0'}`}>
              <h3 className="text-2xl font-bold text-white mb-6 relative">
                Hot Menu
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <button className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 text-left text-sm lg:text-base group flex items-center space-x-2">
                      <span className="w-1 h-1 bg-red-500 rounded-full group-hover:bg-yellow-400 transition-colors duration-300"></span>
                      <span>{item}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instagram */}
            <div className={`space-y-6 ${isVisible ? 'animate-slideInUp delay-400' : 'opacity-0'}`}>
              <h3 className="text-2xl font-bold text-white mb-6 relative">
                Instagram
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {instagramImages.map((image, index) => (
                  <div 
                    key={index} 
                    className="aspect-square group cursor-pointer overflow-hidden rounded-xl relative"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <img 
                      src={image} 
                      alt={`Instagram ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/150x150/ef4444/ffffff?text=Img${index + 1}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-2xl">📷</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter & Social */}
            <div className={`space-y-6 ${isVisible ? 'animate-slideInRight delay-600' : 'opacity-0'}`}>
              <h3 className="text-2xl font-bold text-white mb-6 relative">
                Bize Katılın
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
              </h3>
              
              {/* Newsletter */}
              <div className="space-y-4">
                <p className="text-gray-300 text-sm lg:text-base">
                  Özel teklifler ve yeni menüler için e-bültenimize abone olun!
                </p>
                <div className="flex space-x-2">
                  <input 
                    type="email" 
                    placeholder="E-mail adresiniz"
                    className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-300"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <span className="text-lg">📧</span>
                  </button>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Sosyal Medya</h4>
                <div className="flex space-x-3">
                  {socialIcons.map((social, index) => (
                    <button
                      key={social.name}
                      className="w-12 h-12 bg-gray-800/50 hover:bg-gradient-to-br hover:from-red-500 hover:to-yellow-500 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-6 group border border-gray-600 hover:border-transparent"
                      title={social.name}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                        {social.icon}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 bg-black/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className={`flex items-center space-x-4 ${isVisible ? 'animate-fadeInLeft delay-800' : 'opacity-0'}`}>
                <span className="text-gray-400 text-sm">© 2023 Teknolojik Yemekler</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-400 text-sm">Tüm hakları saklıdır</span>
              </div>
              
              <div className={`flex items-center space-x-6 ${isVisible ? 'animate-fadeInRight delay-800' : 'opacity-0'}`}>
                <button className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Gizlilik Politikası
                </button>
                <button className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Kullanım Şartları
                </button>
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <span>Made with</span>
                  <span className="text-red-500 animate-pulse">❤️</span>
                  <span>by Developers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.6s ease-out forwards;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.6s ease-out forwards;
        }

        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-800 { animation-delay: 0.8s; }
      `}</style>
    </>
  );
}