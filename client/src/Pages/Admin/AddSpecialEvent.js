import AddSpecialEventComponent from "../../components/shared/AddSpecialEvent/AddSpecialEvent";

const AdminAddSpecialEvent = (props) => {
  return (
    <>
      <AddSpecialEventComponent BackRoutes={props.BackRoutes} />
    </>
  );
};

export default AdminAddSpecialEvent;