import React from 'react'
import { Outlet } from 'react-router-dom'
import InsideNav from '../shared/InsideNav/InsideNav'
const WithoutNavAndFooter = (props) => {
  return (
    <>
        <InsideNav ScrollToTop={props.ScrollToTop}/>    
        <Outlet/>
    </>
  )
}

export default WithoutNavAndFooter