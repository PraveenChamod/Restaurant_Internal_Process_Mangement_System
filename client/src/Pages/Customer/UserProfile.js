import CustomerProfile from "../../components/Customer/CustomerProfile/CustomerProfile";
import useFetch from "../../Hooks/useFetch";
const CustomerUserProfile = () => {
    const data = useFetch('api/v1/Auth/getProfile');
    const user = data?.data
    console.log(user);
    return ( 
        <CustomerProfile user={user} />

     );
}
 
export default CustomerUserProfile;