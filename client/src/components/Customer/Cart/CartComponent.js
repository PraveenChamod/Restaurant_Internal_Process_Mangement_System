import { FormButton } from "../../shared/SharedElements/Buttons";
import { Header } from "../../shared/SharedElements/SharedElements";
import * as l from './CartElements';
import profilepic from '../../../Images/person2.jpg';
import Spinner from "../../shared/Spinner/Spinner";
import useFetch from "../../../Hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import styled from "styled-components";
import { MdCheckBox } from 'react-icons/md';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import { AiFillPlusCircle } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import axios from "axios";
import { Link } from "@mui/material";
const CartComponent = ({data}) => {
    const{user}=useAuth();
    console.log(data);
    const[Items,setItem] = useState(data);
    const [clickedIndex, setClickedIndex] = useState({});
    const[selectItem,setSelectItem] = useState();
    const[OrderItem,setOrderItem] = useState({});
    
    const[Quantity,setQuantity] = useState(1);
    const quantityRef = useRef(Quantity);
    const[price,setPrice] = useState();

    
    //Select Item Independelntly
    const handleClick = async (index) =>{
        setClickedIndex(state => ({
        ...state, //copy previous state
        [index]: !state[index] //update value by index key
        }));
        setSelectItem(index);
        setOrderItem(Items[index]);
    };

    //Delete Cart Item
    const deleteCartItem = async ({cartId,foodId})=>{
        try {
            const formData = {cartId,foodId} 
            const res = await axios.patch('api/v1/Customer/RemoveCartItem',formData);
            console.log(res);
        } catch (error) {
            console.log(error.message);
        }
    }
    const selectOne = async (index)=>{
        const item = Items[index];
        const cartId = item.cartId;
        const foodId = item.id;
        console.log(item);
        await deleteCartItem({cartId,foodId});
        handleClick(index);
    }
    
    //Increase Quantity
    const AddQuantity = async ({foodId,quantity})=>{
        try {
        const formData = {foodId,quantity}
          const res = await axios.post('api/v1/Customer/Addtocart',formData);
          console.log(res);
        } catch (error) {
          console.log(error.message);
        }
      }

    const increaseQTY = async(index)=>{
        const item = Items[index];
        const foodId = item.id;
        handleClick(index);
        setQuantity(Quantity+1);
        quantityRef.current = Quantity+1;
        const quantity = quantityRef.current;
        console.log(quantity);
        await AddQuantity({foodId,quantity});
    }
    // console.log(quantity);
    return ( 
        <>
             <l.Container>
            <l.SubContainer>
            <l.SubSection1>
                <l.ProfileImage>
                    <l.Image src={`http://localhost:5000/images/${user?.ProfileImage}`}/>
                </l.ProfileImage>
                <l.Name>
                    {user?.Name}
                </l.Name>
            </l.SubSection1>
            <l.SubSection2>
                <Header>MY CART</Header>
            </l.SubSection2>
            <l.SubSection3>
                <l.Left>
                    {
                        data.map((cart,index)=>{
                            
                            return(
                                <l.CartSection>
                                    {/* <l.SelectIcon onClick={()=>{selectOne(index)}}>
                                        {change && selectItem === index ? <MdCheckBox/> : <MdCheckBoxOutlineBlank />}
                                    </l.SelectIcon> */}
                                    <l.ItemsCard>
                                        <l.FoodImage>
                                            <l.Food src={`http://localhost:5000/Foodimages/${cart.image}`}/>
                                        </l.FoodImage>
                                        <l.Details>
                                            <l.MainText>
                                                <l.FoodName>
                                                    {cart.name}
                                                </l.FoodName>
                                            </l.MainText>
                                            <l.SubText>
                                                {/* <l.Text>
                                                    {cart.Size}
                                                </l.Text> */}
                                                <l.Text>
                                                    Quantity : {Quantity || cart.quantity}
                                                </l.Text>
                                                <l.Text>
                                                    Price : {Quantity * cart.price}
                                                </l.Text>
                                            </l.SubText>
                                        </l.Details>
                                        <l.Icon onClick={()=>increaseQTY(index)}>
                                            <AiFillPlusCircle/>
                                        </l.Icon>
                                        <l.Icon>
                                            <MdDelete onClick={()=>selectOne(index)}/>
                                        </l.Icon>
                                    </l.ItemsCard>
                                </l.CartSection>  
                            )
                        })
                    }
                </l.Left>
                <l.Right>
                    <l.Description>
                        <l.ItemTexts>
                            <l.Label>
                                Item :
                            </l.Label>
                            <l.Data>
                                
                            </l.Data>
                        </l.ItemTexts>
                        <l.ItemTexts>
                            <l.Label>
                                Quantity : {Quantity}
                            </l.Label>
                            <l.Data>
                                
                            </l.Data>
                        </l.ItemTexts>
                        <l.ItemTexts>
                            <l.Label>
                                Total Price : {Quantity * price}
                            </l.Label>
                            <l.Data>
                                
                            </l.Data>
                        </l.ItemTexts>
                        <l.ButtonSection>
                            <Link to='/CustomerPay'>
                                <FormButton>
                                    Order
                                </FormButton>
                            </Link>
                        </l.ButtonSection>
                    </l.Description>
                </l.Right>
            </l.SubSection3>
        </l.SubContainer>
        </l.Container>
        </>
     );
}
 
export default CartComponent;
