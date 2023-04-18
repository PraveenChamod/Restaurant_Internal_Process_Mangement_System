import { FormControl, MenuItem, Select, TextField, InputLabel, Card, CardContent, Typography, tableSortLabelClasses } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RegularButton } from "../../shared/SharedElements/Buttons";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import { Div, Div1, Div2, Div3, Div4, Div5, Div6, Div7, Div8, Div9, FormButton, Hr, SubHeader } from "./TableReservationElelments";
const TableReservationComponent = ({ data }) => {
    const [customerName,setCustomerName]  = useState(data.CustomerName)
    const [arrivalTime,setArrivalTime] = useState(data.ArrivalTime)
    const [depatureTime,setDepatureTime] = useState(data.DepartureTime)
    const [contactNo,setContactNo] = useState(data.CustomerContactNo)
    const [bookedDate,setBookedDate] = useState(data.Date)
    const [amount,setAmount] = useState(data.Amount) 
    const [tables,setTables] = useState(data.Tables)
        console.log("table data ddd,", data);
    return (
        <Container>
            <Header>Table Reservation</Header>
            <Div>
                <Div2>
                    <Div1>
                        <FormControl>
                            <TextField
                                id="standard-basic"
                                label="Customer Name"
                                variant="standard"
                                InputLabelProps={{ className: 'textFeild_Label' }}
                                InputProps={{
                                    style: { color: '#fff' },
                                }}
                                sx={{ marginBottom: '10%' }} 
                                value = {customerName}
                                onChange={e=>{setCustomerName(e.target.value)}}
                                />
                            <TextField
                                id="standard-basic"
                                label="Arraival Time"
                                variant="standard"
                                InputLabelProps={{ className: 'textFeild_Label' }}
                                InputProps={{
                                    style: { color: '#fff' },
                                }}
                                sx={{ marginBottom: '10%' }} 
                                
                                value={arrivalTime}
                                onChange = {e=>setArrivalTime(e.target.value)}
                                
                                />
                            <TextField
                                id="standard-basic"
                                label="Departure Time"
                                variant="standard"
                                InputLabelProps={{ className: 'textFeild_Label' }}
                                InputProps={{
                                    style: { color: '#fff' },
                                }}
                                sx={{ marginBottom: '10%' }} 
                                
                                value = {depatureTime}
                                onChange = { e=>setDepatureTime(e.target.value)}
                                />

                        </FormControl>
                    </Div1>
                    <Div1>
                        <TextField
                            id="standard-basic"
                            label="Contact No."
                            variant="standard"
                            InputLabelProps={{ className: 'textFeild_Label' }}
                            InputProps={{
                                style: { color: '#fff' },
                            }}
                            sx={{ marginBottom: '10%' }} 
                            
                            value ={contactNo}
                            onChange = { e=>setContactNo(e.target.value)}

                            />

                        <TextField
                            id="standard-basic"
                            label="Booked Date"
                            variant="standard"
                            InputLabelProps={{ className: 'textFeild_Label' }}
                            InputProps={{
                                style: { color: '#fff' },
                            }}
                            sx={{ marginBottom: '10%' }}
                            
                            value={bookedDate}
                            onChange = {e=>setBookedDate(e.target.value)}

                            />
                        <TextField
                            id="standard-basic"
                            label="Amount"
                            variant="standard"
                            InputLabelProps={{ className: 'textFeild_Label' }}
                            InputProps={{
                                style: { color: '#fff' },
                            }}
                            sx={{ marginBottom: '10%' }} 
                            value = {amount}
                            onChange = {e=>e.target.value}
                            />
                        <Card variant="outlined" sx={{ marginBottom: '10%' }}>

                            <CardContent>
                                <Typography sx={{ fontSize: '1.1em' }} color="text.secondary" gutterBottom>
                                    Tables
                                </Typography>
                                {
                                    tables.map((table)=>{
                                        return(
                                           <Typography variant="h6" component="div">{/**should me mapped */}
                                   Table No {table.TableNo}
                                </Typography> 
                                        )
                                    })
                                }
                                
                            </CardContent>
                        </Card>
                    </Div1>
                </Div2>
                <Div4>
                    <Div6>
                        <FormControl>
                            <RegularButton>
                                <Link to="./login" className="btn">
                                    Confirm Order
                                </Link>
                            </RegularButton>
                        </FormControl>
                    </Div6>
                </Div4>
            </Div>
            <Div7>
                <RegularButton>
                    <Link to="./login" className="btn">
                        Back
                    </Link>
                </RegularButton>
            </Div7>
        </Container>
    );
}
export default TableReservationComponent;