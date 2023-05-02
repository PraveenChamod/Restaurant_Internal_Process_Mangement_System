import AddTableComponent from "../../components/shared/AddTables/AddTable";

const ManagerAddTables = (props) => {
  return (
    <>
      <AddTableComponent
        BackRoutes={props.BackRoutes}
        axiosInstance={props.axiosInstance}
      />
    </>
  );
};

export default ManagerAddTables;
