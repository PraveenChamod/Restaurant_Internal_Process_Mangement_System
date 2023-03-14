import { useState } from "react";
import { FormButton, RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import * as l from "./FoodDetailElements";
const FoodDetail = (props) => {
    const[FoodName,setName] = useState(props.data1.FoodName);
    const[Category,setCategory] = useState(props.data1.Category);
    const[Price,setPrice] = useState(props.data1.Price);
    const[Status,setStatus] = useState(props.data1.Status);
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
                value={Price}
                onChange={e=>setPrice(e.target.value)}
            />
            <l.RadioButton>
                <l.Radio type="radio" name="Availablility" value="Available" onChange={e=>setStatus(e.target.value)}/>
                <l.Label>Available</l.Label>
            </l.RadioButton>
            <l.RadioButton>
                <l.Radio type="radio" name="Availablility" value="Not Available" onChange={e=>setStatus(e.target.value)}/>
                <l.Label>Not Available</l.Label>
            </l.RadioButton>
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