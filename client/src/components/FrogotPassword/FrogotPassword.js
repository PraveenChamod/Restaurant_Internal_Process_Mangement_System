import { FormControl, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { FormButton, RegularButton } from "../shared/SharedElements/Buttons";
import { Container, Header } from "../shared/SharedElements/SharedElements";
import { Div, Div1, Div2, Div3} from'./FrogotPasswordElements';
const ForgotPasswordComponent = () => {
  
  return (
    <Container>
      <Header>Forgot Password</Header>
      <Div>
        <Div1>
          <FormControl sx={{ m: 1, width: "35ch" }} variant="standard">
            <TextField id="standard-basic" label="Email" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
            <FormButton>
              <Link to="./login" className="btn">
                Send OTP
              </Link>
            </FormButton>
            <TextField id="standard-basic" label="OTP" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
            <TextField id="standard-basic" label="Re-Enter New Password" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
            <FormButton>
              <Link to="./login" className="btn">
                Reset
              </Link>
            </FormButton>
          </FormControl>
        </Div1>
        <Div2>
          <FormControl sx={{ m: 1, width: "35ch" }} variant="standard">
            <TextField id="standard-basic" label="Enter New Password" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
          </FormControl>
        </Div2> 
      </Div>
      <Div3>
        <RegularButton>
          <Link to="./login" className="btn">
            Back
          </Link>
        </RegularButton>
      </Div3>
    </Container>
  );
};

export default ForgotPasswordComponent;
