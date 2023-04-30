import { FormControl, TextField } from "@mui/material";
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
} from "./EditProfileElements";
import LoginImage from "../../../Images/Services/person.jpg";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-hot-toast";
const EditProfileComponent = (props) => {
  console.log(props.EditProfileBackRoute);
  const { logout, user, loadUser, loading } = useAuth();
  const [Email, setEmail] = useState(user?.Email);
  const [Name, setName] = useState(user?.Name);
  const [ContactNumber, setContactNumber] = useState(user?.ContactNumber);
  const [Imagename, setImage] = useState();

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
  return (
    <Container>
      <Section>
        <Header>My Profile</Header>
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
                    src={`http://localhost:5000/images/${user?.ProfileImage}`}
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
