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
  ImageSubSec,
  Header1
} from "./CustomerProfileElement";
import {
  FormButton,
  RegularButton,
  UploadButton,
} from "../../shared/SharedElements/Buttons";
import { Header } from "../../shared/SharedElements/SharedElements";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import { FaCamera } from "react-icons/fa";
import { Oval } from "react-loader-spinner";
import useFetch from "../../../Hooks/useFetch";
import { toast } from "react-hot-toast";
const CustomerProfile = (props) => {
  const [Imagename, setImage] = useState();

  const { loadUser, loading, user } = useAuth();

  const [Name, setName] = useState(props.user.Name);
  const [ContactNumber, setContactNumber] = useState(props.user.ContactNumber);
  const [Email, setEmail] = useState(props.user.Email);
  const [Address, setAddress] = useState(props.user.Address);
  const [CurrentPassword,setCurrentPassword] = useState("");
  const[NewPassword,setNewPassword] = useState("");
  const[ConfirmPassword,setConfirmPassword] = useState("");

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const Data = { Name, Email, ContactNumber, Address };
      await toast.promise(
        axios.patch(`api/v1/User/Profile/${user?.Email}`, Data),
        {
          loading: `Updating Profile Details...`,
          success: (data) => {
            console.log({ data });
            loadUser();
            return "Profile Updated Successfully";
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
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("image", Imagename);
      const res = await axios.patch("api/v1/Auth/ProfilePicture", formdata);
      console.log(res);
      loadUser();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleUpload = (e) => {
    setImage(e.target.files[0]);
  };
  
  const ResetPassword = async (e)=>{
    e.preventDefault();
    try {
      const data = {CurrentPassword, NewPassword, ConfirmPassword}
      await toast.promise(
        axios.patch('api/v1/Auth/resetpassword', data),
        {
          loading: `Updating Password....`,
          success: (data) => {
            loadUser();
            return `${data.data?.message}` || "success";
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
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <Page>
      <Page1>
        <Header>MY PROFILE</Header>
        <Div onSubmit={updateProfile}>
          <Div1>
            <Div2>
              <ImageSection>
                <ImageSubSec>
                  {loading && (
                    <Oval
                      height={150}
                      width={150}
                      color="#FFBF00"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#FFBF00ed"
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
                  )}
                  {!loading && user && (
                    <Image
                      className="image1"
                      src={`https://resto-f3zu.onrender.com/images/${user?.ProfileImage}`}
                    />
                  )}
                </ImageSubSec>
                <Icon for="file">
                  <FaCamera />
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={handleUpload}
                  />
                </Icon>
              </ImageSection>
              <Div4>
                <RegularButton onClick={uploadImage}>Upload</RegularButton>
                <br />
                <RemoveButton>
                    REMOVE
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
                  onChange={(e) => setName(e.target.value)}
                ></Input>
                <H2>CONTACT NUMBER</H2>
                <Input
                  type="number"
                  id="phonenumber"
                  name="phonenumber"
                  placeholder="0774134764"
                  value={ContactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                ></Input>
              </FormControl>
              <FormButton>UPDATE PROFILE</FormButton>
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
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
              <H2>ADDRESS</H2>
              <Input
                type="text"
                id="address"
                name="address"
                placeholder="ADDRESS"
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
              ></Input>
            </FormControl>
            <FormControl sx={{ m: 1, width: "50ch" }}>
              <Header1>Password Reset</Header1>
            <H2>Current Password</H2>
              <Input
                type="password"
                id="currentPassword"
                name="currentPassword"
                placeholder="Enter Current Password"
                value={CurrentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <H2>New Password</H2>
              <Input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Enter New Password"
                value={NewPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <H2>Confirm Password</H2>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter Password"
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
            <FormButton onClick={ResetPassword}>Reset Password</FormButton>
          </Div1>
        </Div>
      </Page1>
    </Page>
  );
};

export default CustomerProfile;
