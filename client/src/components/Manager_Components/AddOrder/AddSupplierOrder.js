import React from "react";
import { Link } from "react-router-dom";
import { FormButton, RegularButton } from "../../shared/SharedElements/Buttons";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import { useState } from "react";
import axios from "axios";
import * as l from "./AddSupplierOrderElement";
import { FaPlus, FaTrash } from "react-icons/fa";
import Popup from "./Popup";
import useAuth from "../../../Hooks/useAuth.js";
import { toast } from "react-hot-toast";
import { FormControl } from "@mui/material";

const AddSupplierOrder = (props) => {
  const { user } = useAuth();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [orderItems, setOrderItems] = useState([]);

  const id = props.data3.data.id;
  console.log(id);
  let Items = [];
  let Supplier;
  let Order = [];
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
      id: selectedItem.ItemId,
      modelid : selectedItem.id
    };
    setOrderItems([...orderItems, newItem]);
    closePopup();
  };

  const removeItem = (itemId) => {
    const newOrderItems = orderItems.filter((item) => item.id !== itemId);
    setOrderItems(newOrderItems);
  };
  console.log(orderItems);
  const itemsBySupplier = orderItems.reduce((acc, item) => {
    const supplierId = item.supplierId;
    if (!acc[supplierId]) {
      acc[supplierId] = [];
    }
    acc[supplierId].push(item);
    return acc;
  }, {});
  console.log(itemsBySupplier);

  let suppliers = {};

orderItems.forEach((stockitem) => {
  const supplierId = stockitem.supplierId;

  if (!suppliers[supplierId]) {
    suppliers[supplierId] = {
      supplier: supplierId,
      items: [],
    };
  }

  suppliers[supplierId].items.push({
    id:stockitem.modelid,
    item: stockitem.id,
    Quantity: stockitem.quantity,
  });
});

for (let supplierId in suppliers) {
  let supplierData = suppliers[supplierId];

  Order.push({
    Supplier: supplierData.supplier,
    Items: supplierData.items,
  });
}


  console.log(orderItems);
  console.log(Items);
  const addOrder = async (e) => {
    try {
      e.preventDefault();
      const formData = {
        Manager: user.id,
        Order:Order
      };
      console.log(formData);
      await toast.promise(
        props.axiosInstance.post("api/v1/SupplierOrder", formData),
        {
          loading: "Order is Placing....",
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
      <l.SubDiv>
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
        <l.FormDiv onSubmit={addOrder}>
          {showPopup && (
            <Popup item={selectedItem} onAdd={addItem} onClose={closePopup} />
          )}
          <l.SubContainer1>
            <l.Table>
              <l.Tr>
                <l.Th>Item Name</l.Th>
                <l.Th>Category</l.Th>
                <l.Th>Unit Price</l.Th>
                <l.Th>Quantity</l.Th>
                <l.Th>Subtotal</l.Th>
                <l.Th></l.Th>
              </l.Tr>
              {orderItems.map((item) => {
                return (
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
                );
              })}
            </l.Table>
            <l.ButtonSection1>
              <FormControl>
                <RegularButton onClick={addOrder}>Submit</RegularButton>
              </FormControl>
            </l.ButtonSection1>
          </l.SubContainer1>
        </l.FormDiv>
        <l.ButtonSection>
          <Link to={props.BackRoutes} className="btn">
            <RegularButton>Back</RegularButton>
          </Link>
        </l.ButtonSection>
      </l.SubDiv>
    </Container>
  );
};

export default AddSupplierOrder;
