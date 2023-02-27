import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import {
  Page,
  Page1,
  Div,
  Div1,
  Div2,
  Div3,
  Div4,
  H2,
  Input,
  RemoveButton,
  Label
} from "./CustomerProfileElement";
import { RegularButton, UploadButton } from "../../shared/SharedElements/Buttons";
import { Header } from "../../shared/SharedElements/SharedElements";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";

const CustomerProfile = (props) => {
  const[image,setImage] = useState();

  const{loadUser}=useAuth();

  const[Name,setName] = useState(props.user.Name);
  const[ContactNumber,setContactNumber] = useState(props.user.ContactNumber);
  const[Email,setEmail] = useState(props.user.Email);
  const[Address,setAddress] = useState(props.user.Address);

  const formData = {Name,ContactNumber,Email,Address};

  const updateProfile = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(`api/v1/customer/UpdateProfile/${Email}`);
      if(res.status == 200 || res.status == 201){
        console.log(res);
      }
    } catch (error) {
      
    }
  }


  const handleUpload = (e)=>{
    setImage(e.target.files[0]);
    console.log(e.target.files
      )
  }

  const uploadImage = async ()=>{
    const formData = new FormData();
    formData.append('image',image);
    const res = await axios.post('api/v1/Auth/uploadProfilePicture',formData);
    console.log(res)
  }
  return (
    <Page>
      <Page1>
        <Header>MY PROFILE</Header>
        <Div>
          <Div1>
            <Div2>
              <Div4>
                <img
                  alt="person"
                  className="image1"
                  src={require("../../../Images/Services/person.jpg")}
                />
              </Div4>
              <Div4>
                <Label for='file'>
                  Upload
                  <input type='file' id='file' accept="image/*" onChange={handleUpload}/>
                </Label>
                <br/>
                <RemoveButton>
                  <Link to="./login" className="btn">
                    REMOVE
                  </Link>
                </RemoveButton>
              </Div4>
            </Div2>
            <Div3>
              <FormControl sx={{ m: 1, width: "50ch" }} variant="standard">
                <H2>NAME</H2>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="JOHNNY ANN"
                  value={Name}
                  onChange={e=>setName(e.target.value)}
                ></Input>
                <H2>CONTACT NUMBER</H2>
                <Input
                  type="number"
                  id="phonenumber"
                  name="phonenumber"
                  placeholder="0774134764"
                  value={ContactNumber}
                  onChange={e=>setContactNumber(e.target.value)}
                ></Input>
              </FormControl>
              <RegularButton onClick={uploadImage}>
                  UPDATE PROFILE
              </RegularButton>
            </Div3>
          </Div1>
          <Div1>
            <FormControl sx={{ m: 1, width: "50ch" }} variant="standard">
              <H2>EMAIL</H2>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="JHNNANN123@GMAIL.COM"
                value={Email}
                onChange={e=>setEmail(e.target.value)}
              ></Input>
              <br />
              <H2>ADDRESS</H2>
              <Input
                type="text"
                id="address"
                name="address"
                placeholder="ADDRESS"
                value={Address}
                onChange={e=>setAddress(e.target.value)}
              ></Input>
            </FormControl>
          </Div1>
        </Div>
      </Page1>
    </Page>
  );
};

export default CustomerProfile;
