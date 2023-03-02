import { AiFillEye } from "react-icons/ai";
import useFetch from "../../../Hooks/useFetch";
import { RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import * as l from './PendingOrdersElements'
const PendingOrdersComponent = () => {
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
                        <l.Th>Time</l.Th>
                        <l.Th>Order Id</l.Th>
                    </l.Tr>
                    {/* When connect to fronend to backend use map function in hear */}
                    <l.Tr>
                        <l.Td></l.Td>
                        <l.Td></l.Td>
                        <l.Td></l.Td>
                        <l.Td></l.Td>
                        <l.Td><l.Icon><AiFillEye/></l.Icon></l.Td>
                    </l.Tr>
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
 
export default PendingOrdersComponent;