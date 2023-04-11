import TableBooking from "../../components/Customer/TableBooking/TableBooking";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";

const TableReservation = (props) => {
    const {data,isPending} = useFetch('api/v1/availabletables');
    console.log(props.BackRoutes); 
    return ( 
        <>
            {isPending && <Spinner/>}
            {data && <TableBooking data={data?.data?.availableTables} BackRoutes={props.BackRoutes}/>}
        </>
     );
}
 
export default TableReservation;