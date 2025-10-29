import React from 'react'
import Banner from './_components/Banner/Banner';
import CarBrands from './_components/CarBrands/CarBrands';
import SearchGarages from './_components/SearchGarages/SearchGarages';
import AutomotiveSolutions from './_components/AutomotiveSolutions/AutomotiveSolutions';
import FeaturedGarages from './_components/FeaturedGarages/FeaturedGarages';
import Faq from './_components/Faq/Faq';

const HomePage = () => {
  return (
    <div className='space-y-5'>
    <Banner />
    <CarBrands />
    <SearchGarages />
    <AutomotiveSolutions />
    <FeaturedGarages />
    <Faq/>
    </div>
  )
}

export default HomePage