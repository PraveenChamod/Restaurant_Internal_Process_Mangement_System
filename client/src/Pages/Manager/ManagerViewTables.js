import Spinner from "../../components/shared/Spinner/Spinner";
import TableDetails from "../../components/shared/TableDetails/TableDetails";
import useFetch from "../../Hooks/useFetch";

const ManagerViewTables = (props) => {
    const {data,isPending} = useFetch('api/v1/Tables');

    console.log(data?.data);
    return ( 
        <>
            {isPending && <Spinner/>}
            {data && <TableDetails tables = {data?.data?.tables} BackRoutes={props.BackRoutes}/>}
            
        </>
     );
}
 
export default ManagerViewTables;