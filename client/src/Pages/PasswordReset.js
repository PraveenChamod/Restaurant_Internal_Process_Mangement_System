import { useParams } from "react-router-dom";
import PasswordResetComponent from "../components/PasswordReset/PasswordReset";

const PasswordReset = () => {
  const { Email } = useParams();
  return (
    <>
      <PasswordResetComponent email={Email} />
    </>
  );
};

export default PasswordReset;
