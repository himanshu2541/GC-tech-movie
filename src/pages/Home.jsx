import React from 'react'
import {  Hero, MovieSections } from '../components'
import CardsTemplateExample from '../components/hero/CardsTemplateExample';

const Home = () => {
  return (
    <div>
      <Hero />
      <div className='mt-24 px-8'>
        <MovieSections title='Top Movies'/>
        <MovieSections title='Top Shows'/>
        <MovieSections title='Most Liked'/>
      </div>
    </div>
  );
}

export default Home