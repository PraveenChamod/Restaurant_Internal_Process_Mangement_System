import { useState } from "react";
import styled from "styled-components";
import { ChefImage } from "../../Images/InnerUi/chef.png";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import { InputLabel, MenuItem, NativeSelect, Select } from "@mui/material";
import { FormButton, RegularButton } from "../shared/SharedElements/Buttons";
import { img } from "../../Images/restoLogodark.png";
import { GrMapLocation } from "react-icons/gr";
import { BsHourglassSplit } from "react-icons/bs";
import * as l from "./DeliverElement";
import { Container } from "../shared/SharedElements/SharedElements";
import { Header } from "../shared/SharedElements/SharedElements";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import { TiTick } from "react-icons/ti";
import { FaMapMarkedAlt } from "react-icons/fa";
const DeliverComponent = (props) => {
  console.log(props.data.OrderId);
  const [click, setClick] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/v1/Deliverer/ConfirmDelivery/${props.data.OrderId}`
      );
      console.log(res);
      setClick(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Container>
      <l.SubSection>
        <Header>ORDER DETAILS</Header>
        <l.FormSection>
          <l.Div1>
            <FormControl sx={{ m: 1, width: "35ch" }} variant="standard">
              <TextField
                id="standard-basic"
                label="Customer Name"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginBottom: "10%" }}
                value={props.data.customerName}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
              <TextField
                id="standard-basic"
                label="Address"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginBottom: "10%" }}
                value={props.data.Address}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
            </FormControl>
            <Link to={`/DelivererMap/${props.data.OrderId}`} className="btn">
              <l.Icon>
                <FaMapMarkedAlt />
              </l.Icon>
            </Link>
            <l.ItemSection>
              {props.data.food.map((food) => {
                return (
                  <l.CartSection>
                    <l.ItemsCard>
                      <l.FoodImage>
                        <l.Food
                          src={`http://localhost:5000/${
                            food.Foodid == null ? "offerimages" : "Foodimages"
                          }/${food.image}`}
                        />
                      </l.FoodImage>
                      <l.Details>
                        <l.MainText>
                          <l.FoodName>{food.FoodName}</l.FoodName>
                        </l.MainText>
                        <l.SubText>
                          <l.Text>Quantity : {food.quantity}</l.Text>
                        </l.SubText>
                      </l.Details>
                    </l.ItemsCard>
                  </l.CartSection>
                );
              })}
            </l.ItemSection>
          </l.Div1>
          <l.Div2>
            <FormControl sx={{ m: 1, width: "35ch" }} variant="standard">
              <TextField
                id="standard-basic"
                label="Contact No"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginBottom: "10%" }}
                value={props.data.ContactNumber}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
              <TextField
                id="standard-basic"
                label="Payment Method"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginBottom: "10%" }}
                value={props.data.food[0].PaymentMethod}
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
                value={props.data.TotalPrice}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
            </FormControl>
            <l.IconSection>
              <l.Icon1>{click ? <TiTick /> : <BsHourglassSplit />}</l.Icon1>
              <l.Text>{click ? "Confirm" : "Pending"}</l.Text>
            </l.IconSection>
            <l.ButtonSection>
              <FormButton onClick={handleSubmit}>CONFIRM</FormButton>
            </l.ButtonSection>
          </l.Div2>
        </l.FormSection>
      </l.SubSection>
      <l.ButtonSection1>
        <Link to="/DelivererAllOrderDetails" className="btn">
          <RegularButton>Back</RegularButton>
        </Link>
      </l.ButtonSection1>
    </Container>
  );
};
export default DeliverComponent;
