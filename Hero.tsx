import React, { useEffect, useState } from 'react';
import ProductPicker from './ProductPicker';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="hero" className="relative h-[60vh] md:h-[65vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-[20s] ease-out"
        style={{
          backgroundImage: 'url("banniere-pic.jpg")',
          transform: isVisible ? 'scale(1.05)' : 'scale(1)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-transparent" />
      
      {/* Content */}
      <div
        className={`relative z-10 w-full px-4 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <ProductPicker />
      </div>
    </section>
  );
};

export default Hero;
