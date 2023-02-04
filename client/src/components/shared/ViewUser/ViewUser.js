import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import {
  Page,
  Div,
  Div1,
  Div2,
  Div3,
  H1,
  Searchbar

} from './ViewUserElements';

const ViewUser = () => {

  

  return (
    <Page>
      <H1>USER DETAILS</H1>
      <Div>
        <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
          <Searchbar type="search" placeholder="Enter the User email" />
          <TextField
            id="standard-basic"
            label="Email"
            type="email"
            variant="standard"
          />
          <TextField id="standard-basic" label="User Name" variant="standard" />
          <TextField
            id="standard-basic"
            label="Contact Numberl"
            variant="standard"
          />
          <TextField id="standard-basic" label="Role" variant="standard" />
          <TextField id="standard-basic" label="Gender" variant="standard" />
        </FormControl>
        <Div1>
          <Div2>
            <button className="adduserbtn">
              <Link to="./login" data-aos="fade-left">
                <b>DELETE</b>
              </Link>
            </button>
          </Div2>
          
            <button className="adduserbtn">
              <Link to="./login" data-aos="fade-left">
                <b>UPDATE</b>
              </Link>
            </button>
          
        </Div1>
      </Div>
      <Div3>
        <button className="adduserbtn">
          <Link to="./login" data-aos="fade-left">
            <b>BACK</b>
          </Link>
        </button>
      </Div3>
    </Page>
  );
};

export default ViewUser;
