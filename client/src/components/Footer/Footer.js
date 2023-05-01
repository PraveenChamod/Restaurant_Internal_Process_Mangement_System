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
} from "./FooterStyles";
import fb from "../../Images/facebook.png";
import inster from "../../Images/instagram.png";
import youtube from "../../Images/youtube.png";
import whatsapp from "../../Images/whatsapp.png";
const Footer = () => {
  return (
    <div>
      <Box>
        <Container>
          <Row>
            <Column>
              <Heading>ORDER NOW</Heading>
              <FooterLink href="#">PIZZAS</FooterLink>
              <FooterLink href="#">FRIED RICE</FooterLink>
              <FooterLink href="#">BEVARAGES</FooterLink>
              <FooterLink href="#">TODAY SPECIAL</FooterLink>
            </Column>
            <Column>
              <Heading>ABOUT</Heading>
              <FooterLink href="#">CAREERS</FooterLink>
              <FooterLink href="#">ABOUT US</FooterLink>
              <FooterLink href="#">FEEDBACK</FooterLink>
              <FooterLink href="#">HOTLINE</FooterLink>
            </Column>
            <Column>
              <Heading>POLICY</Heading>
              <FooterLink href="#">TERMS & CONDITIONS</FooterLink>
              <FooterLink href="#">PRIVACY POLICY</FooterLink>
            </Column>
            <Column>
              <Heading>MY ACCOUNT</Heading>
              <FooterLink href="#">VIEW CART</FooterLink>
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
      </Box>
    </div>
  );
};
export default Footer;
