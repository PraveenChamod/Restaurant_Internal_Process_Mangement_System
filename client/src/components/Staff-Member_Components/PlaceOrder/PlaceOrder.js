import React,{ useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { RegularButton } from "../../shared/SharedElements/Buttons";

import * as l from "./PlaceOrderElements";

import { Container, Header } from "../../shared/SharedElements/SharedElements";
import axios from "axios";
import { toast } from "react-hot-toast";


const PlaceOrderComponent = (props) => {
    console.log(props.data1);

    const[ContactNumber,setContactNumber] = useState('');
    const[Name,setName] = useState('');
    const [items, setItems] = useState([]);
    const [Price,setPrice] = useState(0);
    const handleItemClick = (item) => {
        setItems([...items, item]);
        setPrice(Price + item.Price );
      };     
    
      let food ;
      let Quantity;
      let Foods = [];

      items.forEach(item=>{
        food=item.id;
        Quantity=item.quantity;
        Foods.push({
            food,
            Quantity
        })
    });

    var response;
    console.log(response);
    const PlaceOrder = async(e)=>{
        e.preventDefault();
        try {
            const formData = {Name:Name,ContactNumber:ContactNumber,Foods:Foods,TotalPrice:Price,Type:"Outlet Order",Status:"Confirm"};
            console.log(formData);
            const res = await axios.post('api/v1/staffmemberorderItem',formData);
            console.log(res);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Container>
        <l.SubSection>
            <Header>
                PLACE ORDER
            </Header>
            <l.FormSection onSubmit={PlaceOrder}>
                <l.Div1>

                <TextField 
                    InputProps={{
                            style: { color: '#fff' },
                            }}
                    id="standard-basic" 
                    label="Customer Name" 
                    variant="standard" 
                    InputLabelProps={{className:'textFeild_Label'}} 
                    sx={{marginBottom:'10%'}} 
                    value={Name}
                    onChange={e=>setName(e.target.value)}
                /> 
                <InputLabel id="ItemList" >Item List</InputLabel>
                <FormControl  sx={{ m: 1, width: "40ch" }} variant="standard">
                             <Select
                        labelId="ItemList"
                            defaultValue={30}
                            inputProps={{
                                name: "role",
                                id: "uncontrolled-native",
                            }}
                            sx={{
                                color: "white",
                                '.MuiSvgIcon-root ': {
                                fill: "white !important",
                                marginBottom:'10%'
                                }
                            }}
                            
                            >
                            {
                                props.data1.map(data=>{
                                    console.log(data.FoodName);
                                    return(
                                        <MenuItem value={data.FoodName} onClick={() => handleItemClick(data)}>
                                            <l.CartSection>
                                                {/* <l.SelectIcon onClick={()=>{selectOne(index)}}>
                                                    {change && selectItem === index ? <MdCheckBox/> : <MdCheckBoxOutlineBlank />}
                                                </l.SelectIcon> */}
                                                <l.ItemsCard>
                                                    <l.FoodImage>
                                                        <l.Food src={`http://localhost:5000/Foodimages/${data.FoodImage}`}/>
                                                    </l.FoodImage>
                                                    <l.Details>
                                                        <l.MainText>
                                                            <l.FoodName>
                                                                {data.FoodName}
                                                            </l.FoodName>
                                                        </l.MainText>
                                                        <l.SubText>
                                                            {/* <l.Text>
                                                                {cart.Size}
                                                            </l.Text> */}
                                                            <l.Text>
                                                                Category : {data.Category}
                                                            </l.Text>
                                                            <l.Text>
                                                                Price : { data.Price}
                                                            </l.Text>
                                                        </l.SubText>
                                                    </l.Details>
                                                </l.ItemsCard>
                                            </l.CartSection>  
                                        </MenuItem>
                                    )
                                })
                            }
                            </Select> 
                        </FormControl>
                <l.Div3>
                    <l.Text1>
                    Total Price
                    <br/>
                    <l.Price>
                      Rs. {Price}
                    </l.Price>
                    </l.Text1>
                </l.Div3>
                </l.Div1>
                <l.Div2>
                 <FormControl  sx={{ m: 1, width: "35ch" }} variant="standard">
                     <TextField 
                        id="standard-basic" 
                        label="Contact No" 
                        variant="standard" 
                        InputLabelProps={{className:'textFeild_Label'}} 
                        sx={{marginBottom:'10%'}} 
                        value={ContactNumber} 
                        onChange={e=>setContactNumber(e.target.value)} 
                        InputProps={{
                            style: { color: '#fff' },
                            }}
                     />
                  </FormControl>
                    <l.ItemSection>
                    {
                                items.map(data=>{
                                    console.log(data.FoodName);
                                    return(
                                        <MenuItem value={data.FoodName} onClick={() => handleItemClick(data)}>
                                            <l.CartSection>
                                                {/* <l.SelectIcon onClick={()=>{selectOne(index)}}>
                                                    {change && selectItem === index ? <MdCheckBox/> : <MdCheckBoxOutlineBlank />}
                                                </l.SelectIcon> */}
                                                <l.ItemsCard>
                                                    <l.FoodImage>
                                                        <l.Food src={`http://localhost:5000/Foodimages/${data.FoodImage}`}/>
                                                    </l.FoodImage>
                                                    <l.Details>
                                                        <l.MainText>
                                                            <l.FoodName>
                                                                {data.FoodName}
                                                            </l.FoodName>
                                                        </l.MainText>
                                                        <l.SubText>
                                                            {/* <l.Text>
                                                                {cart.Size}
                                                            </l.Text> */}
                                                            <l.Text>
                                                                Category : {data.Category}
                                                            </l.Text>
                                                            <l.Text>
                                                                Price : { data.Price}
                                                            </l.Text>
                                                        </l.SubText>
                                                    </l.Details>
                                                </l.ItemsCard>
                                            </l.CartSection>  
                                        </MenuItem>
                                    )
                                })
                            }    
                    </l.ItemSection>
                  <l.ButtonSection>
                     <RegularButton >PLACE ORDER</RegularButton>
                  </l.ButtonSection>
                </l.Div2>
            </l.FormSection>
        </l.SubSection>
        <l.ButtonSection1>
          <RegularButton >Back</RegularButton>
        </l.ButtonSection1>

    </Container>

      );
}
 
export default PlaceOrderComponent;

