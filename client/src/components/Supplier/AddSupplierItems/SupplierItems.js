import { RegularButton } from "../../shared/SharedElements/Buttons";
import { useState } from "react";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import * as l from "./SupplierItemsElement";
import {
  FormLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";

const SupplierItemsComponent = (props) => {
  const { user } = useAuth();
  const Supplier = user.id;
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [items, setItems] = useState([]);

  let ItemName;
  let Price;
  let Category;
  let Items = [];

  const handleAddItem = () => {
    const newItem = { itemName, price, category };
    setItems([...items, newItem]);
    setItemName("");
    setPrice("");
    setCategory("");
    console.log(items);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };
  items.forEach((supplieritem) => {
    ItemName = supplieritem.itemName;
    Price = supplieritem.price;
    Category = supplieritem.category;
    Items.push({
      ItemName,
      Price,
      Category,
    });
  });
  console.log(Items);
  const handleAddSupplyItems = async (e) => {
    e.preventDefault();
    try {
      console.log("Final items" + Items);
      await toast.promise(
        props.axiosInstance.post("api/v1/SupplierItems", {
          Items: Items,
          Supplier: Supplier,
        }),
        {
          loading: "Supply items are Adding....",
          success: (items) => {
            return ` ${items.data?.message} ` || "success";
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
      <Header>ADD SUPPLY ITEM DETAILS</Header>
      <l.FormSection>
        <l.LeftSide>
          <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
            <TextField
              id="standard-basic"
              label="Item Name"
              variant="standard"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              InputLabelProps={{ className: "textFeild_Label" }}
              sx={{ marginBottom: "10%" }}
              InputProps={{ style: { color: "#fff" } }}
            />
            <TextField
              id="standard-basic"
              label="Category"
              variant="standard"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              InputLabelProps={{ className: "textFeild_Label" }}
              sx={{ marginBottom: "10%" }}
              InputProps={{ style: { color: "#fff" } }}
            />
            <TextField
              id="standard-basic"
              label="Unit Price"
              variant="standard"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              InputLabelProps={{ className: "textFeild_Label" }}
              sx={{ marginBottom: "10%" }}
              InputProps={{ style: { color: "#fff" } }}
            />
            <FormControl component="fieldset">
              {/* <FormLabel component="legend" className="textFeild_Label">Status</FormLabel> */}
              {/* <RadioGroup row defaultValue="Available" value={status} onChange={e => setStatus(e.target.value)}>
                        <FormControlLabel value="Available" control={<Radio sx={{ color: 'white' }} />} label="Available" sx={{ color: 'white' }} />
                        <FormControlLabel value="Out of Stock" control={<Radio sx={{ color: 'white' }} />} label="Out of Stock" sx={{ color: 'white' }} />
                    </RadioGroup> */}
            </FormControl>
            <l.AddButton onClick={handleAddItem}>+</l.AddButton>
          </FormControl>
        </l.LeftSide>
        <l.RightSide onSubmit={handleAddSupplyItems}>
          <l.Table>
            <thead>
              <l.Tr>
                <l.Th>Item Name</l.Th>
                <l.Th>Unit Price</l.Th>
                <l.Th>Status</l.Th>
                <l.Th>Price</l.Th>
                <l.Th>Category</l.Th>
                <l.Th>Remove</l.Th>
              </l.Tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <l.Tr key={index}>
                  <l.Td>{item.itemName}</l.Td>
                  <l.Td>{item.price}</l.Td>
                  <l.Td>{item.status}</l.Td>
                  <l.Td>{item.price}</l.Td>
                  <l.Td>{item.category}</l.Td>
                  <l.Td onClick={() => handleDeleteItem(index)}>
                    <l.RemoveButton>x</l.RemoveButton>
                  </l.Td>
                </l.Tr>
              ))}
            </tbody>
          </l.Table>
          <l.OkButton>OK</l.OkButton>
        </l.RightSide>
      </l.FormSection>
      <l.Div3>
        <Link to={props.BackRoutes} className="btn">
          <RegularButton>Back</RegularButton>
        </Link>
      </l.Div3>
    </Container>
  );
};

export default SupplierItemsComponent;
