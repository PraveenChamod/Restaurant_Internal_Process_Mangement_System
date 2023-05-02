import ForgotPasswordComponent from "../components/FrogotPassword/FrogotPassword";

const FrogotPassword = (props) => {
  return (
    <>
      <ForgotPasswordComponent
        BackRoutes={props.BackRoutes}
        axiosInstance={props.axiosInstance}
      />
    </>
  );
};

export default FrogotPassword;
