import Spinner from "../../components/shared/Spinner/Spinner";
import PlaceOrderComponent from "../../components/Staff-Member_Components/PlaceOrder/PlaceOrder";
import useFetch from "../../Hooks/useFetch";

const StaffMemberPlaceOrder = () => {
    const {data,isPending} = useFetch('api/v1/Foods');
    return ( 
        <>
            {isPending && <Spinner/>}
            {data &&  <PlaceOrderComponent  data1={data?.data?.foods}/>}
        </>
     );
}
 
export default StaffMemberPlaceOrder;