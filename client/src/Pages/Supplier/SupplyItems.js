import SupplierItemsComponent from "../../components/Supplier/AddSupplierItems/SupplierItems";

const SupplierItems = (props) => {
  return (
    <>
      <SupplierItemsComponent
        BackRoutes={props.BackRoutes}
        axiosInstance={props.axiosInstance}
      />
    </>
  );
};

export default SupplierItems;
