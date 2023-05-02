import OrderPlace from "../../components/Customer/OrderItems/OrderPlace";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";

const OrderItems = (props) => {
  const { data, isPending } = useFetch("api/v1/CartItems");
  return (
    <>
      {isPending && <Spinner />}
      {data && <OrderPlace data={data} axiosInstance={props.axiosInstance} />}
    </>
  );
};

export default OrderItems;
