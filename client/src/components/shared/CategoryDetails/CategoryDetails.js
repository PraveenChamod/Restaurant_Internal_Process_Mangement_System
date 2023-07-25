import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Link, useNavigate } from "react-router-dom";
import * as l from "./CategoryDetailsElements";
import { FormButton, RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FaCamera } from "react-icons/fa";
import notfound from '../../../Images/notFound/NoResults.png';
const CategoryDetails = (props) => {
  const [CategoryName, setCategoryName] = useState("");
  const [Status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(false);
  const[serachText,setSearchText] = useState("");
  const { user } = useAuth();

  const navigate = useNavigate();
  const update = async (e) => {
      e.preventDefault();
      try {
        const Data = new FormData();
      Data.append("image", image);
      Data.append("CategoryName", CategoryName);
      Data.append("Status", Status);
      console.log(Data);
        await toast.promise(
          axios.patch('api/v1/Category', Data),
          {
            loading: "Category is Updating....",
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
        );
        setTimeout(() => {
            navigate(props.BackRoutes);
          }, 2000);
      } catch (error) {
        console.log(error.message);
      }
  };
  const handleUpload = (e) => {
    setImage(e.target.files[0]);
    setClick(true);
  };
  const handleCategoryChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleKeyPress = (e)=>{
    if(e.key === "Enter"){
        setCategoryName(serachText);
        props.data.map((category) => {
        console.log(category);
        if (category.CategoryName === serachText) {
            setClick1(true);
            setCategoryName(category.CategoryName);
            setStatus(category.Status);
            setImage(category.CategoryImage);
        } else {
            console.log("NO Such Kind Of Category");
        }
        });
    }
  }
  return (
    <Container>
      <Header>Category Details</Header>
      <l.Div>
        <l.Div1>
            <l.Searchbar
                type="text"
                placeholder="Enter the Category Name"
                onChange={handleCategoryChange}
                onKeyPress={handleKeyPress}
            />
        </l.Div1>
        {
            !click1? 
            <l.NotFound>
                <l.Image1 src={notfound} />
                <l.Text1>No Results Found</l.Text1>
            </l.NotFound>
          :
          <form onSubmit={update}>
            <l.Div1>
          <l.ImageSection>
            <l.ImageSubSec>
              {
              click ? (
                <l.Image src={URL.createObjectURL(image)} />
              ) : (
                <l.Image
                  src={`https://resto-f3zu.onrender.com/Categoryimages/${image}`}
                />
              )
            }
            </l.ImageSubSec>
            <l.Icon>
              <FaCamera />
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={handleUpload}
              />
            </l.Icon>
          </l.ImageSection>
          <l.TextSection>
            <l.Text>Category Name</l.Text>
            <l.TextFeild
              type="text"
              placeholder="Name"
              value={CategoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </l.TextSection>
          <l.RadioButtonSection>
            <l.RadioButton>
              <l.Radio
                type="radio"
                name="Availablility"
                value="Available"
                onChange={(e) => setStatus(e.target.value)}
                checked={Status === "Available" ? true : false}
              />
              <l.Label>Available</l.Label>
            </l.RadioButton>
            <l.RadioButton>
              <l.Radio
                type="radio"
                name="Availablility"
                value="Not Available"
                onChange={(e) => setStatus(e.target.value)}
                checked={Status === "Not Available" ? true : false}
              />
              <l.Label>Not Available</l.Label>
            </l.RadioButton>
          </l.RadioButtonSection>
        </l.Div1>
        <l.Div1>
          <l.Div2>
            <FormButton>Update</FormButton>
          </l.Div2>
        </l.Div1>
        </form>
        }
      </l.Div>
      <l.Div3>
        <RegularButton>
          <Link to={props.BackRoutes} className="btn">
            Back
          </Link>
        </RegularButton>
      </l.Div3>
    </Container>
  );
};

export default CategoryDetails;
