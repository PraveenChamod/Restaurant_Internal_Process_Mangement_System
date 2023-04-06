import { useState } from "react";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import { FormButton, RegularButton } from "../../shared/SharedElements/Buttons";
import * as l from "./ViewSupplierOrderDetailsElements";
const ViewSupplierOrderDetailsComponent = (props) => {
    //console.log(props)
    // const[FoodName,setName] = useState(props.food.FoodName);
    // const[Category,setCategory] = useState(props.food.Category);
    // const[Price,setPrice] = useState(props.food.Price);
    // const[Status,setStatus] = useState(props.food.Status);
    return ( 
    <Container>
      <Header>Supplier Order Details</Header>
      <l.Div>
        <l.Div1>
            <l.TextSection>
                <l.Text>
                    Item Name
                </l.Text>
                <l.TextFeild 
                    type="text" 
                    placeholder="Name"
                    // value={FoodName}
                    // onChange={e=>setName(e.target.value)}
                />
            </l.TextSection>
            <l.TextSection>
                <l.Text>
                    Quantity
                </l.Text>
                <l.TextFeild 
                    type="text" 
                    placeholder="Quantity"
                    // value={Category}
                    // onChange={e=>setCategory(e.target.value)}
                />
            </l.TextSection>
            <l.TextSection>
                <l.Text>
                    Date
                </l.Text>
                <l.TextFeild 
                    type="text" 
                    placeholder="Date"
                    // value={'Rs.' + Price}
                    // onChange={e=>setPrice(e.target.value)}
                />
            </l.TextSection>
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
 
export default ViewSupplierOrderDetailsComponent;