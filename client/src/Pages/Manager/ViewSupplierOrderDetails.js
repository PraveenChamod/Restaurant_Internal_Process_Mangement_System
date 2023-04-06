import { useParams } from "react-router-dom";
import ViewSupplierOrderDetailsComponent from "../../components/Manager_Components/ViewSupplierOrder/ViewSupplierOrderDetails";
import OfferDetails from "../../components/shared/OfferDetails/OfferDetails";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";

const ViewSupplierOrderDetails = () => {
    const {id} = useParams();
    console.log(id);
    const {data,isPending} = useFetch(`api/v1/SupplierItemsDetailsById/${id}`);
    console.log(data)
    const SupplierItem = data?.data?.SupplierItems
    console.log(SupplierItem);
    return ( 
        <>
            {isPending && <Spinner/>}
            {SupplierItem && <ViewSupplierOrderDetailsComponent SupplierItem={SupplierItem}/>}
        </>
     );
}
 
export default ViewSupplierOrderDetails;