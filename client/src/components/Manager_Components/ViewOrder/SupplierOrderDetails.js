import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { RegularButton } from "../../shared/SharedElements/Buttons";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import * as l from './SupplierOrderDetailsElements';
const SupplierOrderDetails = (props) => {
    const {user} = useAuth();
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
                            props.data3.map(row=>{
                                return(
                                    <l.Tr>
                                        <l.Td>{row.Items}</l.Td>
                                        <l.Td>{row.Quantity}</l.Td>
                                        <l.Td>{row.Date}</l.Td>
                                        {
                                            user.Role === "Manager" ? 
                                                <Link to={`/ManagerView-supllierorder-details/${row.id}` } className="btn">
                                                    <l.Icon><AiFillEye/></l.Icon>
                                                </Link>
                                            :
                                            null
                                        }
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
 
export default SupplierOrderDetails;