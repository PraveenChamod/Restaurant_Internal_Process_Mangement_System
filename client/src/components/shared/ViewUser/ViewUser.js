import React, { useState } from "react";
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
import { FormButton, RegularButton } from "../SharedElements/Buttons";
import { Container } from "../SharedElements/SharedElements";
import useAuth from "../../../Hooks/useAuth";

const ViewUserComponent = (props) => {

  const [users, setUsers] = useState(props.users);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleSearch = (event) => {
    
    const searchValue = event.target.value.toLowerCase();
    const filteredUsers = props.users.filter((user) =>
      user.email.toLowerCase().includes(searchValue)
    );
    setUsers(filteredUsers);
  };

  return (

    

    <Container>
      <H1>USER DETAILS</H1>
      <Div>
        <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
          <Searchbar type="search" placeholder="Enter the User email" />
          <TextField
            id="standard-basic"
            label="Email"
            type="email"
            variant="standard"
            InputLabelProps={{className:'textFeild_Label'}} 
            sx={{marginBottom:'5%'}}
            value={selectedUser?.email || ""}
            disabled={!selectedUser}
          />
          <TextField 
            id="standard-basic" 
            label="User Name" 
            variant="standard" 
            InputLabelProps={{className:'textFeild_Label'}} 
            sx={{marginBottom:'5%'}}/>
            value={selectedUser?.username || ""}
            disabled={!selectedUser}
          <TextField
            id="standard-basic"
            label="Contact Number"
            variant="standard"
            InputLabelProps={{className:'textFeild_Label'}} 
            sx={{marginBottom:'5%'}}
            value={selectedUser?.contactNumber || ""}
            disabled={!selectedUser}
          />
          <TextField 
            id="standard-basic" 
            label="Role" 
            variant="standard" 
            InputLabelProps={{className:'textFeild_Label'}} 
            sx={{marginBottom:'5%'}}/>
            value={selectedUser?.role || ""}
            disabled={!selectedUser}
          <TextField 
            id="standard-basic" 
            label="Gender" 
            variant="standard" 
            InputLabelProps={{className:'textFeild_Label'}} 
            sx={{marginBottom:'5%'}}/>
            value={selectedUser?.role || ""}
            disabled={!selectedUser}
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
