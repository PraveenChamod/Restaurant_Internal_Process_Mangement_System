import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RegularButton } from "../../shared/SharedElements/Buttons";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import * as l from './OrderDetailsElements';
const OrderDetails = (props) => {
    console.log(props.data3);

    return ( 
        <Container>
            <Header>
                Supplier Orders
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
                            props.data3.map(row=>{
                                return(
                                    <l.Tr>
                                        <l.Td>{row.Items.ItemName}</l.Td>
                                        <l.Td>{row.Items.Quantity}</l.Td>
                                        <l.Td>{row.Date}</l.Td>
                                       <l.Td><Link to={`/SupplierConformOrder/${row.id}` } className="btn">
                                            <l.Icon><AiFillEye/></l.Icon>
                                        </Link></l.Td>   
                                    </l.Tr>
                                )
                            })
                        }
                    </l.Table>
                </l.SubContainer>
            <l.ButtonSection>
                <Link to={props.BackRoutes} className="btn">
                    <RegularButton>
                        Back
                    </RegularButton>
                </Link>
            </l.ButtonSection>
        </Container>
     );
}
 
export default OrderDetails;