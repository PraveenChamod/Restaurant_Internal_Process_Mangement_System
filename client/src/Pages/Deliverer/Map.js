import { useParams } from "react-router-dom";
import MapComponent from "../../components/Deliver/Map/Map";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";

const Map = () => {
  const { id } = useParams();
  console.log(id);
  const { data, isPending } = useFetch(`/api/v1/Order/${id}`);
  const pendingOrders = data?.data?.pendingOrders[0];
  return (
    <>
      {isPending && <Spinner />}
      {pendingOrders && <MapComponent data={pendingOrders} />}
    </>
  );
};

export default Map;
