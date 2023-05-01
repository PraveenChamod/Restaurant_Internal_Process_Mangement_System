import Spinner from "../../components/shared/Spinner/Spinner";
import ViewUserComponent from "../../components/shared/ViewUser/ViewUser";
import useFetch from "../../Hooks/useFetch";

const ManagerViewUser = (props) => {
  const { data, isPending } = useFetch("api/v1/User/Users");
  const users = data?.data;
  console.log(users);
  return (
    <>
      {isPending && <Spinner />}
      {users && (
        <ViewUserComponent users={users} BackRoutes={props.BackRoutes} />
      )}
    </>
  );
};

export default ManagerViewUser;
