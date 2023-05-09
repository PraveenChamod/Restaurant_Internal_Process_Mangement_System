
import useFetch from "../../Hooks/useFetch";
import ViewSupplyItems from "../../components/Supplier/ViewSupplierItems/ViewSupplierItems";
import Spinner from "../../components/shared/Spinner/Spinner";

const SupplierItems = (props) => {
  const {data,isPending} = useFetch('api/v1/supplieritemsdetailsofsupplier');
  console.log(data?.data?.SupplierItems);
  return (
    <>
      {isPending && <Spinner/>}
      {data && <ViewSupplyItems BackRoutes={props.BackRoutes} data={data?.data?.SupplierItems}/>}
    </>
  );
};

export default SupplierItems;
