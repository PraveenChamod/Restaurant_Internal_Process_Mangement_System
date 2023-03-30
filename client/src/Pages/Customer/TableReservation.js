import TableBooking from "../../components/Customer/TableBooking/TableBooking";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";

const TableReservation = () => {
    const {data,isPending} = useFetch('api/v1/availabletables');
    console.log(data); 
    return ( 
        <>
            {isPending && <Spinner/>}
            {data && <TableBooking data={data?.data?.availableTables}/>}
        </>
     );
}
 
export default TableReservation;