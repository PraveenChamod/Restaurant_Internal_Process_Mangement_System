import AddUserComponent from "../../components/shared/AddUser/AddUser";

const AddOutletStaff = (props) => {
  return (
    <>
      <AddUserComponent
        BackRoutes={props.BackRoutes}
        axiosInstance={props.axiosInstance}
      />
    </>
  );
};

export default AddOutletStaff;
