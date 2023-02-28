import React, { useState } from "react";
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
import axios from "axios";

const AddUserComponent = () => {
  
  const [Email,setEmail] = useState('');
  const[Role,setRole] = useState('');

  const onSubmit = async (e)=>{
    e.preventDefault();
    try {
      const formData = {Email,Role};
      console.log(formData);
      const res = await axios.post('api/v1/admin/RegisterServiceProvider',formData);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Container>
      <Header>ADD USER</Header>
      <Div  onSubmit={onSubmit}>
        <FormControl  sx={{ m: 1, width: "40ch" }} variant="standard">
          <TextField id="standard-basic" label="Email" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} value={Email} onChange={e=>setEmail(e.target.value)}/>
          <>
            <Select
              sx={{
                color: "white",
                '.MuiSvgIcon-root ': {
                  fill: "white !important",
                }
              }}
              value={Role}
              onChange={e=>setRole(e.target.value)}
            >
              <MenuItem value={'Deliverer'} >Deliverer</MenuItem>
              <MenuItem value={'Supplier'}>Supplier</MenuItem>
              <MenuItem value={'Staff-Member'}>Staff-Member</MenuItem>
            </Select>
          </>
          <Div1>
            <div style={{margin:'3%'}}>
            <FormButton>
                Add
            </FormButton>
            </div>
            <div style={{margin:'3%'}}>
            <FormButton>
              <Link  className="btn">
                Reset
              </Link>
            </FormButton>
            </div>
        </Div1>
          </FormControl>
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
