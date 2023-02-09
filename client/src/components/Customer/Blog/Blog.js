import React from "react";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import {
  Page,
  Page1,
  Div,
  H2,
  Input,
  Texrarea,
} from "./BlogElement";
import {  RegularButton } from "../../shared/SharedElements/Buttons";
import { Header } from "../../shared/SharedElements/SharedElements";

const Blog = () => {
  return (
    <Page>
      <Page1>
        <Header>SHARE YOUR OPINION WITH US</Header>
        <Div>
          <FormControl sx={{ m: 1, width: "50ch" }} variant="standard">
            <H2>NAME</H2>
            <Input type="text" id="name" name="name" placeholder="JOHNNY ANN"></Input>
            <H2>WRITE A REVIEW</H2>
            <Texrarea id="review" name="review"></Texrarea>
            <H2>RATE US</H2>
          </FormControl>
          <RegularButton>
            <Link to="./login" className="btn">
              SUBMIT
            </Link>
          </RegularButton>
        </Div>
      </Page1>
    </Page>
  );
};

export default Blog;
