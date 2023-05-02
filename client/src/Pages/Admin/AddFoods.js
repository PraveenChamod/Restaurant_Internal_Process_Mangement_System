import useFetch from "../../Hooks/useFetch";
import AddFoodsComponent from "../../components/shared/AddFoods/AddFoods";

const AdminAddFoods = (props) => {
  return (
    <>
      <AddFoodsComponent
        BackRoutes={props.BackRoutes}
        axiosInstance={props.axiosInstance}
      />
    </>
  );
};

export default AdminAddFoods;
