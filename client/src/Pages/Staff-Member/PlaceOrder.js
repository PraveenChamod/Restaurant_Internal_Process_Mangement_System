import Spinner from "../../components/shared/Spinner/Spinner";
import PlaceOrderComponent from "../../components/Staff-Member_Components/PlaceOrder/PlaceOrder";
import useFetch from "../../Hooks/useFetch";

const StaffMemberPlaceOrder = (props) => {
    const {data:food,isPending:isPending1} = useFetch('api/v1/Foods') ;
    const {data:offer,isPending:isPending2} = useFetch('api/v1/Offers');
    console.log(food?.data?.foods);
    return ( 
        <>
            {isPending1 && isPending2 && <Spinner/>}
            {food && offer && <PlaceOrderComponent data1={food?.data?.foods} data2={offer} BackRoutes={props.BackRoutes}/>}
        </>
     );
}
 
export default StaffMemberPlaceOrder;