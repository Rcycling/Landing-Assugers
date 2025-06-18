import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useInsurance } from '../contexts/InsuranceContext';
import ContactStep from './form/ContactStep';
import SubscriberStep from './form/SubscriberStep';
import LicenseHistoryStep from './form/LicenseHistoryStep';
import AccidentsStep from './form/AccidentsStep';
import NeedStep from './form/NeedStep';

const QuoteForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { selectedProduct, formData } = useInsurance();

  const steps = [
    { id: 1, name: 'Contact', component: ContactStep },
    { id: 2, name: 'Souscripteur', component: SubscriberStep },
    { id: 3, name: 'Permis / Infractions', component: LicenseHistoryStep },
    { id: 4, name: 'Sinistres', component: AccidentsStep },
    { id: 5, name: 'Besoin & Envoi', component: NeedStep }
  ];

  const maxStep = steps.length;

  const handleNext = () => {
    if (currentStep < maxStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Prepare form data for submission
      const submissionData = {
        selectedProduct,
        ...formData,
        submittedAt: new Date().toISOString()
      };

      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/xdkogqpz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'assugeris83200@gmail.com',
          subject: `Nouvelle demande de devis - ${selectedProduct}`,
          message: `
Nouvelle demande de devis d'assurance

PRODUIT SÉLECTIONNÉ: ${selectedProduct}

=== CONTACT ===
Prénom: ${formData.contact?.firstName || ''}
Nom: ${formData.contact?.lastName || ''}
Email: ${formData.contact?.email || ''}
Téléphone: ${formData.contact?.phone || ''}
Message: ${formData.contact?.message || ''}

=== SOUSCRIPTEUR ===
Date de naissance: ${formData.subscriber?.birthDate || ''}
Profession: ${formData.subscriber?.profession || ''}
Situation matrimoniale: ${formData.subscriber?.maritalStatus || ''}
Code postal: ${formData.subscriber?.postalCode || ''}
Ville: ${formData.subscriber?.city || ''}

=== PERMIS & HISTORIQUE ===
${selectedProduct === 'car' ? `
AUTO:
Date permis Auto: ${formData.license?.autoLicenseDate || ''}
Déjà assuré en Auto: ${formData.license?.autoInsured || ''}
Bonus Auto: ${formData.license?.autoBonus || ''}
Date résiliation Auto: ${formData.license?.autoTerminationDate || ''}
Motif résiliation Auto: ${formData.license?.autoTerminationReason || ''}
` : ''}
${selectedProduct === 'motorbike' || selectedProduct === 'scooter' ? `
MOTO/SCOOTER:
Date permis Moto: ${formData.license?.motoLicenseDate || ''}
Déjà assuré en Moto: ${formData.license?.motoInsured || ''}
Assuré ≥ 2 ans sur moto < 400 cc: ${formData.license?.motoUnder400Experience || ''}
Bonus Moto: ${formData.license?.motoBonus || ''}
Date résiliation Moto: ${formData.license?.motoTerminationDate || ''}
Motif résiliation Moto: ${formData.license?.motoTerminationReason || ''}
Véhicule bridé: ${formData.license?.vehicleBridged || ''}
` : ''}

SANCTIONS:
Sanction alcool/stupéfiants/points: ${formData.sanctions?.alcoholDrugsSanction || ''}
Date dernière infraction: ${formData.sanctions?.lastInfractionDate || ''}
Taux air: ${formData.sanctions?.airLevel || ''}
Taux sang: ${formData.sanctions?.bloodLevel || ''}
Contrôle lors accident: ${formData.sanctions?.accidentControl || ''}
Suspension de permis: ${formData.sanctions?.licenseSuspension || ''}
Durée suspension: ${formData.sanctions?.suspensionDuration || ''}
Annulation de permis: ${formData.sanctions?.licenseCancellation || ''}
Motif annulation: ${formData.sanctions?.cancellationReason || ''}
Date permis N°1: ${formData.sanctions?.license1Date || ''}
Date permis N°2: ${formData.sanctions?.license2Date || ''}
Jugement: ${formData.sanctions?.judgment || ''}
Délit de fuite/refus: ${formData.sanctions?.hitAndRun || ''}
Autres condamnations: ${formData.sanctions?.otherConvictions || ''}
Détails autres condamnations: ${formData.sanctions?.otherConvictionsDetails || ''}
Stupéfiants - Date: ${formData.sanctions?.drugsLastInfractionDate || ''}
Substances: ${formData.sanctions?.substances?.join(', ') || ''}
Taux stupéfiants: ${formData.sanctions?.drugsLevel || ''}
Autres infractions: ${formData.sanctions?.otherInfractions || ''}

=== SINISTRES ===
${formData.accidents?.list?.map((accident: any, index: number) => `
Sinistre ${index + 1}:
Date: ${accident.date || ''}
Nature: ${accident.nature || ''}
% responsabilité: ${accident.responsibility || ''}
Détail: ${accident.details || ''}
`).join('') || ''}

=== VÉHICULE & BESOIN ===
Immatriculation: ${formData.need?.vehicleLicensePlate || ''}
Marque: ${formData.need?.vehicleBrand || ''}
Modèle: ${formData.need?.vehicleModel || ''}
${selectedProduct === 'car' ? 'Finition' : 'Cylindrée'}: ${formData.need?.vehicleFinition || ''}
1ʳᵉ MEC: ${formData.need?.vehicleFirstRegistration || ''}
${selectedProduct === 'car' ? `Puissance fiscale: ${formData.need?.vehicleFiscalPower || ''}` : ''}
Carburant: ${formData.need?.vehicleFuel || ''}
Garanties: ${formData.need?.guarantees?.join(', ') || ''}
Besoin d'assurance: ${formData.need?.insuranceNeed || ''}
Consentement RGPD: ${formData.need?.gdprConsent || ''}

Soumis le: ${new Date().toLocaleString('fr-FR')}
          `,
          _replyto: formData.contact?.email || '',
          _subject: `Nouvelle demande de devis - ${selectedProduct}`,
          ...submissionData
        })
      });

      if (response.ok) {
        // Trigger conversion event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'conversion', {
            send_to: 'lead_submitted'
          });
        }
        setIsSubmitted(true);
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      alert('Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou nous contacter directement au 04 68 05 75 45.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentStepComponent = () => {
    const step = steps.find(s => s.id === currentStep);
    return step ? step.component : ContactStep;
  };

  const CurrentStepComponent = getCurrentStepComponent();

  if (isSubmitted) {
    return (
      <section id="quote-form" className="py-16 bg-gradient-to-br from-[#83191d] to-[#a02328]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-2xl">
            <CheckCircle className="w-16 h-16 text-[#16a34a] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Demande envoyée avec succès !
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Nos experts vous contactent sous 24h avec votre devis personnalisé.
            </p>
            <div className="bg-[#16a34a] text-white px-6 py-3 rounded-full inline-block">
              <span className="font-semibold">Réponse garantie sous 24h</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote-form" className="py-16 bg-gradient-to-br from-[#83191d] to-[#a02328]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-8 py-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Obtenez votre devis en 3 minutes
            </h2>
            
            {/* Progress Bar */}
            <div className="flex items-center space-x-2 mb-4 overflow-x-auto">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex items-center flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep >= step.id 
                        ? 'bg-[#16a34a] text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`ml-2 text-xs md:text-sm font-medium ${
                      currentStep >= step.id ? 'text-[#16a34a]' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 min-w-[20px] ${
                      currentStep > step.id ? 'bg-[#16a34a]' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          {/* Form Content */}
          <div className="p-8">
            <CurrentStepComponent />
            
            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Précédent</span>
              </button>
              
              {currentStep < maxStep ? (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 bg-[#16a34a] hover:bg-[#15803d] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span>Suivant</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  data-gtag="lead-submitted"
                  className={`flex items-center space-x-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#16a34a] hover:bg-[#15803d] text-white'
                  }`}
                >
                  <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}</span>
                  <CheckCircle className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;