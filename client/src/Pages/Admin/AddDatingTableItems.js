import AddDatingTableItemsComponent from "../../components/shared/AddDatingTableItems/AddDatingTableItems";

const AdminAddDatingTableItems = (props) => {
  return (
    <>
      <AddDatingTableItemsComponent
        BackRoutes={props.BackRoutes}
        axiosInstance={props.axiosInstance}
      />
    </>
  );
};

export default AdminAddDatingTableItems;
