import React from 'react';

const WarningPage = () => {
  return (
    <section id="quote-form" className="py-16 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
          Formulaire indisponible
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Notre formulaire de devis est en cours de maintenance. Vous pouvez
          néanmoins accéder au formulaire complet en cliquant sur le bouton
          ci-dessous.
        </p>
        <a
          href="https://www.assugeris-espace-assurances.fr/"
          className="bg-red-600 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Accéder au formulaire
        </a>
      </div>
    </section>
  );
};

export default WarningPage;
