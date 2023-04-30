import EditProfileComponent from "../../components/shared/EditProfile/Editprofile";

const ManagerEditProfile = (props) => {
  return (
    <EditProfileComponent EditProfileBackRoute={props.EditProfileBackRoute} />
  );
};

export default ManagerEditProfile;
