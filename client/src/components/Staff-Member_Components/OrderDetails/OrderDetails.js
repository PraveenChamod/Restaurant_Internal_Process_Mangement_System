import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { RegularButton } from "../../shared/SharedElements/Buttons";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import { Div, Div1, Div2, Div3, Div4, Div5, Div6, Div7, Div8, Div9, FormButton, Hr, SubHeader } from "./OrderDetailsElements";
const OrderDetailsComponent = () => {


    return (
        <Container>
            <Header>Order Details</Header>
            <Div>
                <Div2>
                    <Div1>
                        <FormControl>
                            <TextField id="standard-basic" label="Customer Name" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                            <TextField id="standard-basic" label="Address" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                            <Select
                            defaultValue={30}
                            inputProps={{
                                name: "role",
                                id: "uncontrolled-native",
                            }}
                            sx={{
                                color: "white",
                                '.MuiSvgIcon-root ': {
                                fill: "white !important",
                                }
                            }}
                            
                            >
                                <MenuItem value={1} >Deliverer</MenuItem>
                                <MenuItem value={2} >Supplier</MenuItem>
                                <MenuItem value={3} >Staff-Member</MenuItem>
                            </Select>                       
                        </FormControl>
                    </Div1>
                    <Div1>
                        <TextField id="standard-basic" label="Contact No." variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                        <TextField id="standard-basic" label="Payment Method" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                        <TextField id="standard-basic" label="Total Price" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                    </Div1>
                </Div2>
                <Div3>
                    <Div8>
                        <Hr></Hr>
                    </Div8>
                    <Div9>
                        <Hr></Hr>
                    </Div9>                   
                </Div3>
                <Div4>
                    <Div5>
                        <SubHeader>Select Deliverer</SubHeader>
                        <FormControl>
                            <Select
                                defaultValue={30}
                                inputProps={{
                                    name: "role",
                                    id: "uncontrolled-native",
                                }}
                                sx={{
                                    color: "white",
                                    '.MuiSvgIcon-root ': {
                                    fill: "white !important",
                                    }
                                }}
                                >
                                <MenuItem value={1} >Deliverer</MenuItem>
                                <MenuItem value={2} >Supplier</MenuItem>
                                <MenuItem value={3} >Staff-Member</MenuItem>
                            </Select> 
                        </FormControl>
                    </Div5>
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
export default OrderDetailsComponent;