import useFetch from "../../Hooks/useFetch";
import AddPackages from "../../components/shared/AddPackage/AddPackage";
import Spinner from "../../components/shared/Spinner/Spinner";

const AddReservationPackages = (props) => {
  const { data, isPending } = useFetch("api/v1/TableItems");
  return (
    <>
      {isPending && <Spinner />}
      {data?.data?.TableItems && (
        <AddPackages
          data={data?.data?.TableItems}
          BackRoutes={props.BackRoutes}
        />
      )}
    </>
  );
};

export default AddReservationPackages;
