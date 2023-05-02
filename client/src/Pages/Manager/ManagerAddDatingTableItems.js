import AddDatingTableItemsComponent from "../../components/shared/AddDatingTableItems/AddDatingTableItems";

const ManagerAddDatingItems = (props) => {
  return (
    <>
      <AddDatingTableItemsComponent
        BackRoutes={props.BackRoutes}
        axiosInstance={props.axiosInstance}
      />
    </>
  );
};

export default ManagerAddDatingItems;
