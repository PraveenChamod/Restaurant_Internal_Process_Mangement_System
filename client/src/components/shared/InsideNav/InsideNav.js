import styled from "styled-components";
import img from "../../../Images/restoLogodark.png";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import { Navbar, Links, Logo, Nav } from "./InsideNavElement";
import { useState } from "react";
const InsideNav = (props) => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);
  return (
    <Navbar>
      <Nav>
        <Links>
          <NavLink to="./" onClick={props.ScrollToTop}>
            <Logo src={img} alt="" />{" "}
          </NavLink>
        </Links>
      </Nav>
    </Navbar>
  );
};

export default InsideNav;
