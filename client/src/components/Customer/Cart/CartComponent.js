import { FormButton } from "../../shared/SharedElements/Buttons";
import { Header } from "../../shared/SharedElements/SharedElements";
import * as l from './CartElements';
import profilepic from '../../../Images/person2.jpg';
import Spinner from "../../shared/Spinner/Spinner";
import useFetch from "../../../Hooks/useFetch";
import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import styled from "styled-components";
import { MdCheckBox } from 'react-icons/md';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import { AiFillPlusCircle } from 'react-icons/ai';
const CartComponent = (props) => {
    const {data,isPending} = useFetch('api/v1/Customer/MyCart');
    const{loadUser,loading,user}=useAuth();
    const[change,setChange] = useState(false);
    const[Items,setItem] = useState(data);
    const [clickedIndex, setClickedIndex] = useState({});
    const[selectItem,setSelectItem] = useState();
    const[OrderItem,setOrderItem] = useState({});
    console.log(Items);
    //Select Item Independelntly
    const handleClick = async (index) =>{
        setClickedIndex(state => ({
        ...state, //copy previous state
        [index]: !state[index] //update value by index key
        }));
        setSelectItem(index);
        setOrderItem(Items[index]);
    };

    const handleChange = ()=>{
        if(!change){
            setChange(true);
        }else{
            setChange(false);
        }
    }
    const selectOne = (index)=>{
        handleChange();
        handleClick(index);
    }
    
    const Label = [
        {
            label:'Item'
        },
        {
            label:'Category'
        },
        {
            label:'Quantity'
        },
        {
            label:'Total Price'
        }
    ]
    return ( 
        <>
            {isPending && <Spinner/>}
            {data && <l.Container>
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
                                    <l.SelectIcon onClick={()=>{selectOne(index)}}>
                                        {change && selectItem === index ? <MdCheckBox/> : <MdCheckBoxOutlineBlank />}
                                    </l.SelectIcon>
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
                                                    Quantity : {cart.quantity}
                                                </l.Text>
                                                <l.Text>
                                                    Price : {cart.price}
                                                </l.Text>
                                            </l.SubText>
                                        </l.Details>
                                        <l.Plus>
                                            <AiFillPlusCircle/>
                                        </l.Plus>
                                    </l.ItemsCard>
                                </l.CartSection>  
                            )
                        })
                    }
                </l.Left>
                <l.Right>
                    <l.Description>
                        <l.ItemTexts>
                            {
                                Label.map(e=>{
                                    return(
                                        <l.Label>
                                            {e.label}
                                        </l.Label>
                                    )
                                })
                            }
                            <l.Data>
                                
                            </l.Data>
                        </l.ItemTexts>
                        <l.ButtonSection>
                            <FormButton>Order</FormButton>
                        </l.ButtonSection>
                    </l.Description>
                </l.Right>
            </l.SubSection3>
        </l.SubContainer>
        </l.Container>}
        </>
     );
}
 
export default CartComponent;
