import EditProfileComponent from "../../components/shared/EditProfile/Editprofile";

const SupplierEditProfile = (props) => {
  return (
    <EditProfileComponent
      EditProfileBackRoute={props.EditProfileBackRoute}
      axiosInstance={props.axiosInstance}
    />
  );
};

export default SupplierEditProfile;
