import OrderDetails from "../../components/Supplier/ViewOrder/OrderDetails";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";

const Messages = (props) => {
    const {data,isPending}= useFetch('api/v1/ViewSupplierOrder');
    console.log(data?.data?.data2);
    const data2 = data?.data?.data2;
    return ( 
        <>
        {isPending && <Spinner/>}
        {data && <OrderDetails data3={data2} BackRoutes={props.BackRoutes}/>}
        </>
     );
}
 
export default Messages;