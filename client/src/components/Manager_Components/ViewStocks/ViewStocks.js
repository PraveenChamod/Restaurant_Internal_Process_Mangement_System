import { AiFillEye } from "react-icons/ai";
import useFetch from "../../../Hooks/useFetch";
import { RegularButton } from "../../shared/SharedElements/Buttons";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import * as l from './ViewStocksElements'
const ViewStocksComponent = () => {
    return ( 
        <Container>
            <Header>
            Stock Details
            </Header>
            <l.SubContainer>
                <l.Table>
                    <l.Tr>
                        <l.Th>Item Name</l.Th>
                        <l.Th>Category</l.Th>
                        <l.Th>Qty</l.Th>
                        <l.Th>Price</l.Th>
                        <l.Th>Supplier ID</l.Th>
                        <l.Th></l.Th>
                    </l.Tr>
                    {/* When connect to fronend to backend use map function in hear */}
                    <l.Tr>
                        <l.Td></l.Td>
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
 
export default ViewStocksComponent;