
import UserProfileComponent from "../../components/shared/UserProfile/UserProfile";


const AdminUserProfile = (props) => {
    return ( 
        <UserProfileComponent route1 = {props.route} BackRoutes={props.BackRoutes}/>
     );
}
 
export default AdminUserProfile;