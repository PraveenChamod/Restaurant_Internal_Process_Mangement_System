import { FormControl, MenuItem, Select, TextField, InputLabel, Card, CardContent, Typography, tableSortLabelClasses } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RegularButton } from "../../shared/SharedElements/Buttons";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import { Div, Div1, Div2, Div3, Div4, Div5, Div6, Div7, Div8, Div9, FormButton, Hr, SubHeader } from "./TableReservationElelments";
import { toast } from "react-hot-toast";
import axios from "axios";
const TableReservationComponent = ({ data }) => {
    let customerName  = data.CustomerName;
    let arrivalTime= data.ArrivalTime;
    let depatureTime = data.DepartureTime;
    let  contactNo= data.CustomerContactNo;
    let bookedDate = data.Date;
    let amount = data.Amount;
    let tables= data.Tables;
    let type =data.Type;
        console.log("table data ddd,", data);

        const confirmReservation = async (e)=>{
            e.preventDefault()
            try {
                await toast.promise(
                    axios.post(`/api/v1/ReservationConfirmation/${data.id}`),
                    {
                        loading:'Confirming Reservation',
                        success:(data)=>{
                            return ` ${data.data?.message} ` || "success";
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
            } catch (error) {
                console.log(error.message);
            }
        }
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
                                
                                />
                                <TextField
                                    id="standard-basic"
                                    label="Type"
                                    variant="standard"
                                    InputLabelProps={{ className: 'textFeild_Label' }}
                                    InputProps={{
                                        style: { color: '#fff' },
                                    }}
                                    sx={{ marginBottom: '10%' }} 
                                    
                                    value = {type}
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
                            <RegularButton onClick={confirmReservation}>
                                Confirm Reservation
                            </RegularButton>
                        </FormControl>
                    </Div6>
                </Div4>
            </Div>
            <Div7>
                <RegularButton>
                    <Link to="/Staff-MemberPendingTable-Reservation-Details" className="btn">
                        Back
                    </Link>
                </RegularButton>
            </Div7>
        </Container>
    );
}
export default TableReservationComponent;