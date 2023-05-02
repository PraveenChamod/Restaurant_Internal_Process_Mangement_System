import AddFoodsComponent from "../../components/shared/AddFoods/AddFoods";

const ManagerAddFoods = (props) => {
  return (
    <>
      <AddFoodsComponent
        BackRoutes={props.BackRoutes}
        axiosInstance={props.axiosInstance}
      />
    </>
  );
};

export default ManagerAddFoods;
