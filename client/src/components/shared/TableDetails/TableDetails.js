import { AiFillEye } from "react-icons/ai";
import useFetch from "../../../Hooks/useFetch";
import { RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import * as l from './TableDetailsElements'
const TableDetails = () => {
    return ( 
        <Container>
            <Header>
            Details Of All Tables
            </Header>
            <l.SubContainer>
                <l.Table>
                    <l.Tr>
                        <l.Th>Table No</l.Th>
                        <l.Th>Maximum No of Persons</l.Th>
                        <l.Th>Reservation Fee</l.Th>
                        <l.Th>Status</l.Th>
                    </l.Tr>
                    {/* When connect to fronend to backend use map function in hear */}
                    <l.Tr>
                        <l.Td></l.Td>
                        <l.Td></l.Td>
                        <l.Td></l.Td>
                        <l.Td></l.Td>
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
 
export default TableDetails;