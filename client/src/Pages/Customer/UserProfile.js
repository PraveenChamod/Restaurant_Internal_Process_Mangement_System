import CustomerProfile from "../../components/Customer/CustomerProfile/CustomerProfile";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";
const CustomerUserProfile = (props) => {
  const { data, isPending } = useFetch("api/v1/Auth/Profile");
  const user = data?.user;
  console.log(data);
  return (
    <>
      {isPending && <Spinner />}
      {data && (
        <CustomerProfile
          user={user}
          isPending={isPending}
          BackRoutes={props.BackRoutes}
        />
      )}
    </>
  );
};

export default CustomerUserProfile;
