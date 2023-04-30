import FoodDetails from "../../components/shared/FoodDetails/FoodDetails";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";
const AdminViewFoods = (props) => {
  const { data, isPending } = useFetch("api/v1/Foods");
  console.log(data?.data?.foods);
  const foods = data?.data?.foods;
  return (
    <>
      {isPending && <Spinner />}
      {data && <FoodDetails data1={foods} BackRoutes={props.BackRoutes} />}
    </>
  );
};

export default AdminViewFoods;
