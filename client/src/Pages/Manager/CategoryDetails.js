import useFetch from "../../Hooks/useFetch";
import CategoryDetails from "../../components/shared/CategoryDetails/CategoryDetails";
import Spinner from "../../components/shared/Spinner/Spinner";

const ManagerCategoryDetails = (props) => {
    const {data,isPending} = useFetch('api/v1/Categories');
    const categories = data?.data?.categories
    console.log(data?.data?.categories);
    return ( 
        <>
            {isPending && <Spinner/>}
            {categories && <CategoryDetails data={categories} BackRoutes={props.BackRoutes}/>}
        </>
     );
}
 
export default ManagerCategoryDetails;