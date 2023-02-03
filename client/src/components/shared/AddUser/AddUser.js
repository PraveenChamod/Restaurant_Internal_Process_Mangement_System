import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import { NativeSelect } from "@mui/material";
import "./AddUser.css";
import { 
  Page,
  Div,
  Div1,
  Div2,
  Div3,
  H1
} from'./AddUserElements';


const AddUser = () => {

  

  return (
    <Page>
      <H1>ADD USER</H1>
      <Div>
        <FormControl  sx={{ m: 1, width: "40ch" }} variant="standard">
          <TextField id="standard-basic" label="Email" variant="standard" />
          <br/>
          <NativeSelect
            defaultValue={30}
            inputProps={{
              name: "age",
              id: "uncontrolled-native",
            }}
          >
            <option value={10}>Manager</option>
            <option value={20}>Staff Member</option>
            <option value={30}>Deliverer</option>
            
          </NativeSelect>
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

export default AddUser;
