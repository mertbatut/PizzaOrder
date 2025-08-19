import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      badge: "PURCHASE TODAY, JUST $65",
      title: "SPECIAL OFFER",
      subtitle: "CHEESE BURGER",
      description: "Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing know.",
      discount: "50",
      image: "/images/burgerresim.png",
      buttonText: "ORDER NOW"
    },
    {
      id: 2,
      badge: "LIMITED TIME OFFER",
      title: "PIZZA SPECIAL",
      subtitle: "MARGHERITA PIZZA",
      description: "Handcrafted with fresh mozzarella, basil, and our signature tomato sauce. Experience authentic Italian flavors in every bite.",
      discount: "30",
      image: "/images/pizzaresim.png",
      buttonText: "ORDER NOW"
    },
    {
      id: 3,
      badge: "CHEF'S SPECIAL",
      title: "GOURMET DELIGHT",
      subtitle: "TAVUK BURGER",
      description: "Our master chef's creation combining premium ingredients with innovative cooking techniques for an unforgettable experience.",
      discount: "25",
      image: "/images/tavukburger.png",
      buttonText: "ORDER NOW"
    }
  ];

  // Auto slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/background.png" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/80 via-red-500/60 to-red-700/80"></div>
      </div>

      {/* Decorative elements overlay */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-yellow-400/30 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/10 rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-yellow-400/20 rounded-full"></div>
      </div>

      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out z-20 ${
            index === currentSlide 
              ? 'opacity-100 translate-x-0' 
              : index < currentSlide 
                ? 'opacity-0 -translate-x-full' 
                : 'opacity-0 translate-x-full'
          }`}
        >
          <div className="container mx-auto px-4 h-full flex items-center pt-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
              
              {/* Left Content */}
              <div className="text-white space-y-8 animate-slideInLeft">
                {/* Badge */}
                <div className="inline-block animate-fadeInUp delay-200">
                  <span className="px-6 py-3 border-2 border-white/80 rounded-full text-sm font-semibold tracking-wider backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300">
                    {slide.badge}
                  </span>
                </div>

                {/* Main Title */}
                <div className="space-y-3 animate-fadeInUp delay-400">
                  <h1 className="text-4xl lg:text-7xl font-bold leading-tight drop-shadow-2xl">
                    {slide.title}
                  </h1>
                  <h2 className="text-3xl lg:text-6xl font-bold text-yellow-300 drop-shadow-xl">
                    {slide.subtitle}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-lg lg:text-xl text-white/90 max-w-lg leading-relaxed animate-fadeInUp delay-600 drop-shadow-lg">
                  {slide.description}
                </p>

                {/* CTA Button */}
                <div className="animate-fadeInUp delay-800">
                  <button
                    className="group relative bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-red-500/50 overflow-hidden"
                    onClick={() => navigate('/PizzaMenu')}
                  >
                    <span className="relative z-10">{slide.buttonText}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative animate-slideInRight flex justify-center">
                {/* Discount Badge */}
                <div className="absolute -top-12 -right-8 lg:-right-12 z-30 animate-bounce delay-1000">
                  <div className="relative">
                    {/* Circular badge background */}
                    <div className="w-28 h-28 lg:w-36 lg:h-36 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white relative overflow-hidden">
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent rotate-45 transform -translate-x-full animate-shine"></div>
                      
                      <div className="text-center relative z-10">
                        <div className="text-2xl lg:text-3xl font-black text-red-700 leading-none">
                          {slide.discount}%
                        </div>
                        <div className="text-sm lg:text-base font-bold text-red-700 italic">
                          Off
                        </div>
                      </div>
                    </div>
                    
                    {/* Radiating rings */}
                    <div className="absolute inset-0 border-2 border-yellow-300 rounded-full animate-ping opacity-30"></div>
                    <div className="absolute inset-0 border border-yellow-200 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Food Image Container */}
                <div className="relative">
                  {/* Main food image */}
                  <div className="w-80 h-80 lg:w-[500px] lg:h-[500px] relative">
                    <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-8 border-white/20 backdrop-blur-sm">
                      <img
                        src={slide.image}
                        alt={slide.subtitle}
                        className="w-full h-full object-cover animate-float hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          console.log('Image failed to load:', slide.image);
                          // Fallback to a default image if local image fails
                          e.target.src = ``;
                        }}
                      />
                    </div>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400/20 via-transparent to-red-400/20 animate-pulse"></div>
                  </div>
                  
                  {/* Floating decorative elements */}
                  <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full animate-bounce delay-300 shadow-xl"></div>
                  <div className="absolute -top-8 -right-4 w-8 h-8 bg-white rounded-full animate-pulse delay-700 shadow-lg"></div>
                  <div className="absolute top-1/2 -left-12 w-6 h-6 bg-yellow-400 rounded-full animate-bounce delay-500 shadow-lg"></div>
                  <div className="absolute bottom-1/4 -right-8 w-4 h-4 bg-white rounded-full animate-pulse delay-900"></div>
                  
                  {/* Decorative lines */}
                  <div className="absolute top-20 -left-16 w-20 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse delay-400"></div>
                  <div className="absolute bottom-20 -right-16 w-16 h-0.5 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent animate-pulse delay-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 z-50 group border border-white/20"
      >
        <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 z-50 group border border-white/20"
      >
        <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-50">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? 'bg-yellow-400 w-10 h-3 shadow-lg' 
                : 'bg-white/50 hover:bg-white/70 w-3 h-3'
            }`}
          />
        ))}
      </div>

      {/* Settings Toggle */}
      <button className="absolute bottom-8 right-8 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 z-50 border border-white/20 group">
        <svg className="w-6 h-6 transform group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>

  <style>{`
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
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        @keyframes shine {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(200%) rotate(45deg);
          }
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 1s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 1s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-shine {
          animation: shine 2s infinite;
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
      `}</style>
    </div>
  );
};

export default HeroCarousel;