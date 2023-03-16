import AllOffersComponent from "../../components/shared/AllOffers/AllOffers";

const StaffMemberViewOffers = (props) => {
    return ( 
        <>
            <AllOffersComponent BackRoutes={props.BackRoutes}/>
        </>
     );
}
 
export default StaffMemberViewOffers;