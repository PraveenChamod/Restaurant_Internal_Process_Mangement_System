import PendingReservationComponent from "../../components/shared/PendingReservations/PendingReservations";

const PendingReservations = (props) => {
    return ( 
        <PendingReservationComponent BackRoutes={props.BackRoutes}/>
     );
}
 
export default PendingReservations;