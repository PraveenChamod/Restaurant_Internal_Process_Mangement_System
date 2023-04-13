import React from 'react'
import MenuCover from '../components/Cover/MenuCover/MenuCover'
import Deals from "../components/Deals/Deals"
import MenuPage from '../components/Menu/Menu'

export const Menu = (props) => {
  return (
    <>
      <MenuCover login={props.login}/>
      <MenuPage MenuItems1 = {props.MenuItems}/>
    </>
  )
}
