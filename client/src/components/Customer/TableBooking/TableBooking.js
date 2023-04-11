import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
// import { TimePicker } from "react-ios-time-picker";
import TimePicker from 'react-time-picker';
import { Header } from "../../shared/SharedElements/SharedElements";
import * as l from "./TableBookingElement.js";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import Box from "@mui/material/Box";
import 'react-calendar/dist/Calendar.css';
import Grid from "@mui/material/Grid";
import useAuth from "../../../Hooks/useAuth";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FormControl, MenuItem, Select } from "@mui/material";


const TableBooking = (props) => {

  const[click,setClick] = useState(false);
  const [date, setDate] = useState(new Date());
  const [arrivalTime, setArraivalTime] = useState('00:00');
  const [departureTime,setDepartureTime] = useState('00:00');
  const[Item,setItem] = useState(props.data);
  const [clickedIndex, setClickedIndex] = useState({});
  const[items,setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const[selectItem,setSelectItem] = useState({});
  const[Price,setPrice] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const elements = useElements();
  const stripe = useStripe();
  const{user} = useAuth();
  const PriceRef = useRef(Price);
  const [type,setType] = useState('');

  const handleClick = async (index) =>{
    setClickedIndex(state => ({
      ...state, //copy previous state
      [index]: !state[index] //update value by index key
    }));
    setSelectItem(Item[index]);
  };
  console.log(selectItem);
  const onDateChange = (newDate) => {
    setDate(newDate);
    console.log(newDate);
  };
  const handlearrivalTime=(newTime) =>{
    setArraivalTime(newTime);
  };
  const handledepartureTime=(newTime) =>{
    setDepartureTime(newTime);
  };
  const handleClickCombination = (index)=>{
    const isItemAlreadySelected = items.some(item => item.TableNo === Item[index].TableNo);
    if (isItemAlreadySelected) {
      // Remove the item from the array
      setItems(prevItems => prevItems.filter(item => item.TableNo !== Item[index].TableNo));
      setPrice(Price-Item[index].price)
      PriceRef.current = PriceRef.current - Item[index].price;
    } else {
      // Add the item to the array
      setItems([...items, Item[index]]);
      setPrice(Price+Item[index].price);
      PriceRef.current = PriceRef.current + Item[index].price;
    }
    handleClick(index);
    setClick(true);
    setSelectItem(Item[index]);
    const fetchClientSecret = async () => {
    const data = await axios.post("api/v1/Payment", {
      amount: PriceRef.current,
      receipt_email:user.Email
    });

      setClientSecret(data.data.clientSecret);
    };

    fetchClientSecret();
  };
  
  let Tables = []
  let TableNo = []
  items.forEach(item=>{
    console.log(item.id);
    Tables.push({
      table:item.id
    });
    const tableNo = item.TableNo;
    TableNo.push(tableNo);

  })
  console.log(TableNo);
  const ReserveTable = async (e)=>{
    e.preventDefault();
    try {
      const formData = {Customer:user.id,Tables:Tables,Date:date,ArrivalTime:arrivalTime,DepartureTime:departureTime,amount:Price,TableNo:TableNo,Type:type}
      const res = await axios.post('api/v1/TableReservation',formData);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  }
  const navigate = useNavigate();

  const handleConfirmPayment = async (event) => {
    event.preventDefault();
    console.log("test");
    if (!stripe || !elements || !clientSecret) {
      // Return early if the necessary dependencies haven't loaded yet
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        console.log(error);
        setErrorMessage('Error processing payment.');
      } else {
        await toast.promise(
          ReserveTable(event),
          {
             success:()=>{
                return "Table Reservation is Succeeded";
            },
            error: (err) => `${err.response.data.message}`,
          },
          {
              style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                  fontSize:'1rem',
                  zIndex:'99999999'
              }
          }
        )
        
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Error processing payment.');
    }
  };
  console.log(type);
  return (
    <l.Container>
      <l.Div2></l.Div2>
      <l.Div1>
        <Header>Table Reservation</Header>
      </l.Div1>

      <l.Div>
        <l.Div3>
          <l.Div4>
            <l.H1>PICK DATE</l.H1>
            <Calendar 
              onChange={onDateChange}
              value={date}
              showNeighboringMonth={false}
              locale={"en-US"}
            />
          </l.Div4>
          <l.Div5>
            <l.H1>PICK TIME</l.H1>
            <TimePicker disableClock={true} clearIcon={null} onChange={handlearrivalTime} value={arrivalTime} />
            <l.H1>TO</l.H1>
            <TimePicker disableClock={true} clearIcon={null} onChange={handledepartureTime} value={departureTime} />
          </l.Div5>
          <l.Div5>
          <l.SubHeader>Select Type</l.SubHeader>
            <FormControl sx={{ m: 1, width: "20ch" }}>
                <Select
                    defaultValue={30}
                    inputProps={{
                        name: "Email",
                        id: "uncontrolled-native",
                    }}
                    sx={{
                        color: "white",
                        '.MuiSvgIcon-root ': {
                        fill: "white !important",
                        
                        }
                    }}
                    onChange={e=>setType(e.target.value)}
                >
                <MenuItem value="Dine-in" >Dine In</MenuItem>
                <MenuItem value="Dating" >Dating</MenuItem>
                <MenuItem value="Special-Events" >Special-Events</MenuItem>
              </Select>
            </FormControl>
          </l.Div5>
        </l.Div3>
        <l.Div31>
          <l.H1>SELECT TABLE</l.H1>
          <Box sx={{ flexGrow: 1 , width:'90%' }}>
            <Grid container spacing={0}>
              {
                props.data.map((table,index)=>{
                  return(
                    <l.Table onClick={()=>{handleClickCombination(index)}}>
                        <Grid item xs={6} md={4} >
                          {
                            clickedIndex[index] && click ? 
                                <l.ClickedItem><l.H2>Table on {table.TableNo} <br/> seats = {table.NoOfPersons}<br/> Price : {table.price}</l.H2></l.ClickedItem>
                              :
                                <l.Item><l.H2>Table on {table.TableNo} <br/> seats = {table.NoOfPersons}<br/> Price : {table.price}</l.H2></l.Item>
                          }
                        </Grid>
                    </l.Table>
                  )
                })
              }     
            </Grid>
          </Box>
          <l.Payment>
            <CardElement/>  
          </l.Payment>
        </l.Div31>
      </l.Div>
      <l.Div6>
        <l.RegularButton onClick={handleConfirmPayment}>CONFORM</l.RegularButton>
      </l.Div6>
      <Link to={props.BackRoutes} className="btn">
        <l.RegularButton>BACK</l.RegularButton>
      </Link>
      <br/>
    </l.Container>
  );
};
 
export default TableBooking;
