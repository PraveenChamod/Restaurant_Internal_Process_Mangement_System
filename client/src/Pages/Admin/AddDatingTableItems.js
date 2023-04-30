import AddDatingTableItemsComponent from "../../components/shared/AddDatingTableItems/AddDatingTableItems";

const AdminAddDatingTableItems = (props) => {
  return (
    <>
      <AddDatingTableItemsComponent BackRoutes={props.BackRoutes} />
    </>
  );
};

export default AdminAddDatingTableItems;
