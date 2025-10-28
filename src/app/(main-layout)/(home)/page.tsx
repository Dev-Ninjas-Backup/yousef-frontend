import React from 'react'
import Banner from './_components/Banner/Banner';
import CarBrands from './_components/CarBrands/CarBrands';
import SearchGarages from './_components/SearchGarages/SearchGarages';

const HomePage = () => {
  return (
    <div className='space-y-5'>
    <Banner />
    <CarBrands />
    <SearchGarages />
    </div>
  )
}

export default HomePage