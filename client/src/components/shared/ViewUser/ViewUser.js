import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import {
  Div,
  Div1,
  Div2,
  Div3,
  H1,
  Searchbar
} from './ViewUserElements';
import { FormButton, RegularButton } from "../SharedElements/Buttons";
import { Container } from "../SharedElements/SharedElements";

const ViewUserComponent = (props) => {

  console.log(props);

  const [email, setEmail] = useState("");

  const [name, setName] = useState("");
  const [contactno, setContactno] = useState("");
  const [role, setRole] = useState("");


  const handleEmailChange = (event) => {
    const userEmail = event.target.value;
    setEmail(userEmail);
  
    props.users.data.Users[0].map(user => {
      if (user.Email === userEmail) {
        setName(user.Name);
        setContactno(user.ContactNumber);
        setRole(user.Role);
      }else{
        console.log("NO Such Kind Of User");
      }
    });
  };
  
  return (
    <Container>
      <H1>USER DETAILS</H1>
      <Div>
        <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">

          <Searchbar type="search" placeholder="Enter the User email" onChange={handleEmailChange}/>
          
          <TextField
            id="standard-basic"
            label="Email"
            type="email"
            variant="standard"
            InputLabelProps={{className:'textFeild_Label'}} 
            sx={{marginBottom:'5%'}}
            value={email}            
          />
          <TextField 
            id="standard-basic" 
            label="User Name" 
            variant="standard" 
            InputLabelProps={{className:'textFeild_Label'}} 
            sx={{marginBottom:'5%'}}
            value={name}  
          />
          <TextField
            id="standard-basic"
            label="Contact Number"
            variant="standard"
            InputLabelProps={{className:'textFeild_Label'}} 
            sx={{marginBottom:'5%'}}
            value={contactno}
          />
          <TextField 
            id="standard-basic" 
            label="Role" 
            variant="standard" 
            InputLabelProps={{className:'textFeild_Label'}} 
            sx={{marginBottom:'5%'}}
            value={role}
          /> 
        </FormControl>
        <Div1>
          <Div2>
            <FormButton>
              <Link to="./login" className="btn">
                <b>DELETE</b>
              </Link>
            </FormButton>
          </Div2>
          
            <FormButton>
              <Link to="./login" className="btn">
                <b>UPDATE</b>
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

export default ViewUserComponent;