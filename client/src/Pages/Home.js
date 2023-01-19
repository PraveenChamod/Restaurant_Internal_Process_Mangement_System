import React from 'react'
import AboutUs from '../components/AboutUs/AboutUs'
import ContactUs from '../components/ContactUs/ContactUs'
import Cover from '../components/Cover/Cover'
import Deals from '../components/Deals/Deals'
import Footer from '../components/Footer/Footer'

export const Home = () => {
  return (
    <div>
        {/* <h1>Home</h1> */}
        <Cover/>
        <Deals/>
        <AboutUs/>
        <ContactUs/>
        <Footer/>
    </div>
  )
}