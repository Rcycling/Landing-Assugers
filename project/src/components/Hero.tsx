import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToForm = () => {
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative h-[60vh] md:h-[65vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-[20s] ease-out"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")',
          transform: isVisible ? 'scale(1.05)' : 'scale(1)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      
      {/* Content */}
      <div className={`relative z-10 text-center px-4 max-w-4xl mx-auto transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {/* Main Headline */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Besoin d'une assurance pour<br />
          <span className="text-[#83191d]">conducteur résilié ou sinistré</span> ?
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          Obtenez un devis personnalisé en 3 minutes — réponse instantanée.
        </p>
        
        {/* Tagline */}
        <p className="text-lg md:text-xl text-[#83191d] font-semibold mb-12 italic">
          « On assure là où les autres refusent. »
        </p>
        
        {/* CTA Button */}
        <button
          onClick={scrollToForm}
          data-gtag="cta-quote"
          className="bg-[#16a34a] hover:bg-[#15803d] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
        >
          Commencer mon devis
        </button>
      </div>
    </section>
  );
};

export default Hero;