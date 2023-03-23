import PendingReservationComponent from "../../components/shared/PendingReservations/PendingReservations";

const StaffMemberPendingReservations = (props) => {
    return ( 
        <>
           <PendingReservationComponent BackRoutes={props.BackRoutes}/> 
        </>
     );
}
 
export default StaffMemberPendingReservations;