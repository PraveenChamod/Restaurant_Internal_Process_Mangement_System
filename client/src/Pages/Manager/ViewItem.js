import { useParams } from "react-router-dom";
import ItemDetailsComponent from "../../components/Manager_Components/ItemDetails/ItemDetails";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";

const ViewItem = () => {
    const {SerialNo} = useParams();
    console.log(SerialNo);
    const {data,isPending} = useFetch(`/api/v1/Item/${SerialNo}`);
    console.log(data)
    const item = data?.data?.existingItem
    return ( 
        <>
            {isPending && <Spinner/>}
            {item && <ItemDetailsComponent item={item}/>}
        </>
     );
}
 
export default ViewItem;