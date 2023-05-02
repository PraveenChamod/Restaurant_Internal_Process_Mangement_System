import { useParams } from "react-router-dom";
import DeliverComponent from "../../components/Deliver/Deliver";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";

const DeliveryOrderDetails = (props) => {
  const { id } = useParams();
  console.log(id);
  const { data, isPending } = useFetch(`/api/v1/Order/${id}`);
  const pendingOrders = data?.data?.pendingOrders[0];
  return (
    <>
      {isPending && <Spinner />}
      {data && (
        <DeliverComponent
          data={pendingOrders}
          axiosInstance={props.axiosInstance}
        />
      )}
    </>
  );
};

export default DeliveryOrderDetails;
