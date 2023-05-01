import styled from "styled-components";
import img from "../../Images/restoLogodark.png";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  NavActive,
  Links,
  Ul,
  Li,
  Span,
  Logo,
  Nav,
} from "./NavBarElements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const NavBar = (props) => {
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
      {navbar ? (
        <NavActive data-aos={"fade-down"}>
          <Links>
            <NavLink to="./" onClick={props.ScrollToTop}>
              <Logo src={img} alt="" />
            </NavLink>
          </Links>
          <Links>
            <Ul>
              <Li className="li">
                <Link to="Cover" spy={true} offset={-100} smooth={true}>
                  Home<Span className="Ho"></Span>
                </Link>
              </Li>
              <Li className="li">
                <Link to="Menu" spy={true} offset={-100} smooth={true}>
                  Menu<Span className="Ho"></Span>
                </Link>
              </Li>
              <Li className="li">
                <Link to="AboutUs" spy={true} offset={-100} smooth={true}>
                  About Us<Span className="Ho"></Span>
                </Link>
              </Li>
              <Li className="li">
                <Link to="Services" spy={true} offset={-100} smooth={true}>
                  Services<Span className="Ho"></Span>
                </Link>
              </Li>
              <Li className="li">
                <Link to="ContactUs" spy={true} offset={-100} smooth={true}>
                  Contact Us<Span className="Ho"></Span>
                </Link>
              </Li>
              {/* <Li className="li" onClick={ScrollToTop}><Link to=" ">Contact Us<Span className="Ho"></Span></Link></Li> */}
            </Ul>
          </Links>
        </NavActive>
      ) : (
        <Nav>
          <Links>
            <NavLink to="./" onClick={props.ScrollToTop}>
              <Logo src={img} alt="" />{" "}
            </NavLink>
          </Links>
          <Links>
            <Ul>
              <Li className="li">
                <Link to="Cover" spy={true} offset={-100} smooth={true}>
                  Home<Span className="Ho"></Span>
                </Link>
              </Li>
              <Li className="li">
                <Link to="Menu" spy={true} offset={-100} smooth={true}>
                  Menu<Span className="Ho"></Span>
                </Link>
              </Li>
              <Li className="li">
                <Link to="AboutUs" spy={true} offset={-100} smooth={true}>
                  About Us<Span className="Ho"></Span>
                </Link>
              </Li>
              <Li className="li">
                <Link to="Services" spy={true} offset={-100} smooth={true}>
                  Services<Span className="Ho"></Span>
                </Link>
              </Li>
              <Li className="li">
                <Link to="ContactUs" spy={true} offset={-100} smooth={true}>
                  Contact Us<Span className="Ho"></Span>
                </Link>
              </Li>
              {/* <Li className="li" onClick={ScrollToTop}><Link to=" ">Contact Us<Span className="Ho"></Span></Link></Li> */}
            </Ul>
          </Links>
        </Nav>
      )}
    </Navbar>
  );
};

export default NavBar;
