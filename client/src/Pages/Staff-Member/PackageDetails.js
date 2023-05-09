import useFetch from "../../Hooks/useFetch";
import PackageDetailsComponent from "../../components/Staff-Member_Components/PackageDetails/PackageDetails";
import Spinner from "../../components/shared/Spinner/Spinner";

const PackageDetails = (props) => {
    const{data,isPending} = useFetch('api/v1/packages');
    return ( 
        <>
            {isPending && <Spinner/>}
            {data?.data?.packages && <PackageDetailsComponent data={data?.data?.packages} BackRoutes={props.BackRoutes}/>}
        </>
     );
}
 
export default PackageDetails;