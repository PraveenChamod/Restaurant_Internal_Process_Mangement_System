import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../shared/Footer'
import Navbar from '../shared/Navbar'
const WithNavAndFooter = () => {
  return (
      <>
          <Navbar />
          <Outlet />
          <Footer/>
          
    </>
  )
}

export default WithNavAndFooter