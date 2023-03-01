import { FormButton, RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import * as l from "./OfferDetailsElements";
const OfferDetails = () => {
    return ( 
        <Container>
      <Header>Food Details</Header>
      <l.Div>
        <l.Div1>
            <l.TextFeild type="text" placeholder="Meal Name"/>
            <l.TextFeild type="text" placeholder="Special Price"/>
            <l.TextFeild type="text" placeholder="Validity"/>
            <l.TextFeild type="text" placeholder="Status(Available/Not)"/>
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