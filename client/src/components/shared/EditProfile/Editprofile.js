import { FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { FormButton, RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import {
  Div,
  Div1,
  Div2,
  Div3,
  Div4,
  Icon,
  ImageSection,
  ImageSubSec,
  Image,
  Section,
  DivNew,
  SubSec,
  Header1
} from "./EditProfileElements";
import LoginImage from "../../../Images/Services/person.jpg";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const EditProfileComponent = (props) => {
  console.log(props.EditProfileBackRoute);
  const { logout, user, loadUser, loading } = useAuth();
  const [Email, setEmail] = useState(user?.Email);
  const [Name, setName] = useState(user?.Name);
  const [ContactNumber, setContactNumber] = useState(user?.ContactNumber);
  const [Imagename, setImage] = useState();
  const [CurrentPassword,setCurrentPassword] = useState("");
  const[NewPassword,setNewPassword] = useState("");
  const[ConfirmPassword,setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleClickShowCurrentPassword = () => setShowCurrentPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const Data = { Name, Email, ContactNumber };
      await toast.promise(
        axios.patch(`api/v1/User/Profile/${user?.Email}`, Data),
        {
          loading: `Updating Profile....`,
          success: (data) => {
            console.log(data);
            loadUser();
            return `${data.data?.message}` || "success";
          },
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
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("image", Imagename);
      await toast.promise(
        axios.patch("api/v1/Auth/ProfilePicture", formdata),
        {
          loading: `Updating Profile....`,
          success: (data) => {
            console.log(data);
            loadUser();
            return `${data.data?.message}` || "success";
          },
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
      );
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
      console.log(data);
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
    <Container>
      <Section>
        <Header>My Profile</Header>
        <SubSec>
        <Div>
          <Div1 onSubmit={updateProfile}>
            <FormControl sx={{ m: 1, width: "35ch" }} variant="standard">
              <TextField
                id="standard-basic"
                label="Email"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginBottom: "10%" }}
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
              <TextField
                id="standard-basic"
                label="User Name"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginBottom: "10%" }}
                value={Name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
              <TextField
                id="standard-basic"
                label="Contact Number"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginBottom: "10%" }}
                value={ContactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
              {/* <TextField id="standard-basic" label="Gender" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} /> */}
              <FormButton>Update</FormButton>
            </FormControl>
          </Div1>
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
              {/* <br/>
                            <RemoveButton>
                            <Link to="./login" className="btn">
                                REMOVE
                            </Link>
                            </RemoveButton> */}
            </Div4>
          </Div2>
        </Div>
        <Div>
        <Div1>
          <Header1>Password Reset</Header1>
              <FormControl  variant="standard" sx={{  position:"relative", top:"-1ch", "& input": {  color: "#fff"} }}>
              <InputLabel htmlFor="standard-adornment-password">Current Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={showCurrentPassword ? 'text' : 'password'}
                value={CurrentPassword}
                onChange={(e)=>setCurrentPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end" >
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowCurrentPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showCurrentPassword ? <Visibility sx={{color:"#fff"}}/> : <VisibilityOff sx={{color:"#fff"}} />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              </FormControl>
              <FormControl variant="standard" sx={{ "& input": {  color: "#fff"} }}>
              <InputLabel htmlFor="standard-adornment-password">New Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={showNewPassword ? 'text' : 'password'}
                value={NewPassword}
                onChange={(e)=>setNewPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showNewPassword ? <Visibility sx={{color:"#fff"}}/> : <VisibilityOff sx={{color:"#fff"}} />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              </FormControl>
          </Div1>
          <Div2>
            <FormControl sx={{ m: 1, marginBottom:"2ch",  "& input": {  color: "#fff"} }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={ConfirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showConfirmPassword ? <Visibility sx={{color:"#fff"}}/> : <VisibilityOff sx={{color:"#fff"}} />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              </FormControl>
              <FormButton onClick={ResetPassword}>Reset Password</FormButton>
          </Div2>
        </Div>
        </SubSec>
      </Section>
      <Div3>
        <RegularButton>
          <Link to={props.EditProfileBackRoute} className="btn">
            Back
          </Link>
        </RegularButton>
      </Div3>
    </Container>
  );
};

export default EditProfileComponent;
