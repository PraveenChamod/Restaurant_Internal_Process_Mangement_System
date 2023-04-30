import { useParams } from "react-router-dom";
import FoodDetail from "../../components/shared/FoodDetail/FoodDetail";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";
const AdminViewFood = () => {
  const { id } = useParams();
  console.log(id);
  const { data, isPending } = useFetch(`/api/v1/Food/${id}`);
  const food = data?.data?.food;
  return (
    <>
      {isPending && <Spinner />}
      {food && <FoodDetail food={food} />}
    </>
  );
};

export default AdminViewFood;
