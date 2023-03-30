import { Container, Header } from "../shared/SharedElements/SharedElements";
import * as l from './SupplierItemsElement' 
import { FormButton, RegularButton } from "../shared/SharedElements/Buttons";
import { Link } from "react-router-dom";
import { BsFiletypePdf } from "react-icons/bs";
import { useState } from "react";
const SupplierItemsComponent = (props) => {
    const[pdf,setPdf] = useState(null);
    const handleUpload = (e)=>{
        setPdf(e.target.files[0]);
    }
    return ( 
        <Container>
            <l.Div1>
                <Header>Providing Items</Header>
                <l.Section>
                    <l.FormSection>
                        <l.Preview>
                            
                        </l.Preview>
                        <l.PrintButton>
                            <l.Icon>
                                <BsFiletypePdf/>
                                <input type='file' id='file' accept="image/*" onChange={handleUpload}/>
                            </l.Icon>
                        </l.PrintButton>
                    </l.FormSection>
                    <l.ButtonSection>
                        <FormButton>Add</FormButton>
                    </l.ButtonSection>
                </l.Section>
                <l.Div3>
                    <RegularButton>
                        <Link to={props.BackRoutes} className="btn">
                            Back
                        </Link>
                    </RegularButton>
                </l.Div3> 
            </l.Div1>
        </Container>
     );
}
 
export default SupplierItemsComponent;