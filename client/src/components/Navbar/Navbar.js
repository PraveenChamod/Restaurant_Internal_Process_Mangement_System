import styled from "styled-components";
import img from "../../Images/restoLogodark.png";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavActive,
  Links,
  Ul,
  Li,
  Span,
  Logo,
  Nav
} from './NavBarElements'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const NavBar = () => {
  const [navbar,setNavbar] = useState(false);

    const changeBackground = ()=>{
        if(window.scrollY >= 100){
            setNavbar(true);
        }else{
            setNavbar(false);
        }
    }

    window.addEventListener('scroll',changeBackground);
  return ( 
    <Navbar>
      {
        navbar ? 
        <NavActive data-aos={"fade-down"}>
                    <Links>
                        <Logo src={img} alt="" /> 
                    </Links>
                    <Links>
                        <Ul>
                            <Li className="li" ><Link to="./">Home<Span className="Ho"></Span></Link></Li>
                            <Li className="li" ><Link to="./Menu">Menu<Span className="Ho"></Span></Link></Li>
                            <Li className="li" ><Link to="./Services">Services<Span className="Ho"></Span></Link></Li>
                            <Li className="li" ><Link to="./ContactUs">Contact Us<Span className="Ho"></Span></Link></Li>
                            <Li className="li" ><Link to="./AboutUs">About Us<Span className="Ho"></Span></Link></Li>
                            <Li className="li" ><Link to="./aboutUs"><FontAwesomeIcon icon= {faCartShopping}/>Cart<Span className="Ho"></Span></Link></Li>
                            {/* <Li className="li" onClick={ScrollToTop}><Link to=" ">Contact Us<Span className="Ho"></Span></Link></Li> */}
                        </Ul>
                    </Links>
      </NavActive> : 
      <Nav>
            <Links>
                <Logo src={img} alt="" /> 
            </Links>
            <Links>
                <Ul>
                    <Li className="li" ><Link to="./">Home<Span className="Ho"></Span></Link></Li>
                    <Li className="li" ><Link to="./Menu">Menu<Span className="Ho"></Span></Link></Li>
                    <Li className="li" ><Link to="./Services">Services<Span className="Ho"></Span></Link></Li>
                    <Li className="li" ><Link to="./ContactUs">Contact Us<Span className="Ho"></Span></Link></Li>
                    <Li className="li" ><Link to="./AboutUs">About Us<Span className="Ho"></Span></Link></Li>
                    <Li className="li" ><Link to="./Cart"><FontAwesomeIcon icon= {faCartShopping}/>Cart<Span className="Ho"></Span></Link></Li>
                    {/* <Li className="li" onClick={ScrollToTop}><Link to=" ">Contact Us<Span className="Ho"></Span></Link></Li> */}
                </Ul>
            </Links>
      </Nav>
      }
    </Navbar>
 );
}
 
export default NavBar;