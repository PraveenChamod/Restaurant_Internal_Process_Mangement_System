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
import { Link, useNavigate } from "react-router-dom";
import { BsPlusCircleFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
const PlaceOrderComponent = (props) => {
    const [clickedIndex, setClickedIndex] = useState({});
    const[selectItem,setSelectItem] = useState();
    const[OrderItem,setOrderItem] = useState({});
    const[ContactNumber,setContactNumber] = useState('');
    const[Name,setName] = useState('');
    const [items, setItems] = useState([]);
    const [offers,setOffers] = useState([]);
    const [join,setJoin] = useState([]);
    const [TotalPrice,setPrice] = useState(0);
    const[quantity,setQuantity] = useState(1);
    const navigate = useNavigate();
    const handleClick = async (index) =>{
        setClickedIndex(state => ({
        ...state, //copy previous state
        [index]: !state[index] //update value by index key
        }));
        setSelectItem(index);
        setOrderItem(join[index]);
    };
    const increaseQTY = (index,item)=>{
        handleClick(index);
        setQuantity(quantity + 1);
        console.log(item.Price || item.SpecialPrice);
        setPrice(TotalPrice + item.Price || item.SpecialPrice)
    }
    const handleItemClick = (item) => {
        setItems([...items, item]);
        setPrice(TotalPrice + item.Price);
        setJoin([...join,item]);
      };     
    const handleOfferClick = (item) => {
        setOffers([...offers, item]);
        setPrice(TotalPrice + item.SpecialPrice);
        setJoin([...join,item]);
    };
      let food ;
      let Quantity;
      let Foods = [];
      let offer;
      
        items.forEach(item=>{
            food=item.id;
            Quantity=item.quantity;
            Foods.push({
                food,
                Quantity
            })
        });

        offers.forEach(item=>{
            offer=item.id;
            Quantity=item.quantity;
            Foods.push({
                offer,
                Quantity
            })
        });
    var response;
    console.log(join);
    const PlaceOrder = async(e)=>{
        e.preventDefault();
        try {
            const formData = {Name,ContactNumber,Foods,TotalPrice};
            await toast.promise(
                axios.post('api/v1/staffmemberorderItem',formData),
                {
                    loading:'Order is Placing....',
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
            setTimeout(() => {
                navigate('/Staff-MemberDashBoard');
            }, 2000);
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
                <InputLabel id="ItemList" sx={{color:'#fff'}} >Item List</InputLabel>
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
                                (props.data1).map(data=>{
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
                        <InputLabel id="ItemList" sx={{color:'#fff'}} >Offer List</InputLabel>
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
                                (props.data2).map(data=>{
                                    return(
                                        <MenuItem value={data.OfferName} onClick={() => handleOfferClick(data)}>
                                            <l.CartSection>
                                                {/* <l.SelectIcon onClick={()=>{selectOne(index)}}>
                                                    {change && selectItem === index ? <MdCheckBox/> : <MdCheckBoxOutlineBlank />}
                                                </l.SelectIcon> */}
                                                <l.ItemsCard>
                                                    <l.FoodImage>
                                                        <l.Food src={`http://localhost:5000/offerimages/${data.OfferImage}`}/>
                                                    </l.FoodImage>
                                                    <l.Details>
                                                        <l.MainText>
                                                            <l.FoodName>
                                                                {data.OfferName}
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
                                                                Price : { data.SpecialPrice}
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
                      Rs. {TotalPrice}
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
                                join.map((data,index)=>{
                                    console.log(data.FoodName);
                                    return(
                                        <l.CartSection>
                                                {/* <l.SelectIcon onClick={()=>{selectOne(index)}}>
                                                    {change && selectItem === index ? <MdCheckBox/> : <MdCheckBoxOutlineBlank />}
                                                </l.SelectIcon> */}
                                                <l.ItemsCard>
                                                    <l.FoodImage>
                                                        <l.Food src={`http://localhost:5000/${data.FoodName == null ? `offerimages/${data.OfferImage}` : `Foodimages/${data.FoodImage}`}`}/>
                                                    </l.FoodImage>
                                                    <l.Details>
                                                        <l.MainText>
                                                            <l.FoodName>
                                                                {data.FoodName || data.OfferName}
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
                                                                Price : { data.Price || data.SpecialPrice}
                                                            </l.Text>
                                                            <l.Text>
                                                                Quantity : {quantity}
                                                            </l.Text>
                                                        </l.SubText>
                                                    </l.Details>
                                                    <l.IconSection>
                                                        <l.Icon onClick={()=>increaseQTY(index,data)}>
                                                            <BsPlusCircleFill/>
                                                        </l.Icon>
                                                        <l.Icon>
                                                            <MdDelete/>
                                                        </l.Icon>
                                                    </l.IconSection>
                                                </l.ItemsCard>
                                            </l.CartSection>  
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
            <Link to={props.BackRoutes} className="btn">
                <RegularButton >Back</RegularButton>
            </Link>
        </l.ButtonSection1>

    </Container>

      );
}
 
export default PlaceOrderComponent;

