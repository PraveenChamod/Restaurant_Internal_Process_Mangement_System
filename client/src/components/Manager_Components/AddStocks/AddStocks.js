import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import { InputLabel, MenuItem, NativeSelect, Select } from "@mui/material";

import { Page, Div, Div1, Div2, Div3, H1 } from "./AddStocksElements";
import { FormButton, RegularButton } from "../../shared/SharedElements/Buttons";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddStocks = (props) => {
  const [ItemName, setItemName] = useState("");
  const [Category, setCategory] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [UnitPrice, setUnitPrice] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        ItemName,
        Category,
        Quantity,
        UnitPrice,
      };
      await toast.promise(
        axios.post("api/v1/Item", formData),
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
      )
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      <Header>ADD STOCK</Header>
      <Div onSubmit={onSubmit}>
        <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
          <TextField
            id="standard-basic"
            label="Item Name"
            variant="standard"
            InputLabelProps={{ className: "textFeild_Label" }}
            sx={{ marginBottom: "5%" }}
            value={ItemName}
            onChange={(e) => setItemName(e.target.value)}
            InputProps={{
              style: { color: "#fff" },
            }}
          />
          <FormControl variant="standard">
            <InputLabel
              sx={{ color: "white" }}
              id="demo-simple-select-standard-label"
            >
              {" "}
              Category{" "}
            </InputLabel>
            <Select
              className="MuiInputLabel-root"
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              defaultValue={30}
              label="Category"
              inputProps={{
                name: "role",
                id: "uncontrolled-native",
              }}
              sx={{
                color: "white",
                ".MuiSvgIcon-root ": {
                  fill: "white !important",
                },
                marginBottom: "5%",
              }}
              value={Category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value={"Vegitable"}>Vegitable</MenuItem>
              <MenuItem value={"Meat"}>Meat</MenuItem>
              <MenuItem value={"Fruits"}>Fruits</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="standard-basic"
            label="Quantity"
            variant="standard"
            InputLabelProps={{ className: "textFeild_Label" }}
            sx={{ marginBottom: "5%" }}
            value={Quantity}
            onChange={(e) => setQuantity(e.target.value)}
            InputProps={{
              style: { color: "#fff" },
            }}
          />
          <TextField
            id="standard-basic"
            label="Unit Price"
            variant="standard"
            InputLabelProps={{ className: "textFeild_Label" }}
            sx={{ marginBottom: "5%" }}
            value={UnitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            InputProps={{
              style: { color: "#fff" },
            }}
          />
        </FormControl>
        <Div1>
          <Div2>
            <FormButton>Add</FormButton>
          </Div2>
          <Div2>
          <FormButton>
              Reset
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

export default AddStocks;
