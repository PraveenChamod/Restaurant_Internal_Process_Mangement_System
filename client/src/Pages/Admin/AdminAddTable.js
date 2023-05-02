import AddTableComponent from "../../components/shared/AddTables/AddTable";

const AdminAddTables = (props) => {
  return (
    <>
      <AddTableComponent
        BackRoutes={props.BackRoutes}
        axiosInstance={props.axiosInstance}
      />
    </>
  );
};

export default AdminAddTables;
