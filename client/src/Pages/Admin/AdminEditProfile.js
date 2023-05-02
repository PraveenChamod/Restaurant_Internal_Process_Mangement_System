import EditProfileComponent from "../../components/shared/EditProfile/Editprofile";

const AdminEditProfile = (props) => {
  return (
    <EditProfileComponent EditProfileBackRoute={props.EditProfileBackRoute} />
  );
};

export default AdminEditProfile;
