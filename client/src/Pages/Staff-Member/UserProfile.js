import UserProfileComponent from "../../components/shared/UserProfile/UserProfile";

const StaffMemberUserProfile = (props) => {
    return ( 
        <UserProfileComponent route1 = {props.route}/>
     );
}
 
export default StaffMemberUserProfile;