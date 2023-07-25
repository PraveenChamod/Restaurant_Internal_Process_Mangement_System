import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../Hooks/useFetch";
import { RegularButton } from "../../shared/SharedElements/Buttons";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import * as l from "./OrderDetailsElements";
const OrderDetailsComponent = (props) => {
  console.log(props.data);
  let customerName = props.data.customerName;
  let address = props.data.Address;
  let contactNo = props.data.ContactNumber;
  let paymentMethod = props.data.food[0].PaymentMethod;
  let totalPrice = props.data.TotalPrice;
  let customerEmail = props.data.customerEmail;
  const [Email, setEmail] = useState();
  let food = props.data.food;
  const [deliverer, setDeliverer] = useState(0);
  const { data, isPending } = useFetch("/api/v1/AvailableDeliverers");

  const navigate = useNavigate();
  const assignDeliverer = async (e) => {
    e.preventDefault();
    try {
      const formDate = {
        Email: Email,
        customerName: customerName,
        Address: address,
        ContactNo: contactNo,
        paymentMethod: paymentMethod,
        totalPrice: totalPrice,
        Items: food,
        customerEmail: customerEmail,
      };
      await toast.promise(
        axios.post(`/api/v1/OrderConfirmation/${props.data.OrderId}`, formDate),
        {
          loading: "Confirming Order....",
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
        navigate("/Staff-MemberPendingOrder-Details");
      }, 2000);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <l.Container>
      <l.Header>Order Details</l.Header>
      <l.Div>
        <l.Div2 onSubmit={assignDeliverer}>
          <l.Div1>
            <FormControl>
              <TextField
                id="standard-basic"
                label="Customer Name"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginBottom: "10%" }}
                value={customerName}
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
                value={address}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
              <l.ItemSection>
                {props.data.food.map((data) => {
                  console.log(data.FoodName);
                  return (
                    <MenuItem value={data.FoodName}>
                      <l.CartSection>
                        {/* <l.SelectIcon onClick={()=>{selectOne(index)}}>
                                                            {change && selectItem === index ? <MdCheckBox/> : <MdCheckBoxOutlineBlank />}
                                                        </l.SelectIcon> */}
                        <l.ItemsCard>
                          <l.FoodImage>
                            <l.Food
                              src={`https://resto-f3zu.onrender.com/${
                                data.Foodid == null
                                  ? "offerimages"
                                  : "Foodimages"
                              }/${data.image}`}
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
                              <l.Text>Quantity : {data.quantity}</l.Text>
                            </l.SubText>
                          </l.Details>
                        </l.ItemsCard>
                      </l.CartSection>
                    </MenuItem>
                  );
                })}
              </l.ItemSection>
            </FormControl>
          </l.Div1>
          <l.Div1>
            <TextField
              id="standard-basic"
              label="Contact No."
              variant="standard"
              InputLabelProps={{ className: "textFeild_Label" }}
              sx={{ marginBottom: "10%" }}
              value={contactNo}
              InputProps={{
                style: { color: "#fff" },
              }}
            />
            {props.data.OrderType === "Online Order" ? (
              <TextField
                id="standard-basic"
                label="Payment Method"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginBottom: "10%" }}
                value={paymentMethod}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
            ) : null}
            <TextField
              id="standard-basic"
              label="Total Price"
              variant="standard"
              InputLabelProps={{ className: "textFeild_Label" }}
              sx={{ marginBottom: "10%" }}
              value={totalPrice}
              InputProps={{
                style: { color: "#fff" },
              }}
            />
            {props.data.OrderType === "Online Order" ? (
              <>
                <l.SubHeader>Select Deliverer</l.SubHeader>
                <FormControl>
                  <Select
                    defaultValue={30}
                    inputProps={{
                      name: "Email",
                      id: "uncontrolled-native",
                    }}
                    sx={{
                      color: "white",
                      ".MuiSvgIcon-root ": {
                        fill: "white !important",
                      },
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                  >
                    {isPending && (
                      <Oval
                        height={150}
                        width={150}
                        color="#FFBF00"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#FFBF00ed"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                      />
                    )}
                    {data?.data?.deliverers.map((deliverer) => {
                      return (
                        <MenuItem value={deliverer.Email}>
                          {deliverer.Email}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </>
            ) : null}
          </l.Div1>
        </l.Div2>
        {/* <l.Div3>
                    <l.Div8>
                        <l.Hr></l.Hr>
                    </l.Div8>
                    <l.Div9>
                        <l.Hr></l.Hr>
                    </l.Div9>                   
                </l.Div3> */}
        <l.Div4>
          <l.Div5></l.Div5>
          <l.Div6>
            <FormControl>
              <RegularButton onClick={assignDeliverer}>
                Confirm Order
              </RegularButton>
            </FormControl>
          </l.Div6>
        </l.Div4>
      </l.Div>
      <l.Div7>
        <RegularButton>
          <Link to={props.BackRoutes} className="btn">
            Back
          </Link>
        </RegularButton>
      </l.Div7>
    </l.Container>
  );
};
export default OrderDetailsComponent;
