import FoodDetails from "../../components/shared/FoodDetails/FoodDetails";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";

const ManagerViewFoods = (props) => {
    const {data,isPending}= useFetch('api/v1/Foods');
    console.log(data);
    return (  
        <>
            {isPending && <Spinner/>}
            {data && <FoodDetails data1={data?.data?.foods} BackRoutes={props.BackRoutes}/>}
        </>
    );
}
 
export default ManagerViewFoods;