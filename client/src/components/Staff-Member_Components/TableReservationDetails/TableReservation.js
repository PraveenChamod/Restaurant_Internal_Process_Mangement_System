import { FormControl, MenuItem, Select, TextField,InputLabel } from "@mui/material";
import { Link } from "react-router-dom";
import { RegularButton } from "../../shared/SharedElements/Buttons";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import { Div, Div1, Div2, Div3, Div4, Div5, Div6, Div7, Div8, Div9, FormButton, Hr, SubHeader } from "./TableReservationElelments";
const TableReservationComponent = () => {


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
                                InputLabelProps={{className:'textFeild_Label'}} 
                                sx={{marginBottom:'10%'}} />
                            <TextField 
                                id="standard-basic" 
                                label="Arraival Time" 
                                variant="standard" 
                                InputLabelProps={{className:'textFeild_Label'}} 
                                sx={{marginBottom:'10%'}} />
                            <TextField 
                                id="standard-basic" 
                                label="Departure Time" 
                                variant="standard" 
                                InputLabelProps={{className:'textFeild_Label'}} 
                                sx={{marginBottom:'10%'}} />
                                                 
                        </FormControl>
                    </Div1>
                    <Div1>
                        <TextField 
                            id="standard-basic" 
                            label="Contact No." 
                            variant="standard" 
                            InputLabelProps={{className:'textFeild_Label'}} 
                            sx={{marginBottom:'10%'}} />
                        <InputLabel id="demo-simple-select-label">Table No</InputLabel>
                        <TextField 
                                id="standard-basic" 
                                label="Booked Date" 
                                variant="standard" 
                                InputLabelProps={{className:'textFeild_Label'}} 
                                sx={{marginBottom:'10%'}} />
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