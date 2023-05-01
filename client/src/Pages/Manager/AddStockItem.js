import AddStockComponent from "../../components/Manager_Components/AddStocks/AddStocks";

const AddStockItem = (props) => {
  return (
    <>
      <AddStockComponent BackRoutes={props.BackRoutes} />
    </>
  );
};

export default AddStockItem;
