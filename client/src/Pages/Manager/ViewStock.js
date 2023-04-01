import ViewStocksComponent from "../../components/Manager_Components/ViewStocks/ViewStocks";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";

const ViewStocks = (props) => {
    const {data,isPending} = useFetch('api/v1/Items');
    console.log(data);
    return ( 
        <>
            {isPending && <Spinner/>}
            {data && <ViewStocksComponent items = {data} BackRoutes={props.BackRoutes}/>}
            
        </>
     );
}
 
export default ViewStocks;