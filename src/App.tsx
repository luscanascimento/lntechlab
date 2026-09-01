import React, { useState, useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import { Preloader } from './components/sections/Preloader';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { SolutionsSection } from './components/sections/SolutionsSection';
import { TechStackSection } from './components/sections/TechStackSection';
import { MethodologySection } from './components/sections/MethodologySection';
import { PortfolioSection } from './components/sections/PortfolioSection';
import { FAQSection } from './components/sections/FAQSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { WhatsAppFloat } from './components/layout/WhatsAppFloat';
import { CookieConsent } from './components/layout/CookieConsent';
import { FormSuccessModal } from './components/forms/FormSuccessModal';
import { PrivacyModal } from './components/forms/PrivacyModal';
import { trackEvent } from './lib/analytics';

export function App() {
  const [isBooted, setIsBooted] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [successModalData, setSuccessModalData] = useState<{
    name: string;
    company: string;
    projectType: string;
    email: string;
  } | null>(null);

  // Initialize smooth scroll
  useLenis();

  useEffect(() => {
    trackEvent('page_view', { page_title: 'LNTechLab Home' });
  }, []);

  const handlePreloaderComplete = () => {
    setIsBooted(true);
  };

  const handleFormSuccess = (data: {
    name: string;
    company: string;
    projectType: string;
    email: string;
  }) => {
    setSuccessModalData(data);
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalData(null);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-[#0052FF]/30 selection:text-[#00FFFF] relative">
      {/* Boot Preloader */}
      {!isBooted && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main App Content */}
      <div className={isBooted ? 'opacity-100 transition-opacity duration-700' : 'opacity-0'}>
        {/* Navigation */}
        <Navbar />

        {/* Sections */}
        <main>
          <HeroSection />
          <SolutionsSection />
          <TechStackSection />
          <MethodologySection />
          <PortfolioSection />
          <FAQSection />
          <ContactSection
            onFormSuccess={handleFormSuccess}
            onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
          />
        </main>

        {/* Footer */}
        <Footer onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)} />

        {/* Floating Widgets */}
        <WhatsAppFloat />
        <CookieConsent onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)} />

        {/* Modals */}
        <FormSuccessModal
          isOpen={successModalData !== null}
          onClose={handleCloseSuccessModal}
          leadData={successModalData}
        />

        <PrivacyModal
          isOpen={isPrivacyModalOpen}
          onClose={() => setIsPrivacyModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;
