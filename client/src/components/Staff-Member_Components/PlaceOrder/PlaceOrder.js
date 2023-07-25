import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { RegularButton } from "../../shared/SharedElements/Buttons";
import * as l from "./PlaceOrderElements";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import notfound from "../../../Images/notFound/NoResults.png";
const PlaceOrderComponent = (props) => {
  const [clickedIndex, setClickedIndex] = useState({});
  const [selectItem, setSelectItem] = useState();
  const [OrderItem, setOrderItem] = useState({});
  const [ContactNumber, setContactNumber] = useState("");
  const [Name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [offers, setOffers] = useState([]);
  const [join, setJoin] = useState([]);
  const [TotalPrice, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const handleClick = async (index) => {
    setClickedIndex((state) => ({
      ...state, //copy previous state
      [index]: !state[index], //update value by index key
    }));
    setSelectItem(index);
    setOrderItem(join[index]);
  };
  const removeItem = (index, item) => {
    const newJoin = [...join];
    newJoin.splice(index, 1);
    setJoin(newJoin);
    setPrice(
      TotalPrice -
        (item.Price * item.quantity || item.SpecialPrice * item.quantity)
    );
  };
  const increaseQTY = (index, item) => {
    const updatedJoin = join.map((data, i) => {
      if (i === index) {
        // Update quantity for clicked item
        return { ...data, quantity: (data.quantity || 1) + 1 };
      } else {
        return data;
      }
    });
    setJoin(updatedJoin);
    handleClick(index);
    setQuantity((state) => ({
      ...state,
      [index]: (state[index] || 1) + 1, // update quantity only for clicked item
    }));
    setPrice(TotalPrice + (item.Price || item.SpecialPrice));
  };
  const decreseQTY = (index, item) => {
    const updatedJoin = join.map((data, i) => {
      if (i === index) {
        // Update quantity for clicked item
        return { ...data, quantity: data.quantity - 1 };
      } else {
        return data;
      }
    });
    setJoin(updatedJoin);
    handleClick(index);
    setQuantity((state) => ({
      ...state,
      [index]: state[index] - 1, // update quantity only for clicked item
    }));
    setPrice(TotalPrice - (item.Price || item.SpecialPrice));
  };
  const handleItemClick = (item) => {
    const newItem = { ...item, quantity: 1 };
    setPrice(TotalPrice + item.Price);
    setJoin([...join, newItem]);
  };
  const handleOfferClick = (item) => {
    const newItem = { ...item, quantity: 1 };
    setPrice(TotalPrice + item.SpecialPrice);
    setJoin([...join, newItem]);
  };
  let food;
  let Quantity;
  let Foods = [];
  let offer;

  join.forEach((item) => {
    if (item.FoodName !== undefined) {
      food = item.id;
      Quantity = item.quantity;
      Foods.push({
        food,
        Quantity,
      });
    }
  });

  join.forEach((item) => {
    if (item.OfferName !== undefined) {
      offer = item.id;
      Quantity = item.quantity;
      Foods.push({
        offer,
        Quantity,
      });
    }
  });
  var response;
  console.log(join);
  const PlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const formData = { Name, ContactNumber, Foods, TotalPrice };
      await toast.promise(
        axios.post("api/v1/staffmemberorderItem", formData),
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
      setTimeout(() => {
        navigate("/Staff-MemberDashBoard");
      }, 2000);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      <l.SubSection>
        <Header>PLACE ORDER</Header>
        <l.FormSection onSubmit={PlaceOrder}>
          <l.Div1>
            <TextField
              InputProps={{
                style: { color: "#fff" },
              }}
              id="standard-basic"
              label="Customer Name"
              variant="standard"
              InputLabelProps={{ className: "textFeild_Label" }}
              sx={{ marginBottom: "10%" }}
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputLabel id="ItemList" sx={{ color: "#fff" }}>
              Item List
            </InputLabel>
            <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
              <Select
                labelId="ItemList"
                defaultValue={30}
                inputProps={{
                  name: "role",
                  id: "uncontrolled-native",
                }}
                sx={{
                  color: "white",
                  ".MuiSvgIcon-root ": {
                    fill: "white !important",
                    marginBottom: "10%",
                  },
                }}
              >
                {props.data1.map((data) => {
                  console.log(data.FoodName);
                  return (
                    <MenuItem
                      value={data.FoodName}
                      onClick={() => handleItemClick(data)}
                    >
                      <l.CartSection>
                        {/* <l.SelectIcon onClick={()=>{selectOne(index)}}>
                                                    {change && selectItem === index ? <MdCheckBox/> : <MdCheckBoxOutlineBlank />}
                                                </l.SelectIcon> */}
                        <l.ItemsCard>
                          <l.FoodImage>
                            <l.Food
                              src={`https://resto-f3zu.onrender.com/Foodimages/${data.FoodImage}`}
                            />
                          </l.FoodImage>
                          <l.Details>
                            <l.MainText>
                              <l.FoodName>{data.FoodName}</l.FoodName>
                            </l.MainText>
                            <l.SubText>
                              {/* <l.Text>
                                                                {cart.Size}
                                                            </l.Text> */}
                              <l.Text>Category : {data.Category}</l.Text>
                              <l.Text>Price : {data.Price}</l.Text>
                            </l.SubText>
                          </l.Details>
                        </l.ItemsCard>
                      </l.CartSection>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <InputLabel id="ItemList" sx={{ color: "#fff" }}>
              Offer List
            </InputLabel>
            <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
              <Select
                labelId="ItemList"
                defaultValue={30}
                inputProps={{
                  name: "role",
                  id: "uncontrolled-native",
                }}
                sx={{
                  color: "white",
                  ".MuiSvgIcon-root ": {
                    fill: "white !important",
                    marginBottom: "10%",
                  },
                }}
              >
                {props.data2.map((data) => {
                  return (
                    <MenuItem
                      value={data.OfferName}
                      onClick={() => handleOfferClick(data)}
                    >
                      <l.CartSection>
                        {/* <l.SelectIcon onClick={()=>{selectOne(index)}}>
                                                    {change && selectItem === index ? <MdCheckBox/> : <MdCheckBoxOutlineBlank />}
                                                </l.SelectIcon> */}
                        <l.ItemsCard>
                          <l.FoodImage>
                            <l.Food
                              src={`https://resto-f3zu.onrender.com/offerimages/${data.OfferImage}`}
                            />
                          </l.FoodImage>
                          <l.Details>
                            <l.MainText>
                              <l.FoodName>{data.OfferName}</l.FoodName>
                            </l.MainText>
                            <l.SubText>
                              {/* <l.Text>
                                                                {cart.Size}
                                                            </l.Text> */}
                              <l.Text>Category : {data.Category}</l.Text>
                              <l.Text>Price : {data.SpecialPrice}</l.Text>
                            </l.SubText>
                          </l.Details>
                        </l.ItemsCard>
                      </l.CartSection>
                    </MenuItem>
                  );
                })}
              </Select>
              {/* </FormControl> */}
              {/* total price div3 */}
              {/* <FormControl  sx={{ m: 1, width: "35ch" }} variant="standard"> */}
              <TextField
                id="standard-basic"
                label="Contact No"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ margin: "10% 0" }}
                value={ContactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
            </FormControl>
          </l.Div1>
          <l.Div2>
            <l.ItemSection>
              {join.length == 0 ? (
                <l.NotFound>
                  <l.Image1 src={notfound} />
                  <l.Text2>No Items Selected</l.Text2>
                </l.NotFound>
              ) : (
                join.map((data, index) => {
                  console.log(data.FoodName);
                  return (
                    <l.CartSection>
                      <l.ItemsCard>
                        <l.FoodImage>
                          <l.Food
                            src={`https://resto-f3zu.onrender.com/${
                              data.FoodName == null
                                ? `offerimages/${data.OfferImage}`
                                : `Foodimages/${data.FoodImage}`
                            }`}
                          />
                        </l.FoodImage>
                        <l.Details>
                          <l.MainText>
                            <l.FoodName>
                              {data.FoodName || data.OfferName}
                            </l.FoodName>
                          </l.MainText>
                          <l.SubText>
                            {/* <l.Text>
                                                                {cart.Size}
                                                            </l.Text> */}
                            <l.Text>Category : {data.Category}</l.Text>
                            <l.Text>
                              Price :{" "}
                              {(data.Price || data.SpecialPrice) *
                                quantity[index] ||
                                data.Price ||
                                data.SpecialPrice}
                            </l.Text>
                            {quantity[index] && (
                              <l.Text>Quantity : {quantity[index]}</l.Text>
                            )}
                          </l.SubText>
                        </l.Details>
                        <l.IconSection>
                          <l.Icon onClick={() => decreseQTY(index, data)}>
                            <AiFillMinusCircle />
                          </l.Icon>
                          <l.Icon onClick={() => increaseQTY(index, data)}>
                            <AiFillPlusCircle />
                          </l.Icon>
                          <l.Icon onClick={() => removeItem(index, data)}>
                            <MdDelete />
                          </l.Icon>
                        </l.IconSection>
                      </l.ItemsCard>
                    </l.CartSection>
                  );
                })
              )}
            </l.ItemSection>

            {/* fff */}
            <l.Div3>
              <l.Text1>
                Total Price
                <br />
                <l.Price>Rs. {TotalPrice}</l.Price>
              </l.Text1>
            </l.Div3>
            <l.ButtonSection>
              <RegularButton>PLACE ORDER</RegularButton>
            </l.ButtonSection>
          </l.Div2>
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

export default PlaceOrderComponent;
