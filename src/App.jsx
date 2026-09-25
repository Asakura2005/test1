import React, { useState } from 'react';
import HeaderNav from './components/HeaderNav';
import CroHero from './components/CroHero';
import FlavorTrio from './components/FlavorTrio';
import RiskAndTrust from './components/RiskAndTrust';
import ComboPricing from './components/ComboPricing';
import OrderFormLead from './components/OrderFormLead';
import LifestyleOccasions from './components/LifestyleOccasions';
import SocialProofAndFaq from './components/SocialProofAndFaq';
import FinalOrderCta from './components/FinalOrderCta';
import EnterpriseFooter from './components/EnterpriseFooter';
import StickyBottomBar from './components/StickyBottomBar';
import OrderModal from './components/OrderModal';

export default function App() {
  const [selectedCombo, setSelectedCombo] = useState('combo_da_nhan_cach');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectCombo = (comboId) => {
    setSelectedCombo(comboId);
  };

  const handleOpenModal = (comboId) => {
    if (comboId) setSelectedCombo(comboId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col font-sans antialiased selection:bg-secondary-container selection:text-white">
      {/* 1. Header & Live Flash Sale Bar */}
      <HeaderNav />

      {/* Main Funnel Flow */}
      <main className="flex-grow w-full">
        {/* 2. Hero Section */}
        <CroHero onSelectPlan={handleSelectCombo} />

        {/* 3. 3 Signature Flavors & Collection Banner */}
        <FlavorTrio onSelectPlan={handleSelectCombo} />

        {/* 4. Risk Reversal & Safety Credentials */}
        <RiskAndTrust />

        {/* 5. Combo Pricing & 30s Fast Order Form */}
        <ComboPricing
          selectedCombo={selectedCombo}
          onSelectCombo={handleSelectCombo}
          onOpenOrderModal={handleOpenModal}
        />
        <OrderFormLead
          selectedCombo={selectedCombo}
          onSelectCombo={handleSelectCombo}
        />

        {/* 6. Lifestyle Occasions & 4-Step Guide */}
        <LifestyleOccasions />

        {/* 7. Social Proof Reviews & FAQ */}
        <SocialProofAndFaq />

        {/* 8. Final Conversion CTA Order Form */}
        <FinalOrderCta
          selectedCombo={selectedCombo}
          onSelectCombo={handleSelectCombo}
        />
      </main>

      {/* 9. Enterprise Footer */}
      <EnterpriseFooter />

      {/* 10. Sticky Bottom CTA Bar */}
      <StickyBottomBar
        selectedCombo={selectedCombo}
        onSelectPlan={handleSelectCombo}
        onOpenOrderModal={handleOpenModal}
      />

      {/* 11. Quick Order Popup Modal */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedCombo={selectedCombo}
        onSelectCombo={handleSelectCombo}
      />
    </div>
  );
}
