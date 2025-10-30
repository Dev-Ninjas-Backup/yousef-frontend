import React from 'react'
import Banner from './_components/Banner/Banner';
import CarBrands from './_components/CarBrands/CarBrands';
import SearchGarages from './_components/SearchGarages/SearchGarages';
import AutomotiveSolutions from './_components/AutomotiveSolutions/AutomotiveSolutions';
import FeaturedGarages from './_components/FeaturedGarages/FeaturedGarages';
import HowItWorks from './_components/HowItWorks/HowItWorks';
import Faq from './_components/Faq/Faq';
import SpareParts from './_components/SpareParts/SpareParts';
import TestimonialsSection from './_components/Testimonials/Testimonials';
import FeaturedPromotions from './_components/FeaturedPromotions/FeaturedPromotions';

const HomePage = () => {
  return (
    <div className='space-y-5'>
    <Banner />
    <CarBrands />
    <SearchGarages />
    <AutomotiveSolutions />
    <SpareParts />
    <FeaturedPromotions />
    <HowItWorks />
    <FeaturedGarages />
    <TestimonialsSection />
    <Faq/>
    </div>
  )
}

export default HomePage