import { Container, Header } from "../../shared/SharedElements/SharedElements";
import { FormControl, TextField } from "@mui/material";
import * as l from "./ItemDetailsElements";
import { FormButton, RegularButton } from "../../shared/SharedElements/Buttons";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ItemDetails = (props) => {
  console.log(props.item);
  const [ItemName, setItemName] = useState(props.item.ItemName);
  const [Quantity, setQuantity] = useState(props.item.Quantity);
  const [UnitPrice, setUnitPrice] = useState(props.item.UnitPrice);
  const [Category, setCategory] = useState(props.item.Category);
  const [TotalPrice, setTotalPrice] = useState(props.item.TotalPrice);

  const updateStock = async(e)=>{
    e.preventDefault();
    try {
      await toast.promise(
        axios.patch(`/api/v1/Item/${props.item.SerialNo}`, {Quantity}),
        {
          loading: "Updating Stock....",
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
      
    }
  }
  return (
    <Container>
      <Header>ITEM DETAILS</Header>
      <l.Section onSubmit={updateStock}>
        <l.FormSection>
          <l.LeftSide>
            <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
              <TextField
                id="standard-basic"
                label="Item Name"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginBottom: "10%" }}
                value={ItemName}
                onChange={(e) => setItemName(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
              <TextField
                id="standard-basic"
                label="Qty"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginBottom: "10%" }}
                value={props.item.Quantity}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
              <TextField
                id="standard-basic"
                label="Total Price"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginBottom: "10%" }}
                value={TotalPrice}
                onChange={(e) => setTotalPrice(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
            </FormControl>
          </l.LeftSide>
          <l.RightSide>
            <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
              <TextField
                id="standard-basic"
                label="Category"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginBottom: "10%" }}
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
              <TextField
                id="standard-basic"
                label="Price"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginBottom: "10%" }}
                value={UnitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
              <TextField
                id="standard-basic"
                label="Available Stock"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginBottom: "10%" }}
                value={Quantity}
                onChange={(e) => setQuantity(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
            </FormControl>
          </l.RightSide>
        </l.FormSection>
        <l.ButtonSection>
          <FormButton>Update</FormButton>
        </l.ButtonSection>
      </l.Section>
      <l.Div3>
        <RegularButton>
          <Link to="/ManagerViewStock" className="btn">
            Back
          </Link>
        </RegularButton>
      </l.Div3>
    </Container>
  );
};

export default ItemDetails;
