import useFetch from "../../Hooks/useFetch";
import Spinner from "../../components/shared/Spinner/Spinner";
import ViewUserComponent from "../../components/shared/ViewUser/ViewUser";

const AdminViewUser = (props) => {
    const {data,isPending} = useFetch('api/v1/User/Users');
    const users = data?.data
    console.log(users);
    return ( 
        <>
            {isPending && <Spinner/>}
            {users && <ViewUserComponent users = {users} BackRoutes={props.BackRoutes}/>}
        </>
     );
}
 
export default AdminViewUser;