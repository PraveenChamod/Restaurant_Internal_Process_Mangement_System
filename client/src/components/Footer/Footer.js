import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
  H2,
  P,
  Sec,
  Icon,
  Image,
  HR,
  Span
} from "./FooterStyles";
import fb from "../../Images/facebook.png";
import inster from "../../Images/instagram.png";
import youtube from "../../Images/youtube.png";
import whatsapp from "../../Images/whatsapp.png";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
const Footer = (props) => {
  return (
    <div>
      <Box>
        <Container>
          <Row>
            <Column>
              <Heading>ORDER NOW</Heading>
              <FooterLink>
              <NavLink to = "Menu"  onClick={props.ScrollToTop} className="btn">PIZZAS</NavLink>
                </FooterLink>
              <FooterLink>
              <NavLink to = "Menu" onClick={props.ScrollToTop} className="btn">FRIED RICE</NavLink>
              </FooterLink>
              <FooterLink>
                <NavLink to = "Menu" onClick={props.ScrollToTop} className="btn">BEVARAGES</NavLink>
                </FooterLink>
              <FooterLink>
              <Link to="Menu" spy={true} offset={-100} smooth={true}>
                TODAY SPECIAL<Span className="Ho"></Span>
              </Link>
                </FooterLink>
            </Column>
            <Column>
              <Heading>ABOUT</Heading>
              <FooterLink>
                <NavLink to = "#" className="btn">CAREERS</NavLink>
              </FooterLink>
              <FooterLink>
              <Link to="AboutUs" spy={true} offset={-100} smooth={true}>
                  ABOUT US<Span className="Ho"></Span>
              </Link>
              </FooterLink>
              <FooterLink>
                <NavLink to = "/" className="btn">FEEDBACK</NavLink>
              </FooterLink>
              <FooterLink>
                <Link to="ContactUs" spy={true} offset={-100} smooth={true}>
                HOTLINE<Span className="Ho"></Span>
              </Link>  
              </FooterLink>
            </Column>
            <Column>
              <Heading>POLICY</Heading>
              <FooterLink href="#">TERMS & CONDITIONS</FooterLink>
              <FooterLink href="#">PRIVACY POLICY</FooterLink>
            </Column>
            <Column>
              <Heading>MY ACCOUNT</Heading>
              <FooterLink>
                <NavLink to = "/login"  onClick={props.ScrollToTop} className="btn">VIEW CART</NavLink>
              </FooterLink>
            </Column>
          </Row>
          {/* <Row>
		<Column>
			<Heading>Social Media</Heading>
			<FooterLink href="#">
			<i className="fab fa-facebook-f">
				<span style={{ marginLeft: "10px" }}>
				Facebook
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-instagram">
				<span style={{ marginLeft: "10px" }}>
				Instagram
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-twitter">
				<span style={{ marginLeft: "10px" }}>
				Twitter
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-youtube">
				<span style={{ marginLeft: "10px" }}>
				Youtube
				</span>
			</i>
			</FooterLink>
		</Column>
		</Row> */}
        </Container>
        <Container>
          <H2>FIND US ON SOCIAL MEDIA</H2>
          <Sec>
            <Icon>
              <Image src={fb} />
            </Icon>
            <Icon>
              <Image src={inster} />
            </Icon>
            <Icon>
              <Image src={youtube} />
            </Icon>
            <Icon>
              <Image src={whatsapp} />
            </Icon>
          </Sec>
        </Container>
        <HR />
        <P>
          @2022 resto. All rights reserved.The resto name,logos and related
          marks are trademarks of resto Inc.
        </P>
        <P style={{cursor:"pointer"}} onClick={props.ScrollToTop}>
          <NavLink to="/developers" className="btn">Development Team</NavLink>
        </P>
      </Box>
    </div>
  );
};
export default Footer;
