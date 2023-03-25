import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import useFetch from "../../../Hooks/useFetch";
import { RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import * as l from './PendingOrdersElements'
const PendingOrdersComponent = (props) => {
    
    return (  
        <Container>
            <Header>
                Pending Orders
            </Header>
            <l.SubContainer>
                <l.Table>
                    <l.Tr>
                        <l.Th>Customer Name</l.Th>
                        <l.Th>Email</l.Th>
                        <l.Th>Contact No</l.Th>
                        <l.Th>Order Id</l.Th>
                        <l.Th></l.Th>
                    </l.Tr>
                    {
                        props.pendingorders.map(order=>{
                            return(
                                <l.Tr>
                                    <l.Td>{order.customerName}</l.Td>
                                    <l.Td>{order.customerEmail}</l.Td>
                                    <l.Td>{order.ContactNumber}</l.Td>
                                    <l.Td>{order.OrderId}</l.Td>
                                    <l.Td>
                                        <Link to ={`/Staff-MemberOrder-Details/${order.OrderId}`} className="btn">
                                            <l.Icon>
                                                <AiFillEye/>
                                            </l.Icon>
                                        </Link>
                                    </l.Td>
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
 
export default PendingOrdersComponent;