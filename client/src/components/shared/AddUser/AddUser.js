import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import { InputLabel, MenuItem, NativeSelect, Select } from "@mui/material";
import "./AddUser.css";
import { 
  Page,
  Div,
  Div1,
  Div2,
  Div3,
  H1
} from'./AddUserElements';
import { createTheme } from '@mui/material/styles';
import { FormButton, RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";

const AddUserComponent = () => {
  

  return (
    <Container>
      <Header>ADD USER</Header>
      <Div>
        <FormControl  sx={{ m: 1, width: "40ch" }} variant="standard">
          <TextField id="standard-basic" label="Email" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
          <>
            <Select
              defaultValue={30}
              inputProps={{
                name: "role",
                id: "uncontrolled-native",
              }}
              sx={{
                color: "white",
                '.MuiSvgIcon-root ': {
                  fill: "white !important",
                }
              }}
              
            >
              <MenuItem value={1}>Deliverer</MenuItem>
              <MenuItem value={2}>Supplier</MenuItem>
              <MenuItem value={3}>Staff-Member</MenuItem>
            </Select>
          </>
        </FormControl>
        <Div1>
          <Div2>
            <FormButton>
              <Link to="./login" className="btn">
                Add
              </Link>
            </FormButton>
          </Div2>
          
            <FormButton>
              <Link to="./login" className="btn">
                Reset
              </Link>
            </FormButton>
          
        </Div1>
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

export default AddUserComponent;
