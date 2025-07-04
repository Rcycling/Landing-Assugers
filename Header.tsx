import React from 'react';

const Header = () => {
  const scrollToForm = () => {
    const form = document.getElementById('quote-form');
    if (form) {
      const yOffset = -80; // offset for sticky header
      const y = form.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white shadow-sm py-3 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 min-h-[54px] md:min-h-[60px]">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="logo-assugeris.jpeg" 
              alt="Assugeris - Assureur spécialiste depuis 2006"
              className="h-8 md:h-10 w-auto"
            />
          </div>
          
          {/* CTAs */}
<div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
  <a
    href="https://www.assugeris-espace-assurances.fr/formulaire-express.html"
    data-gtag="cta-quote"
    className="bg-[#E53935] hover:bg-[#43A047] text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base text-center"
    target="_blank"          /* garde ta landing ouverte ; enlève si tu veux charger dans la même page */
    rel="noopener noreferrer"
  >
    Commencer mon devis
  </a>
            <a
              href="https://www.assugeris-espace-assurances.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#E53935] hover:bg-[#43A047] text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
            >
              Plus d'informations
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;