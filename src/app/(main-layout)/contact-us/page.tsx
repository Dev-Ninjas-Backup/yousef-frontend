import React from 'react';
import ContactHero from './_components/ContactHero/ContactHero';
import GetInTouch from './_components/GetInTouch/GetInTouch';
import Faq from '../(home)/_components/Faq/Faq';

const ContactUsPage = () => {
  return (
    <div>
      <ContactHero />
      <GetInTouch />
      <Faq />
    </div>
  );
};

export default ContactUsPage;
