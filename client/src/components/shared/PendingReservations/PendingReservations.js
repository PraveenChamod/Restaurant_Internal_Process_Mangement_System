import { AiFillEye } from "react-icons/ai";
import useFetch from "../../../Hooks/useFetch";
import { RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import * as l from './PendingReservationElements'
const PendingReservationComponent = (props) => {
    return (  
        <Container>
            <Header>
            Pending Reservation
            </Header>
            <l.SubContainer>
                <l.Table>
                    <l.Tr>
                        <l.Th>Customer Name</l.Th>
                        <l.Th>Table No</l.Th>
                        <l.Th>Contact No</l.Th>
                        <l.Th>Date & Time</l.Th>
                        <l.Th></l.Th>
                    </l.Tr>
                    {/* +++++++++++++++++++++++++++++++++++++++set with table reservation data+++++++++++++++++++++++++++++++++++++++++++++++ */}
                    {/* {
                        props.data.map(data=>{
                            return(
                                <l.Tr>
                                    <l.Td>{data.FoodName}</l.Td>
                                    <l.Td>{data.Category}</l.Td>
                                    <l.Td>{data.Price}</l.Td>
                                    <l.Td>{data.Status}</l.Td>
                                    <l.Td><l.Icon><AiFillEye/></l.Icon></l.Td>
                                </l.Tr>
                            )
                        })
                    } */}
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
 
export default PendingReservationComponent;