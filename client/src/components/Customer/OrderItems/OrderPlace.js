import { FormButton, RegularButton } from "../../shared/SharedElements/Buttons";
import { Header } from "../../shared/SharedElements/SharedElements";
import * as l from './OrderPlaceElements';
import { useEffect, useRef, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { AiFillPlusCircle } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import img from "../../../Images/restoLogodark.png";
import { toast } from "react-hot-toast";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const OrderPlace = ({data}) => {
    const{user}=useAuth();
    const Customer = user.id;
    const[paymentMethod,setPaymentMethod] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const elements = useElements();
    const stripe = useStripe();
    

    let food ;
    let offer;
    let Quantity;
    let Foods = [];
    let TotalPrice = 0;

    data.forEach(item=>{
        if(item.Foodid != null){
            food=item.Foodid;
            Quantity=item.quantity;
            Foods.push({
                food,
                Quantity
            })
        }
        else if(item.Offerid !== null){
            offer=item.Offerid;
            Quantity=item.quantity;
            Foods.push({
                offer,
                Quantity
            })
        }
    });

    data.forEach(element => {
        TotalPrice += (element.quantity * element.price);
        console.log(TotalPrice);
    });

    const PlaceOrder = async(e)=>{
        e.preventDefault();
        try {
            const formData = {Customer:Customer,Foods:Foods,paymentMethod:paymentMethod,TotalPrice:TotalPrice,Type:"Online Order"};
            console.log(formData);
            const res = await axios.post('api/v1/OrderItem',formData);
            toast.success('Order Placed Successfully');
            setTimeout(() => {
                navigate('/CustomerPlace-Order');
            }, 2000);
            console.log(res);
        } catch (error) {
            console.log(error.message);
        }
    }

    

  const navigate = useNavigate();
  useEffect(() => {
    const fetchClientSecret = async () => {
        console.log(TotalPrice);
      const data = await axios.post("api/v1/Payment", {
        amount: TotalPrice,
        receipt_email:user.Email
      });

      setClientSecret(data.data.clientSecret);
    };

    fetchClientSecret();
    console.log("clientSecret is >>>>", clientSecret);
  }, []);

  const handleConfirmPayment = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      // Return early if the necessary dependencies haven't loaded yet
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        console.log(error);
        setErrorMessage('Error processing payment.');
      } else {
        PlaceOrder(event);
        toast.success('Order Placed Successfully');
        setTimeout(() => {
            navigate('/CustomerPlace-Order');
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Error processing payment.');
    }
  };
    return ( 
        <>
            <l.Container>
            <l.SubContainer>
            <l.SubSection1>
                <l.OrderUserDetails>
                    <l.ProfileImage>
                        <l.Image src={`http://localhost:5000/images/${user?.ProfileImage}`}/>
                    </l.ProfileImage>
                    <l.UserDetails>
                        Delivered To : {user?.Name}
                    </l.UserDetails>
                    <l.UserDetails>
                        Contact Number : {user?.ContactNumber}
                    </l.UserDetails>
                    <l.UserDetails>
                        Address To : {user?.Address}
                    </l.UserDetails>
                    <l.UserDetails>
                        Email : {user?.Email}
                    </l.UserDetails>
                </l.OrderUserDetails>
                <l.LogoSection>
                    <l.Logo src = {img}/>
                </l.LogoSection>
            </l.SubSection1>
            <l.SubSection3>
                <l.Left> 
                    {
                        data.map((cart)=>{
                            return(
                                <l.CartSection>
                                    <l.ItemsCard>
                                        <l.FoodImage>
                                            <l.Food src={`http://localhost:5000/${cart.Foodid == null ? 'offerimages' : 'Foodimages'}/${cart.image}`}/>
                                        </l.FoodImage>
                                        <l.Details>
                                            <l.MainText>
                                                <l.FoodName>
                                                    {cart.name}
                                                </l.FoodName>
                                            </l.MainText>
                                            <l.SubText>
                                                <l.Text>
                                                    Quantity : {cart.quantity}
                                                </l.Text>
                                                <l.Text>
                                                    Price : {cart.quantity * cart.price}
                                                </l.Text>
                                            </l.SubText>
                                        </l.Details>
                                    </l.ItemsCard>
                                </l.CartSection>  
                            )
                        })
                    }
                </l.Left>
                <l.Right >
                    <l.Description>
                        <Header style={{fontSize:'24px'}}> Order Summery </Header>
                        <l.TextSection>
                            <l.ItemTexts> Total Amount : </l.ItemTexts>
                            <l.ItemTexts> {'Rs.' + TotalPrice} </l.ItemTexts>
                        </l.TextSection>
                        <l.TextSection>
                            <l.ItemTexts> Select Payment Method </l.ItemTexts>
                        </l.TextSection>
                        <l.RadioButtonSection>
                            <l.RadioButton>
                                <l.Radio type="radio" name="paymentMethod" value="Cash On Delivery" onChange={e=>setPaymentMethod(e.target.value)}/>
                                <l.Label>Cash On Delivery</l.Label>
                            </l.RadioButton>
                            <l.RadioButton>
                                <l.Radio type="radio" name="paymentMethod" value="Card Payments" onChange={e=>setPaymentMethod(e.target.value)}/>
                                <l.Label>Card Payment</l.Label>
                            </l.RadioButton>
                            {
                                paymentMethod === "Card Payments" ? 
                                    <CardElement/>
                                :
                                null
                            }
                        </l.RadioButtonSection>
                        <l.ButtonSection>
                            <FormButton style={{width:'200px'}} onClick={paymentMethod === 'Cash On Delivery' ? PlaceOrder : handleConfirmPayment}>
                                Place Order
                            </FormButton>
                        </l.ButtonSection>
                    </l.Description>
                </l.Right>
            </l.SubSection3>
        </l.SubContainer>
            <Link to ='/CustomerMyCart' className="btn">
                <RegularButton>
                    Back
                </RegularButton>
            </Link>
        </l.Container>
        </>
     );
}
 
export default OrderPlace;