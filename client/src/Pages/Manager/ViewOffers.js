import AllOffersComponent from "../../components/shared/AllOffers/AllOffers";
import useFetch from "../../Hooks/useFetch";
import Spinner from "../../components/shared/Spinner/Spinner";

const ManagerViewOffers = (props) => {
    const {data, isPending} = useFetch('api/v1/Offers');
    console.log(data);
    return ( 
        <>
            {isPending && <Spinner/>}
            {data && <AllOffersComponent data1 = {data}/>}
        </>
     );
}
 
export default ManagerViewOffers;