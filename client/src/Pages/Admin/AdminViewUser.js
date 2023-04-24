import useFetch from "../../Hooks/useFetch";
import ViewUserComponent from "../../components/shared/ViewUser/ViewUser";

const AdminViewUser = (props) => {
    const data = useFetch('api/v1/User/Users');
    const users = data?.data
    console.log(users);
    return ( 
        <>
            <ViewUserComponent users = {users} BackRoutes={props.BackRoutes}/>
        </>
     );
}
 
export default AdminViewUser;