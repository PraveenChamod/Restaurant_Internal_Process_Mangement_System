import { AiFillEye } from "react-icons/ai";
import { RegularButton } from "../../shared/SharedElements/Buttons";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import * as l from './SupplierOrderDetailsElements';
const SupplierOrderDetails = (props) => {
    return ( 
        <Container>
            <Header>
                Details of Supplier Orders
            </Header>
                <l.SubContainer>
                    <l.Table>
                        <l.Tr>
                            <l.Th>Item</l.Th>
                            <l.Th>Quantity</l.Th>
                            <l.Th>Date</l.Th>
                            <l.Th></l.Th>
                        </l.Tr>
                        {
                            props.data1.map(row=>{
                                return(
                                    <l.Tr>
                                        <l.Td>{row.Item}</l.Td>
                                        <l.Td>{row.Quantity}</l.Td>
                                        <l.Td>{row.Date}</l.Td>
                                        <l.Icon><AiFillEye/></l.Icon>
                                    </l.Tr>
                                )
                            })
                        }
                    </l.Table>
                </l.SubContainer>
            <l.ButtonSection>
                <RegularButton>
                    Back
                </RegularButton>
            </l.ButtonSection>
        </Container>
     );
}
 
export default SupplierOrderDetails;