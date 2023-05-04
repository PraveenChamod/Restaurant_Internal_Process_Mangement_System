import AddSpecialEventComponent from "../../components/shared/AddSpecialEvent/AddSpecialEvent";

const ManagerAddSpecialEvent = (props) => {
  return (
    <>
      <AddSpecialEventComponent BackRoutes={props.BackRoutes} />
    </>
  );
};

export default ManagerAddSpecialEvent;