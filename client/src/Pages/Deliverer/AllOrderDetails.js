import DelivererReceivedOrders from "../../components/Deliver/ReceivedOrders/ReceivedOrders";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";

const AllOrderDetails = (props) => {
  const { data, isPending } = useFetch("api/v1/Deliverer/OrderDetails");
  const pendingOrders = data?.data?.pendingOrders;
  console.log(data);
  return (
    <>
      {isPending && <Spinner />}
      {pendingOrders && (
        <DelivererReceivedOrders
          BackRoutes={props.BackRoutes}
          pendingOrders={pendingOrders}
        />
      )}
    </>
  );
};
export default AllOrderDetails;
