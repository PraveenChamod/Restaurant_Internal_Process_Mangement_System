import Spinner from "../../components/shared/Spinner/Spinner";
import PlaceOrderComponent from "../../components/Staff-Member_Components/PlaceOrder/PlaceOrder";
import useFetch from "../../Hooks/useFetch";

const StaffMemberPlaceOrder = (props) => {
    const {data,isPending} = useFetch('api/v1/Foods');
    return ( 
        <>
            {isPending && <Spinner/>}
            {data &&  <PlaceOrderComponent  data1={data?.data?.foods} BackRoutes={props.BackRoutes}/>}
        </>
     );
}
 
export default StaffMemberPlaceOrder;