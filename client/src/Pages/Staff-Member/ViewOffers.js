import AllOffersComponent from "../../components/shared/AllOffers/AllOffers";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";

const StaffMemberViewOffers = (props) => {
  const { data, isPending } = useFetch("api/v1/Offers");
  console.log(data);
  return (
    <>
      {isPending && <Spinner />}
      {data && (
        <AllOffersComponent data1={data} BackRoutes={props.BackRoutes} />
      )}
    </>
  );
};

export default StaffMemberViewOffers;
