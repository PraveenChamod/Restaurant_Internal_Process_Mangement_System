import React from 'react'
import ContactUs from '../components/ContactUs/ContactUs'
import Cover from '../components/Cover/Cover'
import Deals from '../components/Deals/Deals'

export const Home = () => {
  return (
    <div>
        {/* <h1>Home</h1> */}
        <Cover/>
        <Deals/>
        <ContactUs/>
    </div>
  )
}