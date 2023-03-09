import TableDetails from "../../components/shared/TableDetails/TableDetails";
import useFetch from "../../Hooks/useFetch";

const ManagerViewTables = (props) => {
    const data = useFetch('api/v1/serviceProvider/AdminView-Tables');
    const tables = data?.data
    console.log(tables);
    return ( 
        <>
            <TableDetails tables = {tables}/>
        </>
     );
}
 
export default ManagerViewTables;