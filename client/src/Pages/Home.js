import React from 'react'
import ContactUs from '../components/ContactUs/ContactUs'
import Cover from '../components/Cover/Cover'
import Deals from '../components/Deals/Deals'
import { About } from './About'
import { Services } from './Services'

export const Home = () => {
  return (
    <div>
        <Cover/>
        <Deals/>
        {/* <About/>
        <Services/> */}
        <ContactUs/>
    </div>
  )
}
