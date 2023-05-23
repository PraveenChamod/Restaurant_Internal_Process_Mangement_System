import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Footer/Footer";
import NavBar from "../Navbar/Navbar";
const WithNavAndFooter = (props) => {
  return (
    <>
      <NavBar ScrollToTop={props.ScrollToTop} />
      <Outlet />
      <Footer ScrollToTop={props.ScrollToTop}/>
    </>
  );
};

export default WithNavAndFooter;
