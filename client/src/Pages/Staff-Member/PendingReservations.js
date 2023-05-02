import PendingReservationComponent from "../../components/shared/PendingReservations/PendingReservations";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";

const StaffMemberPendingReservations = (props) => {
  const { data, isPending } = useFetch("api/v1/PendingReservations");
  console.log(data);
  return (
    <>
      {isPending && <Spinner />}
      {data && (
        <PendingReservationComponent
          data={data?.data?.pendingReservations}
          BackRoutes={props.BackRoutes}
        />
      )}
    </>
  );
};

export default StaffMemberPendingReservations;
