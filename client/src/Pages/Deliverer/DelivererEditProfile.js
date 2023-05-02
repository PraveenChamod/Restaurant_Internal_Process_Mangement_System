import EditProfileComponent from "../../components/shared/EditProfile/Editprofile";

const DelivererEditProfile = (props) => {
  return (
    <EditProfileComponent
      EditProfileBackRoute={props.EditProfileBackRoute}
      axiosInstance={props.axiosInstance}
    />
  );
};

export default DelivererEditProfile;
