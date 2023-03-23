import Spinner from "../../components/shared/Spinner/Spinner";
import TableDetails from "../../components/shared/TableDetails/TableDetails";
import useFetch from "../../Hooks/useFetch";

const StaffMemberViewTables = (props) => {
    const {data,isPending}= useFetch('api/v1/Tables');
    console.log(data?.data?.tables);
    return (  
        <>
        {isPending && <Spinner/>}
        {data && <TableDetails data2={data?.data?.tables} BackRoutes={props.BackRoutes}/>}
        </>
    );
}
 
export default StaffMemberViewTables;