import { useParams } from "react-router-dom";
import Spinner from "../../components/shared/Spinner/Spinner";
import TableReservationComponent from "../../components/Staff-Member_Components/TableReservationDetails/TableReservation";
import useFetch from "../../Hooks/useFetch";

const StaffMemberTableReservationDetails = (props) => {
  const { id } = useParams();
  const { data, isPending } = useFetch(`/api/v1/Reservation/${id}`);
  console.log("table data xxx", data?.data?.ReservationDetails);
  return (
    <>
      {isPending && <Spinner />}
      {data && (
        <TableReservationComponent
          data={data?.data?.ReservationDetails}
          BackRoutes={props.BackRoutes}
          axiosInstance={props.axiosInstance}
        />
      )}
    </>
  );
};

export default StaffMemberTableReservationDetails;
