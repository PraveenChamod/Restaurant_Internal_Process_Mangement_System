import PendingOrdersComponent from "../../components/shared/PendingOrders/PendingOrders";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";

const StaffMemberPendingOrders = (props) => {
    const {data,isPending} = useFetch('api/v1/PendingOrders');
    const pendingOrders = data?.data?.pendingOrders;
    console.log(pendingOrders);
    return ( 
        <>
            {isPending && <Spinner/>}
            {pendingOrders && <PendingOrdersComponent BackRoutes={props.BackRoutes} pendingorders = {pendingOrders}/>}
        </>
     );
}
 
export default StaffMemberPendingOrders;