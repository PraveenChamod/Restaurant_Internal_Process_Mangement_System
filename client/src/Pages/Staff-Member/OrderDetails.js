import { useParams } from "react-router-dom";
import Spinner from "../../components/shared/Spinner/Spinner";
import OrderDetailsComponent from "../../components/Staff-Member_Components/OrderDetails/OrderDetails";
import useFetch from "../../Hooks/useFetch";

const StaffMemberOrderDetails = () => {
    const {id} = useParams(); 
    const{data,isPending} = useFetch(`/api/v1/Order/${id}`);
    console.log(data?.data?.pendingOrders);
    return ( 
        <>
        {isPending && <Spinner/>}
        {data &&  <OrderDetailsComponent data={data} />}
        </>
       
     );
}
 
export default StaffMemberOrderDetails;