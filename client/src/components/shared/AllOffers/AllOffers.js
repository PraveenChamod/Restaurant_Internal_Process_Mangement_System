import { AiFillEye } from "react-icons/ai";
import useFetch from "../../../Hooks/useFetch";
import { RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import * as l from './AllOffersElements'
const AllOffersComponent = () => {
    return ( 
        <Container>
            <Header>
                Food Details
            </Header>
            <l.SubContainer>
                <l.Table>
                    <l.Tr>
                        <l.Th>Meal Name</l.Th>
                        <l.Th>Special Price</l.Th>
                        <l.Th>Validity</l.Th>
                        <l.Th>Status</l.Th>
                        <l.Th></l.Th>
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
 
export default AllOffersComponent;