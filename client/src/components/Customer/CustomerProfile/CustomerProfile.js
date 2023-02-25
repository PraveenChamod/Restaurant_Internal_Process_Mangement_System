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

const CustomerProfile = () => {
  const[image,setImage] = useState();
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
                ></Input>
                <H2>CONTACT NUMBER</H2>
                <Input
                  type="number"
                  id="phonenumber"
                  name="phonenumber"
                  placeholder="0774134764"
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
              ></Input>
              <br />
              <H2>ADDRESS</H2>
              <Input
                type="text"
                id="addressline1"
                name="addressline1"
                placeholder="ADDRESS LINE 1"
              ></Input>
              <Input
                type="text"
                id="addressline2"
                name="addressline2"
                placeholder="ADDRESS LINE 2"
              ></Input>
              <Input
                type="text"
                id="city"
                name="city"
                placeholder="CITY"
              ></Input>
              <Input
                type="text"
                id="province"
                name="province"
                placeholder="PROVINCE"
              ></Input>
              <Input
                type="number"
                id="zipcode"
                name="zipcode"
                placeholder="ZIP CODE"
              ></Input>
            </FormControl>
          </Div1>
        </Div>
      </Page1>
    </Page>
  );
};

export default CustomerProfile;
