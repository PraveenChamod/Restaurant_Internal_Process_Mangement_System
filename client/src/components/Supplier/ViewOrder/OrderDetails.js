import { AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FormButton, RegularButton } from "../../shared/SharedElements/Buttons";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import * as l from "./OrderDetailsElements";
import { toast } from "react-hot-toast";
import axios from "axios";
import notfound from "../../../Images/notFound/NoResults.png";
import { useEffect, useState } from "react";
const OrderDetails = (props) => {
  const data = props.data3[0];
  const navigate = useNavigate();
  const [totalPrice,setTotalPrice] = useState(0);
  let price = 0;
  console.log(totalPrice);
  const confirmOrder = async (e) => {
    e.preventDefault();
    try {
      data.Item.map(item=>{
        price += (item.Quantity * item.Price);
        setTotalPrice(price);
      })
      const formData = {id:data.orderId,Name:data.managerName,Email:data.managerEmail,ContactNumber:data.managerContactNumber,Items:data.Item,totalPrice:totalPrice}
      await toast.promise(
        axios.patch("api/v1/stockorderconfirmation", formData),
        {
          loading: "Order is Confirming...",
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
  return (
    <Container>
      <Header>Supplier Orders</Header>
      <l.SubContainer>
        <l.Sec1>
          <l.ProfileImage>
            <l.Image
              src={`http://localhost:5000/images/${props.data3[0].managerImage}`}
            />
          </l.ProfileImage>
          <l.UserDetails>
            <l.TextSection>
              <l.Label>Name</l.Label>
              <l.Colon>:</l.Colon>
              <l.Value>{props.data3[0].managerName}</l.Value>
            </l.TextSection>
            <l.TextSection>
              <l.Label>Email</l.Label>
              <l.Colon>:</l.Colon>
              <l.Value>{props.data3[0].managerEmail}</l.Value>
            </l.TextSection>
            <l.TextSection>
              <l.Label>Contact Number</l.Label>
              <l.Colon>:</l.Colon>
              <l.Value>{props.data3[0].managerContactNumber}</l.Value>
            </l.TextSection>
          </l.UserDetails>
        </l.Sec1>
        <l.Sec2>
          <l.SubSec1 onSubmit={confirmOrder}>
            <l.SubHeader>Pending Orders</l.SubHeader>
            {props.data3[0].OrderStatus == "Pending" ? (
              <>
                {props.data3[0].Item.map((item) => {
                  return (
                    <l.ItemCart>
                      <l.TextSection1>
                        <l.Label>Item Name</l.Label>
                        <l.Colon>:</l.Colon>
                        <l.Value>{item.ItemName}</l.Value>
                      </l.TextSection1>
                      <l.TextSection1>
                        <l.Label>Quantity</l.Label>
                        <l.Colon>:</l.Colon>
                        <l.Value>{item.Quantity}</l.Value>
                      </l.TextSection1>
                      <l.TextSection1>
                        <l.Label>Price</l.Label>
                        <l.Colon>:</l.Colon>
                        <l.Value>{item.Price}</l.Value>
                      </l.TextSection1>
                    </l.ItemCart>
                  );
                })}
                <l.ButtonSection>
                  <FormButton>Confirm</FormButton>
                </l.ButtonSection>
              </>
            ) : (
              <l.ItemCart1>
                <l.Image1 src={notfound} />
                <l.Text>No Results Found</l.Text>
              </l.ItemCart1>
            )}
          </l.SubSec1>
          <l.SubSec2>
            <l.SubHeader>Confirmed Orders</l.SubHeader>
            {props.data3[0].OrderStatus == "Confirm" ? (
              <>
                {props.data3[0].Item.map((item) => {
                  return (
                    <l.ItemCart>
                      <l.TextSection1>
                        <l.Label>Item Name</l.Label>
                        <l.Colon>:</l.Colon>
                        <l.Value>{item.ItemName}</l.Value>
                      </l.TextSection1>
                      <l.TextSection1>
                        <l.Label>Quantity</l.Label>
                        <l.Colon>:</l.Colon>
                        <l.Value>{item.Quantity}</l.Value>
                      </l.TextSection1>
                      <l.TextSection1>
                        <l.Label>Price</l.Label>
                        <l.Colon>:</l.Colon>
                        <l.Value>{item.Price}</l.Value>
                      </l.TextSection1>
                    </l.ItemCart>
                  );
                })}
                
              </>
            ) : (
              <l.ItemCart1>
                <l.Image1 src={notfound} />
                <l.Text>No Results Found</l.Text>
              </l.ItemCart1>
            )}
          </l.SubSec2>
        </l.Sec2>
      </l.SubContainer>
      <l.ButtonSection>
        <Link to={props.BackRoutes} className="btn">
          <RegularButton>Back</RegularButton>
        </Link>
      </l.ButtonSection>
    </Container>
  );
};

export default OrderDetails;
