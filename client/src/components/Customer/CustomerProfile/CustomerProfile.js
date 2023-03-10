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
  Label,
  Image,
  ImageSection,
  Icon,
  ImageSubSec
} from "./CustomerProfileElement";
import { RegularButton, UploadButton } from "../../shared/SharedElements/Buttons";
import { Header } from "../../shared/SharedElements/SharedElements";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import { FaCamera } from 'react-icons/fa';
import { Oval } from "react-loader-spinner";
import useFetch from "../../../Hooks/useFetch";
const CustomerProfile = (props) => {
  const[Imagename,setImage] = useState();

  const{loadUser,loading,user}=useAuth();
  
  const[Name,setName] = useState(props.user.Name);
  const[ContactNumber,setContactNumber] = useState(props.user.ContactNumber);
  const[Email,setEmail] = useState(props.user.Email);
  const[Address,setAddress] = useState(props.user.Address);
  
  const updateProfile = async (e)=>{
    e.preventDefault();
    try {
      const Data = {Name,Email,ContactNumber,Address}
      const res = await axios.patch(`api/v1/User/Profile/${user?.Email}`,Data);
      if(res.status == 200 || res.status == 201){
        console.log(res);
        loadUser();
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const uploadImage = async (e)=>{
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append('image',Imagename);
      const res = await axios.patch('api/v1/Auth/ProfilePicture',formdata);
      console.log(res)
      loadUser();
    } catch (error) {
      console.log(error.message);      
    }
  }
  const handleUpload = (e)=>{
    setImage(e.target.files[0]);
  }
  console.log(Imagename);
  return (
    <Page>
      <Page1>
        <Header>MY PROFILE</Header>
        <Div onSubmit={updateProfile}>
          <Div1>
            <Div2>
              <ImageSection>
                <ImageSubSec>
                  {
                      loading && <Oval
                                    height={150}
                                    width={150}
                                    color="#FFBF00"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                    ariaLabel='oval-loading'
                                    secondaryColor="#FFBF00ed"
                                    strokeWidth={2}
                                    strokeWidthSecondary={2}
                                />
                    }
                    {!loading && user && <Image
                        className="image1"
                        src={`http://localhost:5000/images/${user?.ProfileImage}`}
                      />
                    }
                </ImageSubSec>
                  <Icon for="file">
                    <FaCamera/>
                      <input type='file' id='file' accept="image/*" onChange={handleUpload}/>
                  </Icon>
                </ImageSection>
              <Div4>
                <RegularButton onClick={uploadImage}>Upload</RegularButton>
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
              <RegularButton>
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
