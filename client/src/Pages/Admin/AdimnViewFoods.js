import FoodDetails from "../../components/shared/FoodDetails/FoodDetails";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";
const AdminViewFoods = (props) => {
    const {data,isPending}= useFetch('api/v1/Foods');
    return (  
        <>
        {isPending && <Spinner/>}
        {data && <FoodDetails data1={data}/>}
        </>
    );
}
 
export default AdminViewFoods;