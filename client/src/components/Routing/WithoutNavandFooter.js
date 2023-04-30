import React from "react";
import { Outlet } from "react-router-dom";
import InsideNav from "../shared/InsideNav/InsideNav";
import styled from "styled-components";
const WithoutNavAndFooter = (props) => {
  const Div = styled.div`
    height:100vh;
  `
  return (
    <Div>
      <InsideNav ScrollToTop={props.ScrollToTop} />
      <Outlet />
    </Div>
  );
};

export default WithoutNavAndFooter;
