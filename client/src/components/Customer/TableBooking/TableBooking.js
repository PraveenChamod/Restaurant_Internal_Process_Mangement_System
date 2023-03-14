import React, { useState } from "react";
import Calendar from "react-calendar";
import { TimePicker } from "react-ios-time-picker";
import "react-calendar/dist/Calendar.css";
import { Header } from "../../shared/SharedElements/SharedElements";
import * as l from "./TableBookingElement.js";
import "react-calendar/dist/Calendar.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";


const TableBooking = (props) => {
  const [date, setDate] = useState(new Date());

  const onDateChange = (newDate) => {
    setDate(newDate);
    console.log(newDate);
  };

  const [value, setValue] = useState("10:00");

  const onChange = (timeValue) => {
    setValue(timeValue);
  };

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
            <TimePicker onChange={onChange} value={value} />
            <l.H1>TO</l.H1>
            <TimePicker onChange={onChange} value={value} />
          </l.Div5>
        </l.Div3>
        <l.Div31>
          <l.H1>SELECT TABLE</l.H1>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <l.Item><l.H2>Table on 1 <br/> seats = 2</l.H2></l.Item>
              </Grid>
              <Grid item xs={6} md={4}>
                <l.Item><l.H2>Table on 2 <br/> seats = 2</l.H2></l.Item>
              </Grid>
              <Grid item xs={6} md={4}>
                <l.Item><l.H2>Table on 3 <br/> seats = 2</l.H2></l.Item>
              </Grid>
              <Grid item xs={6} md={4}>
                <l.Item><l.H2>Table on 4 <br/> seats = 4</l.H2></l.Item>
              </Grid>
              <Grid item xs={6} md={4}>
                <l.Item><l.H2>Table on 5 <br/> seats = 4</l.H2></l.Item>
              </Grid>
              <Grid item xs={6} md={4}>
                <l.Item><l.H2>Table on 6 <br/> seats = 4</l.H2></l.Item>
              </Grid>
              <Grid item xs={6} md={4}>
                <l.Item><l.H2>Table on 7 <br/> seats = 5</l.H2></l.Item>
              </Grid>
              <Grid item xs={6} md={4}>
                <l.Item><l.H2>Table on 8 <br/> seats = 5</l.H2></l.Item>
              </Grid>
              <Grid item xs={6} md={4}>
                <l.Item><l.H2>Table on 9 <br/> seats = 8</l.H2></l.Item>
              </Grid>            
            </Grid>
          </Box>
        </l.Div31>
      </l.Div>
      <l.Div6>
        <l.RegularButton>BACK</l.RegularButton>
      <l.RegularButton>CONFORM</l.RegularButton>
      </l.Div6>
    </l.Container>
  );
};

export default TableBooking;
