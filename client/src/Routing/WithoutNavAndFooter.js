import React from 'react'
import { Outlet } from 'react-router-dom'
const WithoutNavAndFooter = () => {
  return (
      <>
          <Outlet/>
    </>
  )
}

export default WithoutNavAndFooter