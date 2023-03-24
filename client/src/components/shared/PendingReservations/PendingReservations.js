import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
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
                        <l.Th>Contact No</l.Th>
                        <l.Th>Arrival Time</l.Th>
                        <l.Th>Departure Time</l.Th>
                        <l.Th>Booked Date</l.Th>
                        <l.Th></l.Th>
                    </l.Tr>
                    {/* +++++++++++++++++++++++++++++++++++++++set with table reservation data+++++++++++++++++++++++++++++++++++++++++++++++ */}
                    {
                        props.data.map(data=>{
                            console.log(data);
                            return(
                                <l.Tr>
                                    <l.Td>{data.CustomerName}</l.Td>
                                    <l.Td>{data.CustomerContactNo}</l.Td>
                                    <l.Td>{data.ArrivalTime}</l.Td>
                                    <l.Td>{data.DepartureTime}</l.Td>
                                    <l.Td>{data.Date}</l.Td>
                                    <Link to={`/Staff-MemberTable-Reservation-Details/${data.id}`} className="btn">
                                        <l.Td>
                                            <l.Icon>
                                                <AiFillEye/>
                                            </l.Icon>
                                        </l.Td>
                                    </Link>
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
 
export default PendingReservationComponent;