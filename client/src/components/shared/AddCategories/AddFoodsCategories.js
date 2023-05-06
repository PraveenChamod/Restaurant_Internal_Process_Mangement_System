import { FormControl, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { FormButton, RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import * as l from "./AddFoodsCategoriesElements";
import { FaCamera } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
const AddFoodsCategoriesComponent = (props) => {
  const [image, setImage] = useState(null);
  const [Category, setCategory] = useState("");
  const handleUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const addFCategory = async (e) => {
    e.preventDefault();
    try {
      const Data = new FormData();
      Data.append("image", image);
      Data.append("Category", Category);
      console.log(Data);
      await toast.promise(
        axios.post("api/v1/Category", Data),
        {
          loading: "Category is Adding....",
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
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      <l.SubSection>
        <Header>Add Categories</Header>
        <l.FormSection onSubmit={addFCategory}>
          <l.LeftSide>
            <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
              <TextField
                id="standard-basic"
                label="Category Name"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginTop: "10%" }}
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
            </FormControl>
          </l.LeftSide>
          <l.RightSide>
            <l.ImageSection>
              <l.ImageSubSec>
                {image ? <l.Image src={URL.createObjectURL(image)} /> : <p></p>}
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
            <l.ButtonSection>
              <FormButton>Add</FormButton>
            </l.ButtonSection>
          </l.RightSide>
        </l.FormSection>
      </l.SubSection>
      <l.ButtonSection1>
        <Link to={props.BackRoutes} className="btn">
          <RegularButton>Back</RegularButton>
        </Link>
      </l.ButtonSection1>
    </Container>
  );
};

export default AddFoodsCategoriesComponent;
