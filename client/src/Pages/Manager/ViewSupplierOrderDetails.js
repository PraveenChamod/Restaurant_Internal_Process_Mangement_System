import { useParams } from "react-router-dom";
import ViewSupplierOrderDetailsComponent from "../../components/Manager_Components/ViewSupplierOrder/ViewSupplierOrderDetails";
import OfferDetails from "../../components/shared/OfferDetails/OfferDetails";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";

const ViewSupplierOrderDetails = () => {
    const {id} = useParams();
    console.log(id);
    const {data,isPending} = useFetch(`/api/v1/ViewSupplierOrderById/${id}`);
    console.log(data)
    // const supplierItem = data?.data?.Offer
    // console.log(offer);
    return ( 
        <>
            {isPending && <Spinner/>}
            {/* {offer && <OfferDetails offer={offer}/>} */}
            <ViewSupplierOrderDetailsComponent/>
        </>
     );
}
 
export default ViewSupplierOrderDetails;