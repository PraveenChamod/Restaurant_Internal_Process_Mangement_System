import { useParams } from "react-router-dom";
import Spinner from "../../components/shared/Spinner/Spinner";
import OrderDetailsComponent from "../../components/Staff-Member_Components/OrderDetails/OrderDetails";
import useFetch from "../../Hooks/useFetch";

const StaffMemberOrderDetails = (props) => {
  const { id } = useParams();
  const { data, isPending } = useFetch(`/api/v1/Order/${id}`);
  console.log(data?.data?.pendingOrders[0]);
  return (
    <>
      {isPending && <Spinner />}
      {data && (
        <OrderDetailsComponent
          data={data?.data?.pendingOrders[0]}
          BackRoutes={props.BackRoutes}
          axiosInstance={props.axiosInstance}
        />
      )}
    </>
  );
};

export default StaffMemberOrderDetails;
