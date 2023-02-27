import { FormButton } from "../../shared/SharedElements/Buttons";
import { Header } from "../../shared/SharedElements/SharedElements";
import * as l from './CartElements';
import profilepic from '../../../Images/person2.jpg';
const CartComponent = (props) => {
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
        <l.Container>
            <l.SubContainer>
            <l.SubSection1>
                <l.ProfileImage>
                    <l.Image src={profilepic}/>
                </l.ProfileImage>
                <l.Name>
                    Miss. Jenny 
                </l.Name>
            </l.SubSection1>
            <l.SubSection2>
                <Header>MY CART</Header>
            </l.SubSection2>
            <l.SubSection3>
                <l.Left>
                    {
                        props.cartData1.map(cart=>{
                            return(
                                <l.ItemsCard>
                                    <l.FoodImage>
                                        <l.Food src={cart.image}/>
                                    </l.FoodImage>
                                    <l.Details>
                                        <l.MainText>
                                            <l.FoodName>
                                                {cart.Name}
                                            </l.FoodName>
                                        </l.MainText>
                                        <l.SubText>
                                            <l.Text>
                                                {cart.Size}
                                            </l.Text>
                                            <l.Text>
                                                {cart.Qty}
                                            </l.Text>
                                            <l.Text>
                                                {cart.Price}
                                            </l.Text>
                                        </l.SubText>
                                    </l.Details>
                                </l.ItemsCard>
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
        </l.Container>
     );
}
 
export default CartComponent;
