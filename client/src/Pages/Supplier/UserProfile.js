import UserProfileComponent from "../../components/shared/UserProfile/UserProfile";

const SupplierUserProfile = (props) => {
  return <UserProfileComponent route1={props.route} BackRoutes={props.BackRoutes}/>;
};

export default SupplierUserProfile;
