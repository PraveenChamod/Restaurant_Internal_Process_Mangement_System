import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../../Hooks/useFetch";
import { RegularButton } from "../../shared/SharedElements/Buttons";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import { Div, Div1, Div2, Div3, Div4, Div5, Div6, Div7, Div8, Div9, FormButton, Hr, SubHeader } from "./OrderDetailsElements";
const OrderDetailsComponent = () => {

    const [customerName,setCustomerName] = useState('')
    const [address,setAdress] = useState('')
    const [contactNo,setContactNo] = useState('')
    const [paymentMethod,setPaymentMethod] = useState('')
    const [totalPrice,setTotalPrice] = useState(0)
    const [Items,setItem] = useState([]);

    const[deliverer,setDeliverer] = useState();
    const{data,isPending} = useFetch('/api/v1/AvailableDeliverers');
    console.log(data);
    return (
        <Container>
            <Header>Order Details</Header>
            <Div>
                <Div2> 
                    <Div1>
                        <FormControl>
                            <TextField id="standard-basic" label="Customer Name" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} value={customerName}/>
                            <TextField id="standard-basic" label="Address" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} value={address} />

                            {/* <Select
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
                            
                            */}
                        {/**      */  }
                        <l.Left>
                            {
                                // Items.map((food)=>{
                                //     return(
                                //     /** #### */
                                //     <l.CartSection>
                                //     {/* <l.SelectIcon onClick={()=>{selectOne(index)}}>
                                //         {change && selectItem === index ? <MdCheckBox/> : <MdCheckBoxOutlineBlank />}
                                //     </l.SelectIcon> */}
                                //     <l.ItemsCard>
                                //         <l.FoodImage>
                                //             <l.Food src={`http://localhost:5000/Foodimages/${food.image}`}/>
                                //         </l.FoodImage>
                                //         <l.Details>
                                //             <l.MainText>
                                //                 <l.FoodName>
                                //                     {food.FoodName}
                                //                 </l.FoodName>
                                //             </l.MainText>
                                //             <l.SubText>
                                //                 {/* <l.Text>
                                //                     {cart.Size}
                                //                 </l.Text> */}
                                //                 <l.Text>
                                //                     Quantity : {food.quantity}
                                //                 </l.Text>
                                               
                                //             </l.SubText>
                                //         </l.Details>
                                       
                                //     </l.ItemsCard>
                                // </l.CartSection>  
                                //     /** #### */
                                    
                                //     )
                                // })
                            }
                            </l.Left>
                        </FormControl>
                    </Div1>
                    <Div1>
                        <TextField id="standard-basic" label="Contact No." value={contactNo} variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                        <TextField id="standard-basic" label="Payment Method" value={paymentMethod} variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                        <TextField id="standard-basic" label="Total Price" value={totalPrice} variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
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
                            {
                                isPending && <Oval
                                                height={150}
                                                width={150}
                                                color="#FFBF00"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                                visible={true}
                                                ariaLabel='oval-loading'
                                                secondaryColor="#FFBF00ed"
                                                strokeWidth={2}
                                                strokeWidthSecondary={2}
                                            />
                            }
                            {
                                data && <>
                                            {
                                                data?.data?.deliverers.map((deliverer,index)=>{
                                                    return(
                                                        <MenuItem value={index} >{deliverer.Email}</MenuItem>
                                                    )
                                                })
                                            }
                                </>
                            }
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