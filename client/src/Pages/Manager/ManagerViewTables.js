import Spinner from "../../components/shared/Spinner/Spinner";
import TableDetails from "../../components/shared/TableDetails/TableDetails";
import useFetch from "../../Hooks/useFetch";

const ManagerViewTables = (props) => {
    const {data,isPending} = useFetch('api/v1/Tables');

    console.log(data);
    return ( 
        <>
            {isPending && <Spinner/>}
            {data && <TableDetails tables = {data} BackRoutes={props.BackRoutes}/>}
            
        </>
     );
}
 
export default ManagerViewTables;