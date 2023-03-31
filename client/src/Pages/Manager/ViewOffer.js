import { useParams } from "react-router-dom";
import OfferDetails from "../../components/shared/OfferDetails/OfferDetails";
import useFetch from "../../Hooks/useFetch";

const ManagerViewOffer = (props) => {
    const {id} = useParams();
    console.log(id);
    // const {data,isPending} = useFetch(`/api/v1/Food/${id}`);
    // const food = data?.data?.food
    return ( 
        <>
            <OfferDetails/>
        </>
     );
}
 
export default ManagerViewOffer;