import React from 'react';
import TopContactBar from './components/TopContactBar';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import WarningPage from './components/WarningPage';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import LegalBand from './components/LegalBand';
import SEOFooter from './components/SEOFooter';
import { InsuranceProvider } from './contexts/InsuranceContext';

function App() {
  return (
    <InsuranceProvider>
      <div className="min-h-screen bg-white font-['Poppins']">
        <TopContactBar />
        <Header />
        <Hero />
        <WhyUs />
        <WarningPage />
        <Testimonials />
        <FAQ />
        <SEOFooter />
        <LegalBand />
      </div>
    </InsuranceProvider>
  );
}

export default App;