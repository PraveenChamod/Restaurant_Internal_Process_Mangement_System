import UserProfileComponent from "../../components/shared/UserProfile/UserProfile";

const ManagerUserProfile = (props) => {
  return (
    <UserProfileComponent route1={props.route} BackRoutes={props.BackRoutes} />
  );
};

export default ManagerUserProfile;
