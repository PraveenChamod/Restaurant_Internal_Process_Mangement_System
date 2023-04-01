import { useState } from "react";
import { FormButton, RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import * as l from "./OfferDetailsElements";
const OfferDetails = (props) => {
    console.log(props.offer);
    const[OfferName,setOfferName] = useState(props.offer.OfferName);
    const[SpecialPrice,setSpecialPrice] = useState(props.offer.SpecialPrice);
    const[Validity,setValidity] = useState(props.offer.Validity);
    const[Status,setStatus] = useState(props.offer.Status);
    return ( 
        <Container>
      <Header>Food Details</Header>
      <l.Div>
        <l.Div1>
            <l.TextFeild type="text" placeholder="Meal Name" value={OfferName} onChange={e=>setOfferName(e.target.value)}/>
            <l.TextFeild type="text" placeholder="Special Price" value={SpecialPrice} onChange={e=>setSpecialPrice(e.target.value)}/>
            <l.TextFeild type="text" placeholder="Validity" value={Validity} onChange={e=>setValidity(e.target.value)}/>
            <l.TextFeild type="text" placeholder="Status(Available/Not)" value={Status} onChange={e=>setStatus(e.target.value)}/>
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
 
export default OfferDetails;