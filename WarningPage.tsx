import React from 'react';

const WarningPage = () => {
  return (
    <section id="quote-form" className="py-16 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
          Demandez votre Devis !
        </h2>
        <p className="text-lg text-gray-700 mb-6">
         En deux-trois clics, obtiens ton devis Assugeris 100 % détaillé et trouve la couverture qui colle à tes projets.
        </p>
        <a
          href="https://www.assugeris-espace-assurances.fr/formulaire-express.html"
          className="bg-red-600 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Accéder au formulaire
        </a>
      </div>
    </section>
  );
};

export default WarningPage;
