import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  Card,
  CardContent,
  Typography,
  tableSortLabelClasses,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegularButton } from "../../shared/SharedElements/Buttons";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import * as l from "./TableReservationElelments";
import { toast } from "react-hot-toast";
import axios from "axios";
import notfound from "../../../Images/notFound/NoResults.png";

const TableReservationComponent = ({ data }) => {
  let customerName = data.CustomerName;
  let Email = data.Email;
  let arrivalTime = data.ArrivalTime;
  let depatureTime = data.DepartureTime;
  let contactNo = data.CustomerContactNo;
  let bookedDate = data.Date;
  let amount = data.Amount;
  let tables = data.Tables;
  let type = data.Type;
  const navigate = useNavigate();
  const confirmReservation = async (e) => {
    e.preventDefault();
    const formData = {
      customerName: customerName,
      customerEmail: Email,
      ContactNo: contactNo,
      Tables: tables,
      totalPrice: amount,
      arrivalTime: arrivalTime,
      depatureTime: depatureTime,
      type: type,
      bookedDate: bookedDate,
    };
    try {
      await toast.promise(
        axios.post(`/api/v1/ReservationConfirmation/${data.id}`, formData),
        {
          loading: "Confirming Reservation",
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
        navigate("/Staff-MemberPendingTable-Reservation-Details");
      }, 2000);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Container>
      <Header>Table Reservation</Header>
      <l.Div>
        <l.Div2>
          <l.Div1>
            <FormControl>
              <TextField
                id="standard-basic"
                label="Customer Name"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                InputProps={{
                  style: { color: "#fff" },
                }}
                sx={{ marginBottom: "10%" }}
                value={customerName}
              />
              <TextField
                id="standard-basic"
                label="Arraival Time"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                InputProps={{
                  style: { color: "#fff" },
                }}
                sx={{ marginBottom: "10%" }}
                value={arrivalTime}
              />
              <TextField
                id="standard-basic"
                label="Departure Time"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                InputProps={{
                  style: { color: "#fff" },
                }}
                sx={{ marginBottom: "10%" }}
                value={depatureTime}
              />
              <TextField
                id="standard-basic"
                label="Type"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                InputProps={{
                  style: { color: "#fff" },
                }}
                sx={{ marginBottom: "10%" }}
                value={type}
              />
              {type == "Dating" ? (
                <l.ItemSection>
                  {data.Items.length == 0 ? (
                    <l.NotFound>
                      <l.Image1 src={notfound} />
                      <l.Text2>No Items Selected</l.Text2>
                    </l.NotFound>
                  ) : (
                    data.Items.map((data, index) => {
                      console.log(data);
                      return (
                        <l.CartSection>
                          <l.ItemsCard>
                            <l.FoodImage>
                              <l.Food
                                src={`http://localhost:5000/tableitemimages/${data.ItemImage}`}
                              />
                            </l.FoodImage>
                            <l.Details>
                              <l.MainText>
                                <l.FoodName>{data.ItemName}</l.FoodName>
                              </l.MainText>
                            </l.Details>
                          </l.ItemsCard>
                        </l.CartSection>
                      );
                    })
                  )}
                </l.ItemSection>
              ) : type == "Special-Events" ? (
                <>
                  <TextField
                    id="standard-basic"
                    label="Event Name"
                    variant="standard"
                    InputLabelProps={{ className: "textFeild_Label" }}
                    InputProps={{
                      style: { color: "#fff" },
                    }}
                    sx={{ marginBottom: "10%" }}
                    value={data.eventName}
                  />
                  <TextField
                    id="standard-basic"
                    label="Package"
                    variant="standard"
                    InputLabelProps={{ className: "textFeild_Label" }}
                    InputProps={{
                      style: { color: "#fff" },
                    }}
                    sx={{ marginBottom: "10%" }}
                    value={data.Package}
                  />
                </>
              ) : null}
            </FormControl>
          </l.Div1>
          <l.Div1>
            <TextField
              id="standard-basic"
              label="Contact No."
              variant="standard"
              InputLabelProps={{ className: "textFeild_Label" }}
              InputProps={{
                style: { color: "#fff" },
              }}
              sx={{ marginBottom: "10%" }}
              value={contactNo}
            />

            <TextField
              id="standard-basic"
              label="Booked Date"
              variant="standard"
              InputLabelProps={{ className: "textFeild_Label" }}
              InputProps={{
                style: { color: "#fff" },
              }}
              sx={{ marginBottom: "10%" }}
              value={bookedDate}
            />
            <TextField
              id="standard-basic"
              label="Amount"
              variant="standard"
              InputLabelProps={{ className: "textFeild_Label" }}
              InputProps={{
                style: { color: "#fff" },
              }}
              sx={{ marginBottom: "10%" }}
              value={amount}
            />
            <Card variant="outlined" sx={{ marginBottom: "10%" }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: "1.1em" }}
                  color="text.secondary"
                  gutterBottom
                >
                  Tables
                </Typography>
                {tables.map((table) => {
                  return (
                    <Typography variant="h6" component="div">
                      {/**should me mapped */}
                      Table No {table.TableNo}
                    </Typography>
                  );
                })}
              </CardContent>
            </Card>
          </l.Div1>
        </l.Div2>
        <l.Div4>
          <l.Div6>
            <FormControl>
              <RegularButton onClick={confirmReservation}>
                Confirm Reservation
              </RegularButton>
            </FormControl>
          </l.Div6>
        </l.Div4>
      </l.Div>
      <l.Div7>
        <RegularButton>
          <Link
            to="/Staff-MemberPendingTable-Reservation-Details"
            className="btn"
          >
            Back
          </Link>
        </RegularButton>
      </l.Div7>
    </Container>
  );
};
export default TableReservationComponent;
