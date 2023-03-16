import TableDetails from "../../components/shared/TableDetails/TableDetails";
import useFetch from "../../Hooks/useFetch";
import Spinner from "../../components/shared/Spinner/Spinner";
const AdminViewTables = (props) => {
    const {data,isPending}= useFetch('api/v1/Tables');
    return (  
        <>
        {isPending && <Spinner/>}
        {data && <TableDetails data2={data} BackRoutes={props.BackRoutes}/>}
        </>
    );
}
 
export default AdminViewTables;