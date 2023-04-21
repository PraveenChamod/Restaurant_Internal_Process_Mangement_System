import { FormControl, TextField, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { FormButton, RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import * as l from "./AddDatingTableItemsElements";
import { FaCamera } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
const AddDatingTableItemsComponent = (props) => {
  const [image, setImage] = useState(null);
  const [ItemName, setItemName] = useState("");
  const [ItemType, setItemType] = useState("");
  const [ItemPrice, setItemPrice] = useState("");
  const handleUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const addDatingTableItem = async (e) => {
    e.preventDefault();
    try {
      const Data = new FormData();
      Data.append("image", image);
      Data.append("ItemName", ItemName);
      Data.append("ItemType", ItemType);
      Data.append("ItemPrice", ItemPrice);
      console.log(Data);
      await toast.promise(
        axios.post("api/v1/DatingTableItem", Data),
        {
          loading: "Item is Adding....",
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
        <Header>Add Dating Table Items</Header>
        <l.FormSection onSubmit={addDatingTableItem}>
          <l.LeftSide>
          
            <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
            <l.SubHeader>Item Type</l.SubHeader>
            <Select
                    defaultValue={30}
                    inputProps={{
                      style: { color: "#fff" },
                    }}
                    sx={{
                        color: "white",
                        '.MuiSvgIcon-root ': {
                        fill: "white !important",
                        
                        }
                    }}
                    onChange={e=>setItemType(e.target.value)}
                >
                <MenuItem value="Flower" >Flower</MenuItem>
                <MenuItem value="Beverage" >Beverage</MenuItem>
                <MenuItem value="Candles" >Candles</MenuItem>
                <MenuItem value="Napkin" >Napkin</MenuItem>
              </Select>
              {/* <TextField
                id="standard-basic"
                label="Item Type"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginTop: "10%" }}
                value={ItemType}
                onChange={(e) => setItemType(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
              /> */}
              <TextField
                id="standard-basic"
                label="Item Name"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginTop: "10%" }}
                value={ItemName}
                onChange={(e) => setItemName(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
              <TextField
                id="standard-basic"
                label="Item Price"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginTop: "10%" }}
                value={ItemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
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

export default AddDatingTableItemsComponent;
