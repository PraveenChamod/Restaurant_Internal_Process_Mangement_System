import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";

import { Div, Div1, Div2, Div3 } from "./AddSupplierOrderElement.js";
import { FormButton, RegularButton } from "../../shared/SharedElements/Buttons";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import { useState } from "react";
import axios from "axios";
import * as l from './AddSupplierOrderElement';
import { AiFillEye } from "react-icons/ai";
import { FaPlus, FaTrash } from 'react-icons/fa';
import Popup from "./Popup";
import useAuth from "../../../Hooks/useAuth.js";
import { toast } from 'react-hot-toast';

// const AddSupplierOrder = (props) => {
//   const [Item, setItem] = useState("");
//   const [Quantity, setQuantity] = useState();
//   const [Date, setDate] = useState("");

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = { Item, Quantity, Date };
//       const res = await axios.post("api/v1/AddSupplierOrder",formData);
//       console.log(res);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   return (
//     <Container>
//       <Header>ADD SUPPLIER ORDER</Header>
//       <Div onSubmit={onSubmit}>
//         <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
//           <TextField
//             id="standard-basic"
//             label="Item"
//             variant="standard"
//             InputLabelProps={{ className: "textFeild_Label" }}
//             sx={{ marginBottom: "5%" }}
//             value={Item}
//             onChange={(e) => setItem(e.target.value)}
//           />
//           <TextField
//             id="standard-basic"
//             label="Quantity"
//             variant="standard"
//             InputLabelProps={{ className: "textFeild_Label" }}
//             sx={{ marginBottom: "5%" }}
//             value={Quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//           />
//           <TextField
//             id="standard-basic"
//             label="Date"
//             variant="standard"
//             InputLabelProps={{ className: "textFeild_Label" }}
//             sx={{ marginBottom: "0" }}
//             value={Date}
//             onChange={(e) => setDate(e.target.value)}
//           />
          

//         <Div1>
//           <Div2><FormButton>Add</FormButton></Div2>

//         </Div1>
//         </FormControl>
//       </Div>
//       <Div3>
//         <RegularButton>
//           <Link to={props.BackRoutes} className="btn">
//             Back
//           </Link>
//         </RegularButton>
//       </Div3>
//     </Container>
//   );
// };

// export default AddSupplierOrder;




const AddSupplierOrder = (props) => {
  const{user} =  useAuth();
  const Manager = user.id;
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [orderItems, setOrderItems] = useState([]);

  const openPopup = (item) => {
    setSelectedItem(item);
    setShowPopup(true);
  };

  const closePopup = () => {
    setSelectedItem(null);
    setShowPopup(false);
  };

  const addItem = (quantity) => {
    const newItem = {
      supplierId: selectedItem.SupplierId,
      itemName: selectedItem.ItemName,
      category: selectedItem.Category,
      unitPrice: selectedItem.Price,
      quantity: quantity,
      subTotal: selectedItem.Price * quantity,
      id: Math.random(),
    };
    setOrderItems([...orderItems, newItem]);
    closePopup();
  };

  const removeItem = (itemId) => {
    const newOrderItems = orderItems.filter((item) => item.id !== itemId);
    setOrderItems(newOrderItems);
  };

  console.log(orderItems); //all the details of ordered items
  //----------------------------------------------------
  let Supplier;
  let ItemId;
  let Quantity;
  let OrderItem = [];
  
  const handleOrderItems = (e) => {
    orderItems.forEach(async (orderitem)=>{
      Supplier = orderitem.supplierId;
      ItemId = orderitem.id;
      Quantity = orderitem.quantity;
      OrderItem.push({
        ItemId,
        Quantity
      })
      try{
        console.log("Manager:"+Manager+" Supplier:"+Supplier+" OrderItem:"+OrderItem);
        await toast.promise(
          axios.post('api/v1/SupplierOrder', {Manager:Manager,Supplier:Supplier,Items:OrderItem}),
          {
            loading: 'Supply orders are Adding....',
            success: (orderItems) => {
              return ` ${orderItems.data?.message} ` || "success";
            },
            error: (err) => `${err.response.data.message}`,
          },
          {
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
              fontSize: '1rem',
              zIndex: '99999999'
            }
          }
        )
      } catch (error) {
        console.log(error.message);
      }
    })
  }
  //----------------------------------------------------

  return (
    <Container>
      <Header>ORDER ITEMS FROM SUPPLIERS</Header>
      <l.SubContainer>
        <l.Table>
          <l.Tr>
            <l.Th>Supplier</l.Th>
            <l.Th>Contact</l.Th>
            <l.Th>Item Name</l.Th>
            <l.Th>Category</l.Th>
            <l.Th>Unit Price</l.Th>
            <l.Th>Status</l.Th>
            <l.Th></l.Th>
          </l.Tr>
          {props.data3.data.SupplierItems.map((ItemArray) => {
            return ItemArray.supplierItem.map((row) => {
              return (
                <l.Tr key={row.id}>
                  <l.Td>{ItemArray.supplierName}</l.Td>
                  <l.Td>{ItemArray.supplierContactNumber}</l.Td>
                  <l.Td>{row.ItemName}</l.Td>
                  <l.Td>{row.Category}</l.Td>
                  <l.Td>{row.Price}</l.Td>
                  <l.Td>{row.Status}</l.Td>
                  <l.Icon onClick={() => openPopup(row)}>
                    <FaPlus />
                  </l.Icon>
                </l.Tr>
              );
            });
          })}
        </l.Table>
      </l.SubContainer>
      {showPopup && (
        <Popup item={selectedItem} onAdd={addItem} onClose={closePopup} />
      )}
      {orderItems.length > 0 && (
        <l.SubContainer>
          <l.Table>
            <l.Tr>
              <l.Th>Item Name</l.Th>
              <l.Th>Category</l.Th>
              <l.Th>Unit Price</l.Th>
              <l.Th>Quantity</l.Th>
              <l.Th>Subtotal</l.Th>
              <l.Th></l.Th>
            </l.Tr>
            {orderItems.map((item) => (
              <l.Tr key={item.id}>
                <l.Td>{item.itemName}</l.Td>
                <l.Td>{item.category}</l.Td>
                <l.Td>{item.unitPrice}</l.Td>
                <l.Td>{item.quantity}</l.Td>
                <l.Td>{item.subTotal}</l.Td>
                <l.Td>
                  <l.Icon onClick={() => removeItem(item.id)}>
                    <FaTrash />
                  </l.Icon>
                </l.Td>
              </l.Tr>
            ))}
          </l.Table>
          <l.ConfirmButton onClick={() => handleOrderItems()}>Confirm</l.ConfirmButton>
        </l.SubContainer>
      )}
      <l.ButtonSection>
        <Link to={props.BackRoutes} className="btn">
          <RegularButton>Back</RegularButton>
        </Link>
      </l.ButtonSection>
    </Container>
  );
};

export default AddSupplierOrder;
