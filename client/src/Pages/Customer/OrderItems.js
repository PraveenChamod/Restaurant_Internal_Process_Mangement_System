import OrderPlace from "../../components/Customer/OrderItems/OrderPlace";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";

const OrderItems = () => {
    const {data,isPending} = useFetch('api/v1/CartItems');
    return ( 
        <>
            {isPending && <Spinner/> }
            {data && <OrderPlace data={data}/>}
        </>
     );
}
 
export default OrderItems;