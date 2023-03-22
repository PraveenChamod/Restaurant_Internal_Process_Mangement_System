import { useParams } from "react-router-dom";
import Spinner from "../../components/shared/Spinner/Spinner";
import OrderDetailsComponent from "../../components/Staff-Member_Components/OrderDetails/OrderDetails";
import useFetch from "../../Hooks/useFetch"
const StaffMemberOrderDetails = () => {
    const { id } = useParams()
    const { data: availableDeliverers, isPending: delivererIsPending } = useFetch('/api/v1/Users/AvailableDeliverers');
    const { data: orderDetails, isPending: orderIsPending } = useFetch(`/api/v1/Order/${id}`)
    console.log("order details are ", orderDetails, " Available deliverrs are", availableDeliverers);
    return (
        <>
            { delivererIsPending && <Spinner />}
            { <OrderDetailsComponent availableDeliverers={availableDeliverers} oreders={orderDetails} />}
        </>

    );
}

export default StaffMemberOrderDetails;