import EditProfileComponent from "../../components/shared/EditProfile/Editprofile";

const StaffMemberEditProfile = (props) => {
    return ( 
        <EditProfileComponent BackRoutes={props.BackRoutes} EditProfileBackRoute={props.EditProfileBackRoute}/>
     );
}
 
export default StaffMemberEditProfile;