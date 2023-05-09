import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import { Div, Div1, Div2, Div3, H1, Searchbar, RadioButtonSection, RadioButton, Label, Radio } from "./ViewUserElements";
import { FormButton, RegularButton } from "../SharedElements/Buttons";
import { Container } from "../SharedElements/SharedElements";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-hot-toast";
import axios from "axios";

const ViewUserComponent = (props) => {
  const [email, setEmail] = useState("");
  const [Status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [contactno, setContactno] = useState("");
  const [role, setRole] = useState("");

  const handleEmailChange = (event) => {
    const userEmail = event.target.value;
    setEmail(userEmail);
    props.users.Users[0].map((user) => {
      console.log(user);
      if (user.Email === userEmail) {
        setName(user.Name);
        setContactno(user.ContactNumber);
        setRole(user.Role);
        setStatus(user.Status);
      } else {
        console.log("NO Such Kind Of User");
      }
    });
  };
  const activateordeactivateuser = async (e)=>{
    e.preventDefault();
    try {
      await toast.promise(
        axios.patch(`api/v1/User/${email}`,{Status}),
        {
          loading: `${Status.substring(0, Status.length-1)}ing User..........`,
          success: (data) => {
            return ` ${data.data?.message} ` || "success";
          },
          error: (err) => `${err.response.data.message}`,
        },
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontSize: "1rem",
            zIndex: "99999999",
          },
        }
      )
      setEmail("");
      setName("");
      setRole("");
      setContactno("");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Container>
      <H1>USER DETAILS</H1>
      <Div>
        <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
          <Searchbar
            type="search"
            placeholder="Enter the User email"
            onChange={handleEmailChange}
          />

          <TextField
            id="standard-basic"
            label="Email"
            type="email"
            variant="standard"
            InputLabelProps={{ className: "textFeild_Label" }}
            sx={{ marginBottom: "5%" }}
            value={email}
            InputProps={{
              style: { color: "#fff" },
            }}
          />
          <TextField
            id="standard-basic"
            label="User Name"
            variant="standard"
            InputLabelProps={{ className: "textFeild_Label" }}
            sx={{ marginBottom: "5%" }}
            value={name}
            InputProps={{
              style: { color: "#fff" },
            }}
          />
          <TextField
            id="standard-basic"
            label="Contact Number"
            variant="standard"
            InputLabelProps={{ className: "textFeild_Label" }}
            sx={{ marginBottom: "5%" }}
            value={contactno}
            InputProps={{
              style: { color: "#fff" },
            }}
          />
          <TextField
            id="standard-basic"
            label="Role"
            variant="standard"
            InputLabelProps={{ className: "textFeild_Label" }}
            sx={{ marginBottom: "5%" }}
            value={role}
            InputProps={{
              style: { color: "#fff" },
            }}
          />
          
        </FormControl>
        <RadioButtonSection>
            <RadioButton>
              <Radio
                type="radio"
                name="Status"
                value="Active"
                onChange={(e) => setStatus(e.target.value)}
                checked={Status === "Active" ? true : false}
              />
              <Label>Activate</Label>
            </RadioButton>
            <RadioButton>
              <Radio
                type="radio"
                name="Status"
                value="Deactive"
                onChange={(e) => setStatus(e.target.value)}
                checked={Status === "Deactive" ? true : false}
              />
              <Label>Deactivate</Label>
            </RadioButton>
          </RadioButtonSection>
        <Div1>
          <Div2>
            <FormButton onClick={activateordeactivateuser}>
                Update
            </FormButton>
          </Div2>
        </Div1>
      </Div>
      <Div3>
        <RegularButton>
          <Link to={props.BackRoutes} className="btn">
            Back
          </Link>
        </RegularButton>
      </Div3>
    </Container>
  );
};

export default ViewUserComponent;
