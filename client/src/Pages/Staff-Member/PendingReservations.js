import PendingReservationComponent from "../../components/shared/PendingReservations/PendingReservations";

const StaffMemberPendingReservations = (props) => {
    return ( 
        <>
           <PendingReservationComponent data={"test"} BackRoutes={props.BackRoutes}/> 
        </>
     );
}
 
export default StaffMemberPendingReservations;