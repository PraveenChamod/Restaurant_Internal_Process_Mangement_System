import React from 'react'
import AboutUs from '../components/AboutUs/AboutUs'
import ContactUs from '../components/ContactUs/ContactUs'
import Cover from '../components/Cover/Cover'
import Deals from '../components/Deals/Deals'
import Services from '../components/Services/Services'
import Testimonials from '../components/Testimonial/Testimonial'


export const Home = () => {
  return (
    <div>
        {/* <h1>Home</h1> */}
        <Cover/>
        <Deals/>
        <AboutUs/>
        <Services/>
        <Testimonials/>
        <ContactUs/>
    </div>
  )
}