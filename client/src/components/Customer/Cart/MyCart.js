import React from "react";
import { Link } from "react-router-dom";
import {
  Page,
  Div,
  Div1,
  Div2,
  Div3,
  Div4,
  Div5,
  Div6,
  Div7,
  Div8,
  H1,
  H2,
  H3,
  H4,H5,
  RegularButton,
  Img,
  Img1,
} from "./CartElement";
import { Header } from "../../shared/SharedElements/SharedElements";

import icon from "../../../Images/OrderIcon/noodles.png";

const MyCart = () => {
  return (
    <Page>
      <Div>
        <Img
          alt="person"
          src={require("../../../Images/Services/person.jpg")}
        />
        <H1>Aravinda Chathuranga</H1>
      </Div>
      <Div1>
        <Header>MY CART</Header>
      </Div1>
      <Div2>
        <Div3>
          <Div5>
            <Div7><Img1 src={icon}></Img1></Div7>
            <Div8>
              <H4>Chicken Noodles</H4>
              <H5>Regular</H5>
              <H5>1</H5>
              <H5>Rs.1000</H5>
            </Div8> 
          </Div5>
          <Div5>
            <Div7><Img1 src={icon}></Img1></Div7>
            <Div8>
              <H4>Chicken Noodles</H4>
              <H5>Regular</H5>
              <H5>1</H5>
              <H5>Rs.1000</H5>
            </Div8> 
          </Div5>
        </Div3>
        <Div4>
          <Div6>
            <H2>Item</H2><H2>Chicken Noodles</H2>
          </Div6>
        </Div4>
      </Div2>
    </Page>
  );
};

export default MyCart;
