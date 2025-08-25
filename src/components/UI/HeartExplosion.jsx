import React, { useEffect, useState } from 'react';

const HeartExplosion = ({ isVisible, onComplete, position }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (isVisible) {
      // Create multiple hearts for explosion effect
      const newHearts = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        angle: (i * 360) / 8, // Distribute hearts in a circle
        delay: i * 100, // Stagger the animation
        size: Math.random() * 10 + 15, // Random sizes
        duration: Math.random() * 0.5 + 1, // Random durations
      }));
      
      setHearts(newHearts);

      // Clean up after animation
      const timer = setTimeout(() => {
        setHearts([]);
        onComplete && onComplete();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible || hearts.length === 0) return null;

  return (
    <div 
      className="fixed pointer-events-none z-50"
      style={{
        left: position.x - 20,
        top: position.y - 20,
      }}
    >
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-heartExplode"
          style={{
            '--angle': `${heart.angle}deg`,
            '--size': `${heart.size}px`,
            '--duration': `${heart.duration}s`,
            animationDelay: `${heart.delay}ms`,
            fontSize: `${heart.size}px`,
          }}
        >
          ❤️
        </div>
      ))}

      <style>{`
        @keyframes heartExplode {
          0% {
            transform: translate(0, 0) rotate(var(--angle)) scale(0);
            opacity: 1;
          }
          50% {
            opacity: 1;
            transform: translate(60px, 0) rotate(var(--angle)) scale(1);
          }
          100% {
            transform: translate(120px, 0) rotate(var(--angle)) scale(0);
            opacity: 0;
          }
        }
        
        .animate-heartExplode {
          animation: heartExplode var(--duration) cubic-bezier(0.4, 0, 0.6, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default HeartExplosion;