import SupplierItemsComponent from "../../components/Supplier/AddSupplierItems/SupplierItems";

const SupplierItems = (props) => {
  return (
    <>
      <SupplierItemsComponent BackRoutes={props.BackRoutes} />
    </>
  );
};

export default SupplierItems;
