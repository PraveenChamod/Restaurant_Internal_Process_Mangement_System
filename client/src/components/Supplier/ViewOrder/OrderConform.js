import { FormButton, RegularButton } from "../../shared/SharedElements/Buttons";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import { useState } from "react";
import * as l from "./OrderConformElement";

const OrderConform = (props) => {
  const[Items,setItems] = useState(props.data2.Items);
  const[Quantity,setQuantity] = useState(props.data2.Quantity);
  const[Date,setDate] = useState(props.data2.Date);

  return (
    <Container>
      <Header>Food Details</Header>
      <l.Div>
        <l.Div1>
            <l.TextFeild 
                type="text" 
                placeholder="Items"
                value={Items}
                onChange={e=>setItems(e.target.value)}
            />
            <l.TextFeild 
                type="text" 
                placeholder="Quantity"
                value={Quantity}
                onChange={e=>setQuantity(e.target.value)}
            />
            <l.TextFeild 
                type="text" 
                placeholder="Date"
                value={Date}
                onChange={e=>setDate(e.target.value)}
            />
        </l.Div1>
        <l.Div2>
            <l.Sec>
                <FormButton>
                    Conform
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
};

export default OrderConform;