import React, { useRef, useEffect, useState } from "react";


const PromoCard = () => {
  const navigateToPizzaMenu = () => {
    console.log("Navigate to Pizza Menu");
  };

  // Intersection Observer states & refs
  const leftCardRef = useRef(null);
  const rightTopCardRef = useRef(null);
  const rightBottomCardRef = useRef(null);
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightTopVisible, setRightTopVisible] = useState(false);
  const [rightBottomVisible, setRightBottomVisible] = useState(false);

  useEffect(() => {
    const observerOptions = { threshold: 0.2 };
    const leftObserver = new window.IntersectionObserver(
      ([entry]) => setLeftVisible(entry.isIntersecting),
      observerOptions
    );
    const rightTopObserver = new window.IntersectionObserver(
      ([entry]) => setRightTopVisible(entry.isIntersecting),
      observerOptions
    );
    const rightBottomObserver = new window.IntersectionObserver(
      ([entry]) => setRightBottomVisible(entry.isIntersecting),
      observerOptions
    );
    if (leftCardRef.current) leftObserver.observe(leftCardRef.current);
    if (rightTopCardRef.current) rightTopObserver.observe(rightTopCardRef.current);
    if (rightBottomCardRef.current) rightBottomObserver.observe(rightBottomCardRef.current);
    return () => {
      leftObserver.disconnect();
      rightTopObserver.disconnect();
      rightBottomObserver.disconnect();
    };
  }, []);
  return (
    <>
      <div className="KutuSection py-16 lg:py-24 bg-[#07272c]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 justify-center items-center">
            {/* Sol Büyük Kart */}
            <div
              ref={leftCardRef}
              className={`w-full max-w-[500px] h-[420px] lg:h-[500px] rounded-2xl relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 flex flex-col justify-end ${leftVisible ? "animate-slideInLeft" : "opacity-0"}`}
              style={{backgroundImage: `url('/images/background.png')`, backgroundSize: 'cover', backgroundPosition: 'center'}}
            >
              <div className="absolute top-8 left-8 z-20 space-y-4 max-w-xs">
                <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  MAXICAN<br />PIZZA
                </h2>
              </div>
              {/* Badge */}
              <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30">
                <div className="bg-white text-red-600 text-3xl font-bold rounded-full px-8 py-6 shadow-lg border-4 border-white" style={{fontFamily: 'cursive', transform: 'rotate(-15deg)'}}>
                  50%<br/>Off
                </div>
              </div>
              <img src="/images/pizzaresim.png" alt="Pizza" className="absolute bottom-0 right-0 w-[320px] h-[220px] object-contain z-10" />
              <button onClick={navigateToPizzaMenu} className="absolute left-1/2 -translate-x-1/2 bottom-8 w-48 h-12 rounded-full bg-white flex items-center justify-center text-lg font-semibold text-black hover:bg-gray-100 transition-colors shadow-lg">
                MAKE AN ORDER
              </button>
            </div>
            {/* Sağdaki 2 Kart */}
            <div className="flex flex-col gap-6 w-full max-w-[500px]">
              {/* Burger Kartı */}
              <div
                ref={rightTopCardRef}
                className={`relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center min-h-[200px] h-[200px] lg:h-[220px] ${rightTopVisible ? "animate-slideInRight" : "opacity-0"}`}
                style={{backgroundImage: `url('/images/promobackground2.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center'}}
              >
                {/* Badge */}
                <div className="absolute top-6 left-6 z-20">
                  <div className="bg-white text-black text-xl font-bold rounded-full px-6 py-4 shadow-lg border-4 border-white" style={{fontFamily: 'cursive', transform: 'rotate(-10deg)'}}>
                    Best<br/>Deal
                  </div>
                </div>
                <div className="flex flex-col gap-4 pl-8 z-10 flex-1">
                  <p className="text-3xl font-bold text-white leading-tight drop-shadow-lg">
                    LUGER<br />BURGER
                  </p>
                  <button onClick={navigateToPizzaMenu} className="w-44 h-10 rounded-full bg-red-700 flex items-center justify-center text-base font-semibold text-white hover:bg-red-800 transition-colors">
                    MAKE AN ORDER
                  </button>
                </div>
                <img src="/images/burgerresim.png" alt="Burger" className="w-44 h-full object-contain absolute right-4 bottom-0 z-10" />
              </div>
              {/* Crab Kartı */}
              <div
                ref={rightBottomCardRef}
                className={`relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center min-h-[200px] h-[200px] lg:h-[220px] ${rightBottomVisible ? "animate-fadeInUp" : "opacity-0"}`}
                style={{backgroundImage: `url('/images/promobackground1.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center'}}
              >
                <div className="flex flex-col gap-4 pl-8 z-10 flex-1">
                  <p className="text-3xl font-bold text-white leading-tight drop-shadow-lg">
                    DELICIOUS<br />CRAB
                  </p>
                  <button onClick={navigateToPizzaMenu} className="w-44 h-10 rounded-full bg-[#07272c] flex items-center justify-center text-base font-semibold text-white hover:bg-gray-900 transition-colors">
                    MAKE AN ORDER
                  </button>
                </div>
                <img src="/images/chicken.png" alt="Crab" className="w-44 h-full object-contain absolute right-4 bottom-0 z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideInLeft { animation: slideInLeft 1s cubic-bezier(0.4,0,0.2,1) both; }
        .animate-slideInRight { animation: slideInRight 1s cubic-bezier(0.4,0,0.2,1) both; }
        .animate-fadeInUp { animation: fadeInUp 1.1s cubic-bezier(0.4,0,0.2,1) both; }
      `}</style>
    </>
);
}
export default PromoCard;