import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import { MenuItem, Select } from "@mui/material";
import "./AddUser.css";
import { 
  Div,
  Div1,
  Div3,
} from'./AddUserElements';
import { FormButton, RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import axios from "axios";
import { toast } from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";

const AddUserComponent = (props) => {
  
  const{user} = useAuth();
  console.log(props.BackRoutes);
  const [Email,setEmail] = useState('');
  const[Role,setRole] = useState('');

  const onSubmit = async (e)=>{
    try {
      e.preventDefault();
      const formData = {Email,Role};
      await toast.promise(
        axios.post('api/v1/User/ServiceProviderRegister',formData),
        {
          loading:'Adding User.....',
          success:(data)=>{
            return `${data.data?.message}` || "success";
          },
          error: (err)=>`${err.response.data.message}`,
        },
        {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            fontSize:'1rem',
            zIndex:'99999999'
          }
        }
      )
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Container>
      <Header>ADD USER</Header>
      <Div  onSubmit={onSubmit}>
        <FormControl  sx={{ m: 1, width: "40ch" }} variant="standard">
          <TextField 
            id="standard-basic" 
            label="Email" 
            variant="standard" 
            InputLabelProps={{className:'textFeild_Label'}} 
            sx={{marginBottom:'10%'}} 
            value={Email} 
            onChange={e=>setEmail(e.target.value)}
            InputProps={{
              style: { color: '#fff' },
              }}
          />
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
              <MenuItem value={'Manager'} >Manager</MenuItem>
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
          <Link to={props?.BackRoutes} className="btn">
            Back
          </Link>
        </RegularButton>
      </Div3>
    </Container>
  );
};

export default AddUserComponent;
