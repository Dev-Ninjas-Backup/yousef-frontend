import React from 'react';
import DownloadHero from './_components/DownloadHero/DownloadHero';
import Features from './_components/Features/Features';
import HowItWorks from './_components/HowItWorks/HowItWorks';
import TrustedPartner from './_components/TrustedPartner/TrustedPartner';

const DownloadAppPage = () => {
  return (
    <div>
      <DownloadHero />
      <Features/>
      <HowItWorks />
      <TrustedPartner />
    </div>
  );
};

export default DownloadAppPage;
