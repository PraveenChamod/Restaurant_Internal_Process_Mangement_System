import { useState } from "react";
import { FormButton, RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import * as l from "./FoodDetailElements";
const FoodDetail = (props) => {
    const[FoodName,setName] = useState(props.food.FoodName);
    const[Category,setCategory] = useState(props.food.Category);
    const[Price,setPrice] = useState(props.food.Price);
    const[Status,setStatus] = useState(props.food.Status);
    return ( 
    <Container>
      <Header>Food Details</Header>
      <l.Div>
        <l.Div1>
            <l.TextFeild 
                type="text" 
                placeholder="Name"
                value={FoodName}
                onChange={e=>setName(e.target.value)}
            />
            <l.TextFeild 
                type="text" 
                placeholder="Category"
                value={Category}
                onChange={e=>setCategory(e.target.value)}
            />
            <l.TextFeild 
                type="text" 
                placeholder="Price"
                value={'Rs.' + Price}
                onChange={e=>setPrice(e.target.value)}
            />
            <l.RadioButtonSection>
                <l.RadioButton>
                    <l.Radio type="radio" name="Availablility" value="Available" onChange={e=>setStatus(e.target.value)} checked = {Status === "Available" ? true : false}/>
                    <l.Label>Available</l.Label>
                </l.RadioButton>
                <l.RadioButton>
                    <l.Radio type="radio" name="Availablility" value="Not Available" onChange={e=>setStatus(e.target.value)} checked = {Status === "Not Available" ? true : false}/>
                    <l.Label>Not Available</l.Label>
                </l.RadioButton>
            </l.RadioButtonSection>
        </l.Div1>
        <l.Div2>
            <l.Sec>
                <FormButton>
                    Delete
                </FormButton>
            </l.Sec>
            <l.Sec>
                <FormButton>
                    Update
                </FormButton>
            </l.Sec>
        </l.Div2>
      </l.Div>
      <l.Div3>
        <RegularButton>
            Back
        </RegularButton>
      </l.Div3>
    </Container>
     );
}
 
export default FoodDetail;