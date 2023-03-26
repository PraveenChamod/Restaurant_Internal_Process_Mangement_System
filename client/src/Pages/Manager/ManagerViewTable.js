import { useParams } from "react-router-dom";
import TableDetail from "../../components/shared/TableDetail/TableDetail";
import useFetch from "../../Hooks/useFetch";

const ManagerViewTableDetails = () => {
    const {id} = useParams()

    /** usefetch */
    const {data,isPending} = useFetch('/api/v1/table/'+id)
    console.log("table data", data?.data?.table);
    const table = data?.data?.table

    return ( 
        <>
            <TableDetail table = {table}/>
        </> 
     );
}
 
export default ManagerViewTableDetails;