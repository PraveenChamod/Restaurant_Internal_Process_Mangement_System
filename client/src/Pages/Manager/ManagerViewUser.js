import ViewUserComponent from "../../components/shared/ViewUser/ViewUser";
import useFetch from "../../Hooks/useFetch";

const ManagerViewUser = () => {
    const data = useFetch('api/v1/admin/GetUsers');
    const users = data?.data
    console.log(users);
    return ( 
        <>
            <ViewUserComponent users = {users}/>
        </>
     );
}
 
export default ManagerViewUser;