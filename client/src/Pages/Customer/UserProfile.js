import CustomerProfile from "../../components/Customer/CustomerProfile/CustomerProfile";
import useFetch from "../../Hooks/useFetch";
const CustomerUserProfile = () => {
    const {data,isPending} = useFetch('api/v1/Auth/getProfile');
    const user = data
    console.log(data);
    return ( 
        <>
        {isPending && <p>Loading</p>}
        {data && <CustomerProfile user={user} />}
        </>

     );
}
 
export default CustomerUserProfile;