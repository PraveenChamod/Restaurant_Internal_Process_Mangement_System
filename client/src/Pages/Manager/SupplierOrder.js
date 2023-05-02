import useFetch from "../../Hooks/useFetch";
import AddSupplierOrder from "../../components/Manager_Components/AddOrder/AddSupplierOrder";
import Spinner from "../../components/shared/Spinner/Spinner";

const SupplierOrder = (props) => {
  const { data, isPending } = useFetch("api/v1/SupplierItemsDetails");
  return (
    <>
      {isPending && <Spinner />}
      {data && <AddSupplierOrder data3={data} BackRoutes={props.BackRoutes} axiosInstance={props.axiosInstance}/>}
    </>
  );
};

export default SupplierOrder;
