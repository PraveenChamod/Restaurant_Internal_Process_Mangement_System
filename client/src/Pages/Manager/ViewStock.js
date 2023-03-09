import ViewStocksComponent from "../../components/Manager_Components/ViewStocks/ViewStocks";
import useFetch from "../../Hooks/useFetch";

const ViewStocks = (props) => {

    const data = useFetch('/api/v1/serviceProvider/getItems');
    const i = data?.data
    
    
    console.log(i);
    return ( 
        <>
            <ViewStocksComponent items = {i} />
        </>
     );
}
 
export default ViewStocks;